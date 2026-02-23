import { GET_ALL_PROGRAM_BY_USER } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

type UserProgramQueryKey = readonly ["user-program", string | undefined];

const getAllProgramByUser = async (
  ctx: QueryFunctionContext<UserProgramQueryKey>,
) => {
  const [, email] = ctx.queryKey;

  // enabled prevents running when undefined,
  // but TS still wants you to handle it.
  if (!email) throw new Error("Email is required");

  const res = await axiosInstance.get(`${GET_ALL_PROGRAM_BY_USER}/${email}`);

  console.log("GET ALL PROGRAM BY USER RES:", res);

  return res.data;
};

export const useGetAllProgramByUser = (email?: string) => {
  return useQuery({
    queryKey: ["user-program", email] as const,
    enabled: !!email,
    queryFn: getAllProgramByUser,
  });
};
