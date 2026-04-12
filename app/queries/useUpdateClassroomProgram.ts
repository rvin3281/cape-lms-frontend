import { USER_PROGRAM_ONBOARDING } from "@/lib/constant/api-url";
import { TUpdateClassroomProgramSchema } from "@/lib/validation/zodValidationSchema";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateClassroomProgramPayload = TUpdateClassroomProgramSchema & {
  programId: string;
  totalFacilitators: number;
};

const updateClassroomProgram = async (data: UpdateClassroomProgramPayload) => {
  const formData = new FormData();

  formData.append("programName", data.programName);
  formData.append("programCohort", data.programCohort);
  formData.append("programDate", data.programDate.toISOString());
  formData.append("totalFacilitators", String(data.totalFacilitators));
  formData.append("facilitators", JSON.stringify(data.facilitators));

  if (data.learnerFile) {
    formData.append("learnerFile", data.learnerFile);
  }

  const res = await axiosInstance.patch(
    `${USER_PROGRAM_ONBOARDING}/${data.programId}`,
    formData,
  );

  return res.data;
};

export const useUpdateClassroomProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateClassroomProgram,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["classroom-programs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["program-onboarding"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cape-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["classroom-program-detail", variables.programId],
      });
    },
  });
};
