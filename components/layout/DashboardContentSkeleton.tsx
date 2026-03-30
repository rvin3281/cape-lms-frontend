"use client";

import { Skeleton } from "@/components/ui/skeleton";

type DashboardContentSkeletonProps = {
  cards?: number;
  rows?: number;
  showSecondaryPanel?: boolean;
};

export default function DashboardContentSkeleton({
  cards = 4,
  rows = 5,
  showSecondaryPanel = true,
}: DashboardContentSkeletonProps) {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-7xl space-y-6 p-6 md:p-8">
        {/* Header */}
        <section className="space-y-3">
          <Skeleton className="h-8 w-56 rounded-xl" />
          <Skeleton className="h-4 w-80 max-w-full rounded-lg" />
        </section>

        {/* Summary cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: cards }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border bg-card p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <Skeleton className="h-4 w-24 rounded-lg" />
                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>

              <Skeleton className="mb-3 h-7 w-20 rounded-lg" />
              <Skeleton className="h-3 w-28 rounded-lg" />
            </div>
          ))}
        </section>

        {/* Main content area */}
        <section
          className={`grid grid-cols-1 gap-6 ${
            showSecondaryPanel ? "xl:grid-cols-3" : ""
          }`}
        >
          {/* Primary content */}
          <div
            className={`rounded-2xl border bg-card p-5 shadow-sm ${
              showSecondaryPanel ? "xl:col-span-2" : ""
            }`}
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-40 rounded-lg" />
                <Skeleton className="h-3 w-56 rounded-lg" />
              </div>
              <Skeleton className="h-9 w-24 rounded-xl" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-52 w-full rounded-2xl" />

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Skeleton className="h-24 w-full rounded-2xl" />
                <Skeleton className="h-24 w-full rounded-2xl" />
              </div>
            </div>
          </div>

          {/* Secondary panel */}
          {showSecondaryPanel && (
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <div className="mb-5 space-y-2">
                <Skeleton className="h-5 w-32 rounded-lg" />
                <Skeleton className="h-3 w-40 rounded-lg" />
              </div>

              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-4/5 rounded-lg" />
                      <Skeleton className="h-3 w-3/5 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* List / table section */}
        <section className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-36 rounded-lg" />
              <Skeleton className="h-3 w-52 rounded-lg" />
            </div>
            <Skeleton className="h-9 w-28 rounded-xl" />
          </div>

          <div className="space-y-3">
            {Array.from({ length: rows }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-12 items-center gap-3 rounded-xl border p-3"
              >
                <Skeleton className="col-span-12 sm:col-span-4 h-4 w-full rounded-lg" />
                <Skeleton className="col-span-6 sm:col-span-3 h-4 w-full rounded-lg" />
                <Skeleton className="col-span-6 sm:col-span-2 h-4 w-full rounded-lg" />
                <Skeleton className="col-span-12 sm:col-span-3 h-8 w-full rounded-xl" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
