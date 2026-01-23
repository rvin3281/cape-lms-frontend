"use client";

import { useGetOverallActiveCourse } from "@/app/queries/dashboard/useGetOverallActiveCourse";
import KpiCard from "@/components/card/KPICard";
import { selectAuthUser } from "@/lib/redux/feature/auth/authSelectors";
import { useAppSelector } from "@/lib/redux/hooks";
import { Award, BookOpen, Flame, LucideIcon, TrendingUp } from "lucide-react";

type KpiItem = {
  key: string;
  title: string;
  value: string | number;
  suffix?: string; // e.g. "days", "%"
  icon: LucideIcon;
  // progress between 0-100 (optional)
  progress?: number;
  // small helper text (optional)
  subtitle?: string;
  // theme color (tailwind classes)
  theme?: {
    ring: string; // top border or ring
    iconBg: string;
    iconFg: string;
    progressTrack: string;
    progressFill: string;
  };
};

function KPILayout() {
  const user = useAppSelector(selectAuthUser);

  console.log("email", user?.email, "enabled", !!user?.email);

  const { data: totalCourseData } = useGetOverallActiveCourse(user?.email);

  const totalCourseKpiData = totalCourseData?.data?.totalCourse;

  // Default 4 cards (Row 1)
  const data: KpiItem[] = [
    {
      key: "overall-progress",
      title: "Overall Progress",
      value: "47",
      suffix: "%",
      icon: TrendingUp,
      progress: 47,
      theme: {
        ring: "border-t-4 border-t-amber-400",
        iconBg: "bg-amber-400/25",
        iconFg: "text-amber-600",
        progressTrack: "bg-slate-200",
        progressFill: "bg-slate-900",
      },
    },
    {
      key: "active-courses",
      title: "Active Courses",
      value: totalCourseKpiData,
      icon: BookOpen,
      subtitle: "Currently enrolled",
      theme: {
        ring: "border-t-4 border-t-slate-900",
        iconBg: "bg-slate-900",
        iconFg: "text-white",
        progressTrack: "bg-slate-200",
        progressFill: "bg-slate-900",
      },
    },
    {
      key: "study-streak",
      title: "Study Streak",
      value: 7,
      suffix: "days",
      icon: Flame,
      subtitle: "Keep it going!",
      theme: {
        ring: "border-t-4 border-t-orange-500",
        iconBg: "bg-orange-500/15",
        iconFg: "text-orange-600",
        progressTrack: "bg-slate-200",
        progressFill: "bg-slate-900",
      },
    },
    {
      key: "achievements",
      title: "Achievements",
      value: "2 / 4",
      icon: Award,
      subtitle: "Milestones unlocked",
      theme: {
        ring: "border-t-4 border-t-yellow-500",
        iconBg: "bg-yellow-400/20",
        iconFg: "text-yellow-600",
        progressTrack: "bg-slate-200",
        progressFill: "bg-slate-900",
      },
    },
  ];

  return (
    <>
      {data.map((item) => (
        <KpiCard key={item.key} item={item} />
      ))}
      {/* <div className="border-dashed border-2 border-gray-400 bg-white p-4">
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
      </div> */}
    </>
  );
}
export default KPILayout;
