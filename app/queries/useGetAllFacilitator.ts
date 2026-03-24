import { FACILITITATOR } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export type FacilitatorListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
};

export const queryKeys = {
  facilitators: (page: number, pageSize: number, search: string) =>
    ["facilitators", page, pageSize, search] as const,
};

const getFacilitators = async (params: FacilitatorListParams) => {
  const res = await axiosInstance.get(FACILITITATOR, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      search: params.search ?? "",
    },
  });
  return res.data;
};

export const useGetAllFacilitator = ({
  page = 1,
  pageSize = 10,
  search = "",
}: FacilitatorListParams) => {
  return useQuery({
    queryKey: queryKeys.facilitators(page, pageSize, search),
    queryFn: () =>
      getFacilitators({
        page,
        pageSize,
        search,
      }),
    placeholderData: (previousData) => previousData,
  });
};
