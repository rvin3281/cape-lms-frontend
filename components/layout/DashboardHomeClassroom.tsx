"use client";
import PageHeader from "@/components/layout/PageHeader";
import { selectAuthUser } from "@/lib/redux/feature/auth/authSelectors";
import { useAppSelector } from "@/lib/redux/hooks";
import { formatUserName } from "@/utils/formatUserName";
import PageUnderDevelopment from "../custom-ui/PageUnderDevelopment";

function DashboardHomeClassroom() {
  const user = useAppSelector(selectAuthUser);

  return (
    <>
      <PageHeader
        title={`Welcome back, ${formatUserName(user?.name)}!`}
        description="You're making great progress in your learning journey. Keep up the momentum!"
      />

      <PageUnderDevelopment
        title="Classroom Learner dashboard is under development"
        description="This dashboard is currently being developed to provide a clearer overview of your learning activity, progress, and important updates in one place."
        badgeText="Dashboard In Progress"
        note="Learning summaries, program highlights, recent activity, and other learner-focused insights will be available here once development is completed."
        variant="blue"
        imageSrc="/images/page-under-construction.png"
        imageAlt="Learner dashboard under development"
      >
        <div className="grid gap-4 p-4">
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* <KPILayout /> */}
          </section>

          <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* <ProgramHomePageLayout /> */}
            {/* <RecentAchievementLayout /> */}
          </section>

          <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 border-dashed border-2 border-gray-400 bg-white">
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
export default DashboardHomeClassroom;
