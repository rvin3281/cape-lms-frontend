"use client";

import { useMe } from "@/app/queries/useMe";
import DashboardGuardLoading from "@/components/loading/DashboardGuardLoading";
import { clearAuth, setAuthUser } from "@/lib/redux/feature/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardAdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, isError, error } = useMe();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);

  const e = error as AxiosError;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading) {
      timer = setTimeout(() => {
        setShowLoader(true);
      }, 200);
    } else {
      setShowLoader(false);
    }

    return () => clearTimeout(timer);
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      dispatch(clearAuth());

      if (e?.code === "ERR_NETWORK") {
        router.replace(`/try-again?next=${encodeURIComponent(pathname)}`);
        return;
      }

      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (
      data?.data?.user?.isFirstTimeLogin &&
      data?.data?.user.authScope !== "admin"
    ) {
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
          roleCode: data?.data?.user.roleCode,
          authScope: data?.data?.user.authScope,
          role: data?.data?.user.role,
        }),
      );
    }
  }, [isLoading, isError, data, router, e?.code, pathname, dispatch]);

  if (isLoading && showLoader) {
    return <DashboardGuardLoading />;
  }

  if (isLoading) {
    return null;
  }

  if (!data?.data?.user) {
    return null;
  }

  return <>{children}</>;
}
