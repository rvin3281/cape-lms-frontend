import { SSO_USER_PROGRAM } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const authenticateUserToProgram = async (data: {
  email: string;
  redirectUrl: string;
}) => {
  const res = await axiosInstance.post(SSO_USER_PROGRAM, data);

  return res.data;
};

export const useProgramSSOAuth = () => {
  return useMutation({
    mutationFn: authenticateUserToProgram,
    mutationKey: ["user", "program", "sso"],
  });
};
