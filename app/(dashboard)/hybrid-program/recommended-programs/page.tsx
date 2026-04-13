import PageUnderDevelopment from "@/components/custom-ui/PageUnderDevelopment";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Recommended Programs | CAPE-LMS",
  description:
    "View personalized program recommendations based on your learning progress and interests within CAPE-LMS.",
  // robots: {
  //   index: true,
  //   follow: true,
  // },
  // alternates: {
  //   canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_CONTACT_US}`,
  // },
};

function RecommendedProgramsPage() {
  return (
    <>
      <PageHeader
        title="Recommended Program"
        description="Discover programs that may be relevant to your learning interests and overall development journey."
      />

      <PageUnderDevelopment
        title="Recommended programs page is under development"
        description="This section is being developed to provide more relevant program suggestions based on learner activity, interests, and overall learning experience."
        badgeText="Recommendations In Progress"
        note="Personalized program recommendations and related learning opportunities will be available here once development is completed."
        variant="blue"
        imageSrc="/images/page-under-construction.png"
        imageAlt="Recommended programs page under development"
      >
        <div className="grid gap-4 p-4">development in progress</div>
      </PageUnderDevelopment>
    </>
  );
}
export default RecommendedProgramsPage;
