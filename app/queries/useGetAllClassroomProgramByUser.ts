import { GET_ALL_CLASSROOM_PROGRAM_BY_USER } from "@/lib/constant/api-url";
import { GetAllClassroomProgramByUserResponseDto } from "@/lib/types/classroom-program.types";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getAllClassroomProgramByUser = async (
  userId: string,
): Promise<GetAllClassroomProgramByUserResponseDto> => {
  const res = await axiosInstance.get(
    `${GET_ALL_CLASSROOM_PROGRAM_BY_USER}/${userId}`,
  );
  return res.data;
};

export const useGetAllClassroomProgramByUser = (userId?: string) => {
  return useQuery({
    queryKey: ["classroom-program-by-user", userId],
    queryFn: () => getAllClassroomProgramByUser(userId as string),
    enabled: !!userId,
  });
};
