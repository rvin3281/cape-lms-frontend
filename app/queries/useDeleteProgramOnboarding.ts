import { USER_PROGRAM_ONBOARDING } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteProgramOnboarding = async (id: string) => {
  const res = await axiosInstance.delete(`${USER_PROGRAM_ONBOARDING}/${id}`);
  return res.data;
};

export const useDeleteProgramOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProgramOnboarding,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["program-onboarding"],
      });
    },
    onError: () => {},
  });
};
