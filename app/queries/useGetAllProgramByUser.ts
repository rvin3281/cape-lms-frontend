import { CAPE_USER } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getAllProgramByUser = async ({ userId }: { userId: string }) => {
  const res = await axiosInstance.get(`${CAPE_USER}/${userId}/programs`);
  return res.data;
};

export const useGetAllProgramByUser = (userId?: string | null) => {
  return useQuery({
    queryKey: ["program-by-user", userId],
    queryFn: () => getAllProgramByUser({ userId: userId as string }),
    enabled: !!userId,
    staleTime: 0,
  });
};
