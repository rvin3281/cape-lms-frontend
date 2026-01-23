import { ONBOARDING_LEARNER } from "@/lib/constant/api-url";
import { TOnboardingAccountInformationSchema } from "@/lib/validation/zodValidationSchema";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// type CompleteOnboardingPayload = {
//   email: string;
// };

const onBoardingComplete = async (
  data: TOnboardingAccountInformationSchema,
) => {
  const res = await axiosInstance.post(ONBOARDING_LEARNER, data);
  return res.data;
};

export const useCompleteOnBoarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["onboarding", "complete"],
    mutationFn: onBoardingComplete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });
    },
  });
};
