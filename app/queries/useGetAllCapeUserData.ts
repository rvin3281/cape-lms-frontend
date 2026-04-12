import { CAPE_USER } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export type CapeUserListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
};

export const queryKeys = {
  capeUsersList: (page: number, pageSize: number, search: string) =>
    ["cape-users", page, pageSize, search] as const,
};

const getAllCapeUser = async (params: CapeUserListParams) => {
  const res = await axiosInstance.get(CAPE_USER, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      search: params.search ?? "",
    },
  });
  return res.data;
};

export const useGetAllCapeUser = ({
  page = 1,
  pageSize = 10,
  search = "",
}: CapeUserListParams) => {
  return useQuery({
    queryKey: queryKeys.capeUsersList(page, pageSize, search),
    queryFn: () =>
      getAllCapeUser({
        page,
        pageSize,
        search,
      }),
    placeholderData: (previousData) => previousData,
  });
};
