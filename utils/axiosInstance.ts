/* eslint-disable @typescript-eslint/no-explicit-any */
import { REFRESH_API } from "@/lib/constant/api-url";
import { SET_PASSWORD_TOKEN_NOT_EXIST } from "@/lib/constant/error-code";
import { ApiErrorPayload } from "@/lib/interface/APIErrorResponse";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  _skipRefresh?: boolean;
};

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

async function refreshAccessToken(): Promise<void> {
  await refreshClient.post(REFRESH_API);
}

axiosInstance.interceptors.response.use(
  // 1) success responses pass through untouched
  (res) => res,

  // 2) failure responses enter here
  async (error: AxiosError<ApiErrorPayload>) => {
    // Axios keeps the request config that caused the error
    // This is the original request of an API call, axios stores the fail api call request on error.config
    // So we can take the orignal request of the failed API from error.config
    const original = error.config as RetryConfig | undefined;
    if (!original) throw error;

    const status = error.response?.status;
    const url = original.url ?? "";

    const errorCode = error.response?.data?.code;

    if (status !== 401 || errorCode === SET_PASSWORD_TOKEN_NOT_EXIST)
      throw error;

    if (
      url.includes("/auth/login") ||
      url.includes("/auth/refresh") ||
      url.includes("/auth/logout") ||
      original._skipRefresh // manual override
    ) {
      throw error; // pass 401 back to React Query / UI
    }

    if (original._retry) throw error;
    original._retry = true;

    if (isRefreshing) {
      if (refreshPromise) await refreshPromise;
      return axiosInstance(original);
    }

    isRefreshing = true;
    refreshPromise = (async () => {
      try {
        await refreshAccessToken();
      } finally {
        // reset lock even if refresh fails
        isRefreshing = false;
        refreshPromise = null;
      }
    })();

    try {
      await refreshPromise;
      return axiosInstance(original);
    } catch (error: any) {
      if (typeof window !== "undefined") window.location.href = "/login";
      throw error;
    }
  },
);

export default axiosInstance;
