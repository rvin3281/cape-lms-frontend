"use client";
import { ME_API } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

async function getMe() {
  const res = await axiosInstance.get(ME_API);
  return res.data;
}

export function useMe() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
