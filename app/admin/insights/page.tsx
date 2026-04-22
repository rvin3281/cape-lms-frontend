import PageUnderDevelopment from "@/components/custom-ui/PageUnderDevelopment";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Insights | CAPE-LMS",
  description:
    "Explore insights and analytics in CAPE-LMS, including learner engagement, program performance, and overall platform activity.",
};

function page() {
  return (
    <>
      <PageHeader
        title="Insights"
        description="Gain a comprehensive overview of platform performance, learner engagement, and program effectiveness."
      />

      <PageUnderDevelopment
        title="Insights dashboard is under development"
        description="This section is being developed to provide meaningful analytics and data-driven insights across learners, programs, and overall platform activity."
        badgeText="Insights In Progress"
        note="Analytics on learner engagement, program performance, and key metrics will be available here once development is completed."
        variant="blue"
        imageSrc="/images/page-under-construction.png"
        imageAlt="Insights dashboard under development"
      >
        <div className="grid gap-4 p-4">development in progress</div>
      </PageUnderDevelopment>
    </>
  );
}
export default page;
