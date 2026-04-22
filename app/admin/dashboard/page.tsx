import PageUnderDevelopment from "@/components/custom-ui/PageUnderDevelopment";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Cape Admin Dashboard | CAPE-LMS",
  description:
    "Access the CAPE-LMS admin dashboard to monitor platform activity, track key metrics, and manage learners, programs, and cohorts.",
};

async function DashboardAdminPage() {
  return (
    <>
      <PageHeader
        title="Cape Admin Dashboard"
        description="Platform overview and management center"
      />

      <PageUnderDevelopment
        title="Cape Admin Dashboard is under development"
        description="The dashboard modules, analytics cards, charts, and summary widgets are currently being developed and refined for the CAPE Admin experience."
        badgeText="Dashboard In Progress"
        note="KPI cards, charts, cohort summaries, and activity widgets will be available once development is completed."
        variant="blue"
        imageSrc="/images/page-under-construction.png"
        imageAlt="Dashboard under development"
      >
        <div className="grid gap-4 p-4">
          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="border-dashed border-2 border-gray-400 bg-white p-4">
              <div className="flex items-center justify-center">
                <h2 className="text-sm font-semibold text-slate-900">
                  KPI 1 (Total Active Learners)
                </h2>
              </div>
            </div>
            <div className="border-dashed border-2 border-gray-400 bg-white p-4">
              <div className="flex items-center justify-center">
                <h2 className="text-sm font-semibold text-slate-900">
                  KPI 2 (Total Active Course)
                </h2>
              </div>
            </div>
            <div className="border-dashed border-2 border-gray-400 bg-white p-4">
              <div className="flex items-center justify-center">
                <h2 className="text-sm font-semibold text-slate-900">
                  KPI 3 (Total Running Cohort)
                </h2>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="h-[320px] border-dashed border-2 border-gray-400 bg-white p-4">
              <div className="flex h-full items-center justify-center">
                <h2 className="text-sm font-semibold text-slate-900">
                  Chart A
                </h2>
              </div>
            </div>
            <div className="h-[320px] border-dashed border-2 border-gray-400 bg-white p-4">
              <div className="flex h-full items-center justify-center">
                <h2 className="text-sm font-semibold text-slate-900">
                  Chart B
                </h2>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="border-dashed border-2 border-gray-400 bg-white lg:col-span-2">
              <div className="border-b p-4">
                <h2 className="text-sm font-semibold text-slate-900">
                  Latest Top 5 Cohort Summary
                </h2>
              </div>
              <div className="max-h-[420px] overflow-auto p-4">
                Table here...
              </div>
            </div>

            <div className="border-dashed border-2 border-gray-400 bg-white p-4">
              Activity
            </div>
          </section>
        </div>
      </PageUnderDevelopment>
    </>
  );
}
export default DashboardAdminPage;
