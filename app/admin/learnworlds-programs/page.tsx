import LearnworldsProgramTable from "@/components/features/learnworlds-program/learnworlds-program-table";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "LearnWorlds Program Management | CAPE-LMS",
  description:
    "Manage LearnWorlds programs in CAPE-LMS and keep program details, learner assignments, and enrollment records aligned across both platforms.",
};

function page() {
  return (
    <>
      <PageHeader
        title="LearnWorlds Program Management"
        description="View and manage all programs created in LearnWorlds and assigned to learners. Keep this list aligned with LearnWorlds—if any program details or enrollments are changed there, the same updates must be reflected here to maintain data consistency."
      />

      <div className="p-4 grid">
        <section className="grid grid-cols-1 gap-5">
          <div>
            <LearnworldsProgramTable />
          </div>
        </section>
      </div>
    </>
  );
}
export default page;
