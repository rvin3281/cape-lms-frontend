import { LEARNWORLDS_PROGRAM } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdateLearnworldsProgramPayload = {
  productId: string;
  productTitle: string;
  productDescription: string;
  productUrl: string;
};

const updateLearnworldsProgram = async (
  data: UpdateLearnworldsProgramPayload,
) => {
  const { productId, ...payload } = data;

  const res = await axiosInstance.patch(
    `${LEARNWORLDS_PROGRAM}/${productId}`,
    payload,
  );

  return res.data;
};

export const useUpdateLearnworldsProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update", "learnworlds-program"],
    mutationFn: (data: UpdateLearnworldsProgramPayload) =>
      updateLearnworldsProgram(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["learnworlds-program"],
      });
    },
  });
};
