import { UPDATE_USER_PROFILE_ACCOUNT } from "@/lib/constant/api-url";
import { TUpdateUserProfileAccountSchema } from "@/lib/validation/zodValidationSchema";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateUserProfileAccounts = async ({
  email,
  data,
}: {
  email: string;
  data: TUpdateUserProfileAccountSchema;
}) => {
  const res = await axiosInstance.patch(
    `${UPDATE_USER_PROFILE_ACCOUNT}?email=${email}`,
    data,
  );
  return res.data;
};

export const useUpdateProfileAccount = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateProfile", "account"],
    mutationFn: (data: TUpdateUserProfileAccountSchema) =>
      updateUserProfileAccounts({ email, data }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "onboarding", email],
      });
    },
  });
};
