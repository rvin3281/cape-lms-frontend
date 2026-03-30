import { LOGOUT_API, REFRESH_API } from "@/lib/constant/api-url";
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

const logoutClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  _skipRefresh?: boolean;
  _skipAuthRedirect?: boolean;
};

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

async function forceCleanupAndRedirect() {
  try {
    console.log("Logging out due to authentication failure...");
    await logoutClient.post(LOGOUT_API, null, {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    // ignore, backend may already reject token
  }

  if (typeof window !== "undefined") {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}

    if (window.location.pathname !== "/login") {
      window.location.replace("/login");
    }
  }
}

async function refreshAccessToken(): Promise<void> {
  await refreshClient.post(REFRESH_API);
}

function isAuthRoute(url: string) {
  return (
    url.includes("/auth/login") ||
    url.includes("/auth/refresh") ||
    url.includes("/auth/logout")
  );
}

function isLoginRoute(url: string) {
  return url.includes("/auth/login");
}

function isRefreshRoute(url: string) {
  return url.includes("/auth/refresh");
}

function isLogoutRoute(url: string) {
  return url.includes("/auth/logout");
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

    if (isLoginRoute(url)) {
      throw error;
    }

    if (original._skipRefresh || original._skipAuthRedirect) {
      throw error;
    }

    if (isRefreshRoute(url) || isLogoutRoute(url)) {
      await forceCleanupAndRedirect();
      throw error;
    }

    if (original._retry) {
      await forceCleanupAndRedirect();
      throw error;
    }
    original._retry = true;

    if (isRefreshing) {
      try {
        if (refreshPromise) await refreshPromise;
        return axiosInstance(original);
      } catch {
        await forceCleanupAndRedirect();
        throw error;
      }
    }

    isRefreshing = true;
    refreshPromise = (async () => {
      try {
        await refreshAccessToken();
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    })();

    try {
      await refreshPromise;
      return axiosInstance(original);
    } catch {
      await forceCleanupAndRedirect();
      throw error;
    }
  },
);

export default axiosInstance;
