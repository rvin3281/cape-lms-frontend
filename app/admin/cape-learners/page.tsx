import CapeUserTable from "@/components/features/cape-user/cape-user-table";
import PageHeader from "@/components/layout/PageHeader";

function page() {
  return (
    <>
      <PageHeader
        title="Learner Management"
        description="View and manage all CAPE learners across classroom and online programs. Update details, manage enrollments, or remove users as needed."
      />

      <div className="p-4 grid">
        <section className="grid grid-cols-1 gap-5">
          <div>
            <CapeUserTable />
          </div>
        </section>
      </div>
    </>
  );
}
export default page;
