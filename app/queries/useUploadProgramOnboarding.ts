import { USER_PROGRAM_ONBOARDING } from "@/lib/constant/api-url";
import { TProgramOnboardingSchema } from "@/lib/validation/zodValidationSchema";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const uploadProgramOnboarding = async (data: TProgramOnboardingSchema) => {
  console.log("DATA", data);

  const formData = new FormData();

  formData.append("programName", data.programName);
  formData.append("programCohort", data.programCohort);
  formData.append("programDate", data.programDate.toISOString());

  formData.append("learnerFile", data.learnerFile);

  formData.append("totalFacilitators", String(data.totalFacilitators));

  formData.append("facilitators", JSON.stringify(data.facilitators));

  const res = await axiosInstance.post(USER_PROGRAM_ONBOARDING, formData);

  return res.data;
};

export const useUploadProgramOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProgramOnboarding,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["program-onboarding"],
      });
    },
    onError: () => {},
  });
};
