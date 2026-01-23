import PageHeader from "@/components/layout/PageHeader";

async function DashboardAdminPage() {
  return (
    <>
      <PageHeader
        title="Cape Admin Dashboard"
        description="Platform overview and management center"
      />
      <div className="grid gap-4 p-4">
        {/* Row 1: KPI Cards */}
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

        {/* Row 2: Charts (fixed height recommended) */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="h-[320px] border-dashed border-2 border-gray-400 bg-white p-4">
            <div className="flex items-center justify-center h-full">
              <h2 className="text-sm font-semibold text-slate-900">Chart A</h2>
            </div>
          </div>
          <div className="h-[320px] border-dashed border-2 border-gray-400 bg-white p-4">
            <div className="flex items-center justify-center h-full">
              <h2 className="text-sm font-semibold text-slate-900">Chart B</h2>
            </div>
          </div>
        </section>

        {/* Row 3: Table + Activity (table scroll inside) */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Table - bigger span */}
          <div className="lg:col-span-2 border-dashed border-2 border-gray-400 bg-white">
            <div className="border-b p-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Latest Top 5 Cohort Summary
              </h2>
            </div>

            {/* internal scroll area */}
            <div className="max-h-[420px] overflow-auto p-4">Table here...</div>
          </div>

          {/* Activity */}
          <div className="border-dashed border-2 border-gray-400 bg-white p-4">
            Activity
          </div>
        </section>
      </div>
    </>
  );
}
export default DashboardAdminPage;
