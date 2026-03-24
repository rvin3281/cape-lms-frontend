import { FACILITITATOR } from "@/lib/constant/api-url";
import { TFacilatorSchema } from "@/lib/validation/zodValidationSchema";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addNewFacilitator = async (dto: TFacilatorSchema) => {
  const res = await axiosInstance.post(FACILITITATOR, dto);
  return res.data;
};

export const useAddNewFacilitator = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNewFacilitator,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["facilitators"],
      });
    },
  });
};
