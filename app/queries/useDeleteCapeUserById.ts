import { CAPE_USER } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteCapeUserById = async (id: string) => {
  const res = await axiosInstance.delete(`${CAPE_USER}/${id}`);
  return res.data;
};

export const useDeleteCapeUserById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCapeUserById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cape-users"],
      });
    },
  });
};
