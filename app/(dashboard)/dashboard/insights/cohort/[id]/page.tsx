import PageHeader from "@/components/layout/PageHeader";
import CohortByIdLayout from "@/components/reports/CohortByIdLayout";
import { cohortDescriptionFromSlug } from "@/utils/cohortDescription";
import { slugToTitle } from "@/utils/slugToTitle";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function page({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <PageHeader
        title={slugToTitle(id)}
        description={cohortDescriptionFromSlug(id)}
      />
      <section className="grid grid-cols-1">
        <CohortByIdLayout />
      </section>
    </>
  );
}

export default page;
