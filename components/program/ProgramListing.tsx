"use client";
import { useGetAllProgramByUser } from "@/app/queries/dashboard/useGetAllProgramByUser";
import { GetUserProgramsResponse } from "@/lib/interface/IGetUserProgramResponse";
import { selectAuthUser } from "@/lib/redux/feature/auth/authSelectors";
import { useAppSelector } from "@/lib/redux/hooks";
import ProgramCard from "./ProgramCard";

function ProgramListing() {
  const user = useAppSelector(selectAuthUser);

  const { data, isLoading, isFetching } = useGetAllProgramByUser(user?.email);

  const userProgramData: GetUserProgramsResponse = data?.data?.data;

  const programData: {
    productId: string;
    title: string;
    description: string;
    url: string;
  }[] =
    userProgramData?.programs?.map((item: any) => {
      return {
        productId: item?.program?.productId,
        title: item?.program?.title,
        description: item?.program?.description,
        url: item?.program?.url,
      };
    }) ?? [];

  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
        {/* replace with Skeleton later */}
        <div className="h-48 rounded-2xl border" />
        <div className="h-48 rounded-2xl border" />
        <div className="h-48 rounded-2xl border" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
        {programData.map((item, index) => (
          <ProgramCard
            title={item?.title}
            productId={item?.productId}
            description={item?.description}
            url={item?.url}
            key={index}
            userEmail={user?.email}
          />
        ))}
      </div>
    </>
  );
}
export default ProgramListing;
