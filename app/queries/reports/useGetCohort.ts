import { BundlesResponse } from "@/lib/interface/Ibundle.interface";
import axiosInstance from "@/utils/axiosInstance";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const getCohort = async (page: number): Promise<BundlesResponse> => {
  const response = await axiosInstance.get("/report/cohort", {
    params: { page },
  });

  return { data: response.data.data.data, meta: response.data.data.meta };
};

export const useGetCohort = (page: number) => {
  return useQuery({
    queryKey: ["cohort", page],
    queryFn: () => getCohort(page),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
};
