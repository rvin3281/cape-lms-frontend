"use client";

import { useMe } from "@/app/queries/useMe";
import DashboardGuardLoading from "@/components/loading/DashboardGuardLoading";
import {
  clearAuth,
  setAuthLoading,
  setAuthUser,
} from "@/lib/redux/feature/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, isError, error } = useMe();
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const e = error as AxiosError;

  useEffect(() => {
    if (isLoading) {
      dispatch(setAuthLoading());
    }

    if (isError) {
      dispatch(clearAuth());

      if (e?.code === "ERR_NETWORK") {
        router.replace(`/try-again?next=${encodeURIComponent(pathname)}`);
        return;
      }

      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (data?.data?.user?.isFirstTimeLogin) {
      router.replace("/onboarding");
      return;
    }

    if (data?.data?.user) {
      dispatch(
        setAuthUser({
          id: data?.data?.user.id,
          name: data?.data?.user.name,
          email: data?.data?.user.email,
          roleName: data?.data?.user.roleName,
          roleId: data?.data?.user.roleId,
          role: data?.data?.user.role,
        }),
      );
    }
  }, [isLoading, isError, data, router, e?.code, pathname, dispatch]);

  if (isLoading) {
    return <DashboardGuardLoading />;
  }
  if (!data) return null;

  return <>{children}</>;
}
