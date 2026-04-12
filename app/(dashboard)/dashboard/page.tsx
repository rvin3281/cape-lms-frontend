"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardContentSkeleton from "@/components/layout/DashboardContentSkeleton";
import { getDashboardHomeByRole } from "@/utils/get-dashboard-home";
import { useMe } from "@/app/queries/useMe";

export default function DashboardEntryPage() {
  const router = useRouter();
  const { data, isPending, isError } = useMe();

  const user = data?.data?.user ?? null;

  useEffect(() => {
    if (isPending) return;

    if (isError || !user) {
      router.replace("/login?next=/dashboard");
      return;
    }

    if (user.isFirstTimeLogin && user.authScope !== "admin") {
      router.replace("/onboarding");
      return;
    }

    router.replace(getDashboardHomeByRole(user.roleCode));
  }, [isPending, isError, user, router]);

  return <DashboardContentSkeleton />;
}
