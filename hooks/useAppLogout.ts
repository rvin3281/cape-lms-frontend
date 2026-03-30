"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLogout } from "@/app/queries/useLogOut";
import { clearAuth } from "@/lib/redux/feature/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { toast } from "sonner";

export function useAppLogout() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const logoutQuery = useLogout();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isPending, startTransition] = useTransition();

  const logout = () => {
    if (isLoggingOut || logoutQuery.isPending || isPending) return;

    setIsLoggingOut(true);

    logoutQuery.mutate(undefined, {
      onSuccess: () => {
        dispatch(clearAuth());

        toast.success("Logged out successfully.");

        startTransition(() => {
          router.replace("/login");
        });
      },
      onError: () => {
        // Even if API fails, clear local auth state to avoid broken protected UI
        dispatch(clearAuth());

        toast.error(
          "We could not confirm logout from the server, but your local session has been cleared.",
        );

        startTransition(() => {
          router.replace("/login");
        });
      },
      onSettled: () => {
        setIsLoggingOut(false);
      },
    });
  };

  return {
    logout,
    isLoggingOut: isLoggingOut || logoutQuery.isPending || isPending,
  };
}
