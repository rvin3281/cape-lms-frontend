/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LOGIN_API } from "@/lib/constant/api-url";
import { APIObjectSuccessResponse } from "@/lib/interface/APIResponse";
import { ILoginResponse } from "@/lib/interface/ILoginResponse";
import { TLoginSchema } from "@/lib/validation/zodValidationSchema";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function userLogin(
  data: TLoginSchema,
): Promise<APIObjectSuccessResponse<ILoginResponse>> {
  const response = await axiosInstance.post(LOGIN_API, data, {
    _skipRefresh: true,
  } as any);
  return response.data;
}

export const useLogin = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: userLogin,
    mutationKey: ["user", "login"],
    onSuccess: async (data) => {
      // ✅ tells app "auth state changed"
      await qc.invalidateQueries({ queryKey: ["auth", "me"] });
    },
    onError: (error: any) => {
      // console.log(JSON.stringify(error, null, 2));
      // console.log("error", error);
    },
  });
};
