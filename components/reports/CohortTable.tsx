"use client";
import { useGetCohort } from "@/app/queries/reports/useGetCohort";
import { CohortRow } from "@/lib/types/table-row-types/cohort-row.types";
import { useState } from "react";
import CohortDataTable from "../table/cohort-table/cohort-data-table";

function CohortTable() {
  const [pageIndex, setPageIndex] = useState(0);

  const page = pageIndex + 1; // API is 1-based

  const { data, isLoading, error } = useGetCohort(page);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isLoading && !error && data) {
    const tableData: CohortRow[] = data.data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      access: item.access,
      createdAt: item.created,
      totalCourse: item.products.courses.length,
    }));

    return (
      <>
        {/* Header */}
        {/* <div>
          <h1>Header</h1>
        </div> */}

        {/* Data Table */}
        <CohortDataTable
          data={tableData}
          meta={data.meta}
          initialPageSize={20}
          pageIndex={pageIndex}
          onPageIndexChange={setPageIndex}
        />
      </>
    );
  }
}
export default CohortTable;
