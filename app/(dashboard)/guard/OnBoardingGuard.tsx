"use client";

import { useMe } from "@/app/queries/useMe";
import OnBoardingLoading from "@/components/loading/OnBoardingLoading";
import { setUserOnBoarding } from "@/lib/redux/feature/auth/authOnBoardingSlice";
import { clearAuth, setAuthLoading } from "@/lib/redux/feature/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OnBoardingGuard({
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

    const user = data?.data?.user;
    if (!user) return;

    // ✅ allow onboarding ONLY when first time login
    if (!user.isFirstTimeLogin) {
      router.replace("/dashboard");
      return;
    }

    dispatch(
      setUserOnBoarding({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: user.company,
      }),
    );
  }, [isLoading, isError, data, router, e?.code, pathname, dispatch]);

  if (isLoading) {
    return <OnBoardingLoading />;
  }
  if (!data) return null;

  return <>{children}</>;
}
