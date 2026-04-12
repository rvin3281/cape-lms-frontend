import { LEARNWORLDS_PROGRAM } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteLearnworldsProgram = async (productId: string) => {
  if (!productId) {
    throw new Error("Product id is required");
  }

  const res = await axiosInstance.delete(`${LEARNWORLDS_PROGRAM}/${productId}`);
  return res.data;
};

export const useDeleteLearnworldsProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLearnworldsProgram,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["learnworlds-program"],
      });
    },
  });
};
