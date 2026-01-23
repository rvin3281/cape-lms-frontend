"use client";
import PageHeader from "@/components/layout/PageHeader";
import KPILayout from "@/components/learner/dashboard-page/KPILayout";
import ProgramHomePageLayout from "@/components/learner/dashboard-page/ProgramHomePageLayout";
import RecentAchievementLayout from "@/components/learner/dashboard-page/RecentAchievementLayout";
import { selectAuthUser } from "@/lib/redux/feature/auth/authSelectors";
import { useAppSelector } from "@/lib/redux/hooks";
import { formatUserName } from "@/utils/formatUserName";

function DashboardPage() {
  const user = useAppSelector(selectAuthUser);

  console.log("DashboardPage user:", user);

  return (
    <>
      <PageHeader
        title={`Welcome back, ${formatUserName(user?.name)}!`}
        description="You're making great progress in your learning journey. Keep up the momentum!"
      />
      <div className="grid gap-4 p-4">
        {/* Row 1: KPI Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KPILayout />
        </section>

        {/* Row 2: Charts (fixed height recommended) */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* List Of Programs */}
          <ProgramHomePageLayout />

          {/* Recent Achievement */}
          <RecentAchievementLayout />
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
export default DashboardPage;
