import { Skeleton } from "@/components/ui/skeleton";

function ProfileTabsSkeleton() {
  return (
    <div className="w-full h-full">
      {/* TabsList skeleton */}
      <div className="mb-5 inline-flex h-10 items-center gap-2 rounded-md border bg-background p-1">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-28 rounded-md" />
      </div>

      {/* Content skeleton (match your card look) */}
      <div className="space-y-4 h-full">
        <div className="rounded-2xl border bg-background px-8 py-7 h-full">
          <div className="flex flex-col items-center gap-6">
            <div className="space-y-2 w-full">
              <Skeleton className="h-5" />
              <Skeleton className="h-5 w-[90%]" />
              <Skeleton className="h-5 w-[80%]" />
              <Skeleton className="h-5 w-[70%]" />
            </div>
            <div className="space-y-2 w-full">
              <Skeleton className="h-5" />
              <Skeleton className="h-5 w-[90%]" />
              <Skeleton className="h-5 w-[80%]" />
              <Skeleton className="h-5 w-[70%]" />
            </div>
            <div className="space-y-2 w-full">
              <Skeleton className="h-5" />
              <Skeleton className="h-5 w-[90%]" />
              <Skeleton className="h-5 w-[80%]" />
              <Skeleton className="h-5 w-[70%]" />
            </div>
            <div className="space-y-2 w-full">
              <Skeleton className="h-5" />
              <Skeleton className="h-5 w-[90%]" />
              <Skeleton className="h-5 w-[80%]" />
              <Skeleton className="h-5 w-[70%]" />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Skeleton className="h-8 w-28 rounded-full" />
            <Skeleton className="h-8 w-32 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTabsSkeleton;
