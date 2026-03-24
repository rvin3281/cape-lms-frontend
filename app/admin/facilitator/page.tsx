import FacilitatorTable from "@/components/features/facilitator/columns/facilitator-table";
import PageHeader from "@/components/layout/PageHeader";

function page() {
  return (
    <>
      <PageHeader
        title={`Facilitator List`}
        description="View and manage the list of facilitators. Easily browse, search, and access key information in one place."
      />

      <div className="p-4 grid">
        <section className="grid grid-cols-1 gap-5">
          <div>
            <FacilitatorTable />
          </div>
        </section>
      </div>
    </>
  );
}
export default page;
