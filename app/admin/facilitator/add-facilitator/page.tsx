import AddFacilatorForm from "@/components/admin/facilitator/AddFacilatorForm";
import PageHeader from "@/components/layout/PageHeader";

function page() {
  return (
    <>
      <PageHeader
        title={`Add Facilator`}
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id temporibus illo placeat magnam consectetur distinctio explicabo esse, eaque quae et."
      />

      <div className="p-4 grid">
        <section className="grid grid-cols-1 gap-5">
          <div>
            <AddFacilatorForm />
          </div>
        </section>
      </div>
    </>
  );
}
export default page;
