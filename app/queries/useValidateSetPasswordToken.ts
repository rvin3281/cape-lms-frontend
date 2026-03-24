import { VALIDATE_PASSWORD_TOKEN_API } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const validatePasswordToken = async ({
  token,
  email,
}: {
  token: string;
  email: string;
}) => {
  const res = await axiosInstance.get(VALIDATE_PASSWORD_TOKEN_API, {
    params: {
      token,
      email,
    },
  });

  return res.data;
};

export const useValidateSetPasswordToken = ({
  token,
  email,
  enabled,
}: {
  token: string;
  email: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["password", "token", email, token],
    queryFn: () => validatePasswordToken({ token, email }),
    enabled,
    retry: false,
    staleTime: 0,
    gcTime: 0,
  });
};
