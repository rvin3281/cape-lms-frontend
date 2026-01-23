"use client";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getAllCohorts = async () => {
  const res = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_LW_API}/bundles`
  );
  return res.data;
};

export const useGetAllCohorts = () => {
  return useQuery({
    queryFn: getAllCohorts,
    queryKey: ["cohort", "all"],
  });
};
