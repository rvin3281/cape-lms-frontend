import ProgramOnboardingForm from "@/components/admin/program-onboarding-ui/ProgramOnboardingForm";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Create Program Onboarding | CAPE-LMS",
  description:
    "Set up a new classroom program in CAPE-LMS by adding program details, assigning facilitators, and uploading learner information.",
};

function ProgramOnboardingPage() {
  return (
    <>
      <PageHeader
        title={`Program Onboarding`}
        description="Set up a new training program by entering program details, assigning facilitators, and uploading learner information to prepare the program for enrollment."
      />

      <div className="p-4 grid">
        <section className="grid grid-cols-1 gap-5">
          <div>
            <ProgramOnboardingForm />
          </div>
        </section>
      </div>
    </>
  );
}
export default ProgramOnboardingPage;
