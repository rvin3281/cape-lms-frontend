import { SET_PASSWORD_API } from "@/lib/constant/api-url";
import { TFirstTimeSetPasswordSchema } from "@/lib/validation/zodValidationSchema";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const setPassword = async (
  data: TFirstTimeSetPasswordSchema & { email: string | undefined }
) => {
  const res = await axiosInstance.post(SET_PASSWORD_API, data);
  return res.data;
};

export const useSetPassword = () => {
  return useMutation({
    mutationKey: ["user", "set-password"],
    mutationFn: setPassword,
  });
};
