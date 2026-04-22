import AddFacilatorForm from "@/components/admin/facilitator/AddFacilatorForm";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Add Facilitator | CAPE-LMS",
  description:
    "Create a new facilitator profile in CAPE-LMS to assign them to classroom programs and manage facilitator information efficiently.",
};

function page() {
  return (
    <>
      <PageHeader
        title={`Add Facilator`}
        description="Create a new facilitator profile by entering the required details below. Once added, the facilitator can be assigned to relevant programs and managed through the facilitator module."
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
