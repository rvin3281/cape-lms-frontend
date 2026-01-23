"use client";
import { LOGOUT_API } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

async function logout() {
  const res = await axiosInstance.post(LOGOUT_API);
  return res.data;
}

export function useLogout() {
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      qc.removeQueries({ queryKey: ["auth", "me"] });
      router.replace("/login");
    },
  });
}
