"use client";

import { useGetAllClassroomProgramByUser } from "@/app/queries/useGetAllClassroomProgramByUser";
import { selectAuthUser } from "@/lib/redux/feature/auth/authSelectors";
import { useAppSelector } from "@/lib/redux/hooks";
import { ClassroomProgramDto } from "@/lib/types/classroom-program.types";
import { Skeleton } from "../ui/skeleton";
import ClassroomProgramCard from "./ClassroomProgramCard";

function ClassroomProgramListing() {
  const user = useAppSelector(selectAuthUser);

  const { data, isLoading, isFetching } = useGetAllClassroomProgramByUser(
    user?.id,
  );

  const classroomProgramData = data?.data ?? [];

  const handleReviewClick = (item: ClassroomProgramDto) => {
    console.log("Review clicked:", item);
  };
  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border p-5 space-y-4 shadow-sm"
          >
            <Skeleton className="h-6 w-2/3 rounded-md" />
            <Skeleton className="h-4 w-1/3 rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (!classroomProgramData.length) {
    return (
      <div className="rounded-2xl border border-dashed p-10 text-center">
        <h3 className="text-lg font-semibold">No classroom programs found</h3>
        <p className="text-sm text-muted-foreground mt-2">
          You have not been enrolled in any classroom program yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
      {classroomProgramData.map((item) => (
        <ClassroomProgramCard
          key={item.enrollmentId}
          item={item}
          onReviewClick={handleReviewClick}
        />
      ))}
    </div>
  );
}
export default ClassroomProgramListing;
