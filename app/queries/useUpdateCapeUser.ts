import { CAPE_USER } from "@/lib/constant/api-url";
import { TUpdateCapeUserSchema } from "@/lib/validation/zodValidationSchema";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateCapeUserPayload = {
  id: string;
  dto: TUpdateCapeUserSchema;
};

const updateCapeUser = async (data: UpdateCapeUserPayload) => {
  const res = await axiosInstance.patch(`${CAPE_USER}/${data.id}`, data.dto);
  return res.data;
};

export const useUpdateCapeUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCapeUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cape-users"],
        refetchType: "active",
      });
    },
  });
};
