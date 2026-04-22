import PageUnderDevelopment from "@/components/custom-ui/PageUnderDevelopment";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Skills | CAPE-LMS",
  description:
    "Explore skill development, learning focus areas, and progress tracking within your CAPE-LMS learning journey.",
};

function page() {
  return (
    <>
      <PageHeader
        title="Skills"
        description="Explore and track skills that support your learning growth and development journey."
      />

      <PageUnderDevelopment
        title="Skills page is under development"
        description="This section is being developed to provide better visibility into skills development, learning focus areas, and related progress across the platform."
        badgeText="Skills In Progress"
        note="Skill-related information, learning categories, and development insights will be available here once development is completed."
        variant="blue"
        imageSrc="/images/page-under-construction.png"
        imageAlt="Skills page under development"
      >
        <div className="grid gap-4 p-4">development in progress</div>
      </PageUnderDevelopment>
    </>
  );
}
export default page;
