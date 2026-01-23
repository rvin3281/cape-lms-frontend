import { VALIDATE_PASSWORD_TOKEN_API } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const validatePasswordToken = async ({
  token,
  email,
}: {
  token: string;
  email: string;
}) => {
  const res = await axiosInstance.post(VALIDATE_PASSWORD_TOKEN_API, {
    token,
    email,
  });
  console.log("response", res);
  return res.data;
};

export const useValidateSetPasswordToken = () => {
  return useMutation({
    mutationFn: validatePasswordToken,
    mutationKey: ["password", "token"],
  });
};
