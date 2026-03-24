import { FACILITITATOR } from "@/lib/constant/api-url";
import { TFacilatorSchema } from "@/lib/validation/zodValidationSchema";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateFacilitatorPayLoad = {
  id: string;
  dto: TFacilatorSchema;
};

const updateFacilitator = async (data: UpdateFacilitatorPayLoad) => {
  const res = await axiosInstance.patch(
    `${FACILITITATOR}/${data.id}`,
    data.dto,
  );
  return res.data;
};

export const useUpdateFacilitator = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFacilitator,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["facilitators"],
      });
    },
  });
};
