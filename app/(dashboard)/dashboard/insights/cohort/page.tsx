import PageHeader from "@/components/layout/PageHeader";
import CohortTable from "@/components/reports/CohortTable";

export const metadata = {
  title: "",
  description: "",
  // robots: {
  //   index: true,
  //   follow: true,
  // },
  // alternates: {
  //   canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_CONTACT_US}`,
  // },
};

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
