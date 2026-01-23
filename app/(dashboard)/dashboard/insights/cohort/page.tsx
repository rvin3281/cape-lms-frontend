import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import CohortTable from "@/components/reports/CohortTable";

function page() {
  return (
    <>
      <PageHeader
        title="Cohort Insights"
        description="View all Cohort Details"
      />
      <section className="grid grid-cols-1">
        <CohortTable />
      </section>
    </>
  );
}

export default page;
