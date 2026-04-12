import { LEARNWORLDS_PROGRAM } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export type LearnworldsProgramListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
};

export const queryKeys = {
  learnworldsProgramList: (page: number, pageSize: number, search: string) =>
    ["learnworlds-program", page, pageSize, search] as const,
};

const getAllProgramOnboarding = async (
  params: LearnworldsProgramListParams,
) => {
  const res = await axiosInstance.get(LEARNWORLDS_PROGRAM, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      search: params.search ?? "",
    },
  });

  return res.data;
};

export const useGetAllLearnworldsProgram = ({
  page = 1,
  pageSize = 10,
  search = "",
}: LearnworldsProgramListParams) => {
  return useQuery({
    queryKey: queryKeys.learnworldsProgramList(page, pageSize, search),
    queryFn: () =>
      getAllProgramOnboarding({
        page,
        pageSize,
        search,
      }),
    placeholderData: (previousData) => previousData,
  });
};
