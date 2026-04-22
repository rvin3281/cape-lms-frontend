import PageUnderDevelopment from "@/components/custom-ui/PageUnderDevelopment";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Achievements | CAPE-LMS",
  description:
    "View achievements, learning milestones, and progress highlights from your classroom learning journey in CAPE-LMS.",
};

function page() {
  return (
    <>
      <PageHeader
        title="Achievements"
        description="View milestones, accomplishments, and progress highlights from your learning journey."
      />

      <PageUnderDevelopment
        title="Achievements page is under development"
        description="This section is currently being developed to showcase learner accomplishments, progress milestones, and other meaningful achievements across the platform."
        badgeText="Achievements In Progress"
        note="Completed milestones, recognition highlights, and achievement-related updates will be available here once development is completed."
        variant="blue"
        imageSrc="/images/page-under-construction.png"
        imageAlt="Achievements page under development"
      >
        <div className="grid gap-4 p-4">development in progress</div>
      </PageUnderDevelopment>
    </>
  );
}
export default page;
