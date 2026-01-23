"use client";

import { useGetAllCohorts } from "@/app/queries/dashboard/useGetAllCohorts";
import React from "react";

function CohortPageClient() {
  const { data, isLoading, isError, error } = useGetAllCohorts();

  if (isLoading) return <div>Loading...</div>;

  if (isError || !data) return <div>Error: {error?.message}</div>;

  return <div>CohortPageClient</div>;
}

export default CohortPageClient;
