"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDashboardHomeByRole } from "@/utils/get-dashboard-home";
import DashboardContentSkeleton from "./DashboardContentSkeleton";

type User = {
  roleCode: string;
  isFirstTimeLogin: boolean;
  authScope: string;
} | null;

export default function DashboardRedirectClient({ user }: { user: User }) {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login?next=/dashboard");
      return;
    }
    if (user.isFirstTimeLogin && user.authScope !== "admin") {
      router.replace("/onboarding");
      return;
    }
    router.replace(getDashboardHomeByRole(user.roleCode));
  }, [router, user]);

  return <DashboardContentSkeleton />;
}
