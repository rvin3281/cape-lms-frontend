import { UPDATE_USER_PROFILE_CAREER } from "@/lib/constant/api-url";
import { TUpdateUserProfileCareerSchema } from "@/lib/validation/zodValidationSchema";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateUserProfileCareer = async ({
  email,
  data,
}: {
  email: string;
  data: TUpdateUserProfileCareerSchema;
}) => {
  const res = await axiosInstance.patch(
    `${UPDATE_USER_PROFILE_CAREER}?email=${email}`,
    data,
  );
  return res.data;
};

export const useUpdateProfileCareer = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateProfile", "career", email],
    mutationFn: (data: TUpdateUserProfileCareerSchema) =>
      updateUserProfileCareer({ email, data }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user", "onboarding", email],
      });

      await queryClient.refetchQueries({
        queryKey: ["user", "onboarding", email],
        exact: true,
      });
    },
  });
};
