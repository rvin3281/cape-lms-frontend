import PageUnderDevelopment from "@/components/custom-ui/PageUnderDevelopment";
import PageHeader from "@/components/layout/PageHeader";

function page() {
  return (
    <>
      <PageHeader
        title="Courses"
        description="View and manage the course offerings available across the CAPE learning platform"
      />

      <PageUnderDevelopment
        title="Courses page is under development"
        description="This page is currently being developed to support course visibility and management across the CAPE learning platform."
        badgeText="Courses In Progress"
        note="The list of courses offered through LearnWorlds will be available here once development is completed."
        variant="purple"
        imageSrc="/images/page-under-construction.png"
        imageAlt="Courses page under development"
      >
        <div className="grid gap-4 p-4">development in progress</div>
      </PageUnderDevelopment>
    </>
  );
}
export default page;
