import { USER_PROGRAM_ONBOARDING } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export type ProgramOnboardingListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
};

export const queryKeys = {
  programOnboardingList: (page: number, pageSize: number, search: string) =>
    ["program-onboarding", page, pageSize, search] as const,
};

const getAllProgramOnboarding = async (params: ProgramOnboardingListParams) => {
  const res = await axiosInstance.get(USER_PROGRAM_ONBOARDING, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      search: params.search ?? "",
    },
  });

  return res.data;
};

export const useGetAllProgramOnboarding = ({
  page = 1,
  pageSize = 10,
  search = "",
}: ProgramOnboardingListParams) => {
  return useQuery({
    queryKey: queryKeys.programOnboardingList(page, pageSize, search),
    queryFn: () =>
      getAllProgramOnboarding({
        page,
        pageSize,
        search,
      }),
    placeholderData: (previousData) => previousData,
  });
};
