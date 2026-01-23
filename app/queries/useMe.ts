"use client";
import { ME_API } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

async function getMe() {
  // ✅ Sends cookies automatically (access_token + refresh_token) because axiosInstance has withCredentials: true
  // ✅ Backend decides if access_token is valid (and your axios interceptor handles refresh flow on 401)
  const res = await axiosInstance.get(ME_API);
  return res.data; // your API success wrapper
}

export function useMe() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,

    /**
     * ✅ staleTime = 5 minutes
     * - For the first 5 minutes after a successful /me fetch, the cached data is considered "fresh".
     * - While "fresh", React Query will NOT refetch this query automatically.
     *
     * After 5 minutes:
     * - The cached data becomes "stale".
     * - "Stale" does NOT mean "auto refetch".
     * - It ONLY means: "allowed to refetch if a refetch trigger happens".
     */
    staleTime: 5 * 60 * 1000,

    /**
     * ✅ refetchOnWindowFocus: false
     * - Normally, when a query is STALE and user switches tabs / minimizes / refocuses the browser,
     *   React Query may refetch to keep data up to date.
     * - We disable it to avoid extra /me calls and prevent UI flicker in dashboards.
     *
     * So tab switching / minimize / maximize will NOT refetch /me in your setup.
     */
    refetchOnWindowFocus: false,

    /**
     * ✅ Why this is stable in your DashboardGuard layout:
     * - If useMe() is called inside app/dashboard/layout.tsx (DashboardGuard),
     *   the layout typically stays mounted while navigating within /dashboard/*
     *   (e.g., /dashboard -> /dashboard/courses).
     * - Because the layout does NOT remount, useMe() does NOT re-run on every child page navigation.
     *
     * ✅ When /me will still refetch (only if one of these happens):
     * 1) Hard refresh / full reload (layout mounts again)  -> query runs again
     * 2) You manually call queryClient.invalidateQueries(["auth","me"]) -> refetch
     * 3) If you enable refetchOnReconnect / refetchOnMount, those triggers can refetch too
     *
     * ❌ It will NOT refetch just because 5 minutes passed.
     */
  });
}
