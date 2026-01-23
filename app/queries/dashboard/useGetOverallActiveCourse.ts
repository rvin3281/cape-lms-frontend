"use client";

import { GET_ALL_TOTAL_NUMBER_ACTIVE_COURSE } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

// queryKey tuple type
type OverallActiveCourseKey = ["course", string];

const getAllActiveCourse = async (
  ctx: QueryFunctionContext<OverallActiveCourseKey>
) => {
  const [, id] = ctx.queryKey;

  const res = await axiosInstance.get(GET_ALL_TOTAL_NUMBER_ACTIVE_COURSE(id));

  return res.data;
};

export const useGetOverallActiveCourse = (id?: string) => {
  return useQuery({
    queryKey: ["course", id ?? ""] as const,
    enabled: !!id, // avoid running when id is empty
    queryFn: getAllActiveCourse,
  });
};
