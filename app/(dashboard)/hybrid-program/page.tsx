import PageHeader from "@/components/layout/PageHeader";
import ProgramFilter from "@/components/program/ProgramFilter";
import ProgramListing from "@/components/program/ProgramListing";

export const metadata = {
  title: "Explore Programs | CAPE-LMS",
  description:
    "Browse available professional programs, filter by category, and discover new learning opportunities within CAPE-LMS.",
  // robots: {
  //   index: true,
  //   follow: true,
  // },
  // alternates: {
  //   canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_CONTACT_US}`,
  // },
};

function ProgramPage() {
  return (
    <>
      <PageHeader
        title={`Explore Programs`}
        description="You're making great progress in your learning journey. Keep up the momentum!"
      />

      <div className="p-4 grid">
        <section className="grid grid-cols-1 gap-5">
          {/* Filter */}
          <div className="">
            <ProgramFilter />
          </div>
          {/* Program Listing */}
          <div className="border-2 my-2 p-4">
            <ProgramListing />
          </div>
        </section>
      </div>
    </>
  );
}
export default ProgramPage;
