import { FACILITITATOR } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const deleteFacilitatorById = async (id: string) => {
  const res = await axiosInstance.delete(`${FACILITITATOR}/${id}`);
  return res.data;
};

export const useDeleteFacilitatorById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFacilitatorById,
    onSuccess: () => {
      toast.success("Facilitator deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: ["facilitators"],
      });
    },
    onError: () => {
      toast.error("Unable to delete facilitator.");
    },
  });
};
