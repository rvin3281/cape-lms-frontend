/* eslint-disable @typescript-eslint/no-explicit-any */
import { LEARNWORLDS_VALIDATE_EMAIL_API } from "@/lib/constant/api-url";
import { TFirstTimeLoginEmailSchema } from "@/lib/validation/zodValidationSchema";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const firstLogin = async (data: TFirstTimeLoginEmailSchema): Promise<any> => {
  const res = await axiosInstance.post(LEARNWORLDS_VALIDATE_EMAIL_API, data);
  return res.data;
};

export const useFirstLogin = () => {
  return useMutation({
    mutationFn: firstLogin,
    mutationKey: ["user", "first-login"],
  });
};
