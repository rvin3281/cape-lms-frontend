/* eslint-disable @typescript-eslint/no-explicit-any */
import { REFRESH_API } from "@/lib/constant/api-url";
import { SET_PASSWORD_TOKEN_NOT_EXIST } from "@/lib/constant/error-code";
import { ApiErrorPayload } from "@/lib/interface/APIErrorResponse";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

/**
 * ✅ MAIN API CLIENT (this is what your whole app uses)
 * - withCredentials: true is REQUIRED because:
 *   - your access_token and refresh_token are stored in httpOnly cookies
 *   - browser must send cookies automatically for every request
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

/**
 * ✅ REFRESH CLIENT (IMPORTANT)
 * This axios client has NO interceptor.
 *
 * Why?
 * - If refreshClient had the same interceptor, and refresh endpoint returns 401,
 *   it would call refresh again → recursion → requests never finish (deadlock).
 *
 * So this client is kept "clean" to prevent refresh recursion.
 */
const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

/**
 * ✅ We extend Axios request config to store retry flags.
 * This is a common enterprise technique to prevent:
 * - infinite retry loops
 * - refreshing for endpoints that should not refresh (login, refresh, logout)
 */
type RetryConfig = InternalAxiosRequestConfig & {
  /**
   * _retry ensures: the SAME request will only be retried once.
   * Without this, your app can endlessly retry a failing call.
   */
  _retry?: boolean;

  /**
   * _skipRefresh is a "manual override":
   * - This request MUST NOT trigger refresh logic even if it returns 401.
   * We'll use it for login/register/public endpoints.
   */
  _skipRefresh?: boolean;
};

/**
 * ✅ These two variables implement a "refresh lock".
 *
 * In enterprise apps, one page may fire multiple API calls at once.
 * If access token expires, all those calls could return 401 together.
 *
 * Without a lock, you would send 10 refresh requests at the same time.
 *
 * This lock ensures:
 * - only ONE refresh request happens at a time
 * - others wait and then retry using the new access token
 */
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

/**
 * ✅ Calls refresh endpoint.
 *
 * - This endpoint should:
 *   - validate refresh_token cookie in DB
 *   - generate a new access_token cookie
 *
 * We call it using refreshClient (no interceptor),
 * so this call will NEVER trigger recursive refresh loops.
 */
async function refreshAccessToken(): Promise<void> {
  await refreshClient.post(REFRESH_API);
}

/**
 * ✅ RESPONSE INTERCEPTOR:
 *
 * It only activates when a request fails.
 * The goal is:
 * - If API returns 401 because access token expired
 *   → refresh token
 *   → retry original request
 */
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

    /**
     * ✅ Only handle 401
     * - 400: validation error (do not refresh)
     * - 403: forbidden (do not refresh)
     * - 500: server error (do not refresh)
     */
    if (status !== 401 || errorCode === SET_PASSWORD_TOKEN_NOT_EXIST)
      throw error;

    /**
     * ✅ IMPORTANT: Don't refresh for auth endpoints
     *
     * Why?
     * - /auth/login returning 401 means: user typed wrong password (expected)
     *   refreshing makes ZERO sense and causes bugs.
     *
     * - /auth/refresh returning 401 means: refresh token invalid/expired
     *   refreshing again would loop infinitely.
     *
     * - /auth/logout should not refresh.
     */
    if (
      url.includes("/auth/login") ||
      url.includes("/auth/refresh") ||
      url.includes("/auth/logout") ||
      original._skipRefresh // manual override
    ) {
      console.log("ERROR THROWING FROM AXIOS", error);
      throw error; // pass 401 back to React Query / UI
    }

    /**
     * ✅ Prevent retry loops on the SAME request
     * If refresh succeeded but the retry still returns 401,
     * we don't keep retrying forever.
     */
    if (original._retry) throw error;
    original._retry = true;

    /**
     * ✅ If a refresh is already happening:
     * - wait for it
     * - then retry original request
     *
     * Example:
     * - Dashboard fires 5 API calls
     * - all return 401
     * - first call triggers refresh
     * - other 4 calls wait here
     */
    if (isRefreshing) {
      if (refreshPromise) await refreshPromise;
      return axiosInstance(original);
    }

    /**
     * ✅ Start a new refresh
     */
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

    /**
     * ✅ After refresh:
     * - retry the original request
     * If refresh fails:
     * - session ended → send user to /login
     */
    try {
      await refreshPromise;
      return axiosInstance(original);
    } catch (error: any) {
      console.log("AXIOS ERROR", error);
      if (typeof window !== "undefined") window.location.href = "/login";
      throw error;
    }
  },
);

export default axiosInstance;
