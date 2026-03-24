import ProgramOnboardingTable from "@/components/features/program-onboarding/program-onboarding-table";
import PageHeader from "@/components/layout/PageHeader";

function page() {
  return (
    <>
      <PageHeader
        title={`Program Onboarding (Classroom Learners)`}
        description="View and manage all onboarded programs, including total learners and facilitators. Update program details or remove records to ensure accurate and up-to-date program information."
      />

      <div className="p-4 grid">
        <section className="grid grid-cols-1 gap-5">
          <div>
            <ProgramOnboardingTable />
          </div>
        </section>
      </div>
    </>
  );
}
export default page;
