"use client";

import { useValidateSetPasswordToken } from "@/app/queries/useValidateSetPasswordToken";
import LoginRedirection from "@/components/loading/LoginRedirection";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

function SetPasswordPageGuard({ children }: { children: React.ReactNode }) {
  const searchParam = useSearchParams();
  const router = useRouter();

  const email = useMemo(
    () => searchParam.get("email")?.trim() ?? "",
    [searchParam],
  );
  const token = useMemo(
    () => searchParam.get("token")?.trim() ?? "",
    [searchParam],
  );

  const hasRequiredParams = Boolean(email && token);

  const query = useValidateSetPasswordToken({
    email,
    token,
    enabled: hasRequiredParams,
  });

  useEffect(() => {
    if (!hasRequiredParams) {
      toast.error(
        "Your password setup link is incomplete. Please request a new one.",
      );
    }
  }, [hasRequiredParams]);

  useEffect(() => {
    if (!query.isError) return;

    // const resolved = resolveFormError(query.error);
    const message =
      "We could not verify your password setup link. Please request a new one.";

    toast.error(message);
  }, [query.isError, query.error]);

  if (!hasRequiredParams) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              Invalid setup link
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your password setup link is incomplete. Please request a new one.
            </p>

            <div className="pt-2">
              <Button
                className="w-full"
                onClick={() => router.replace("login")}
              >
                Back to First Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (query.isPending) {
    return <LoginRedirection title="Verifying your password setup link..." />;
  }

  if (query.isError) {
    // const resolved = resolveFormError(query.error);
    // const message =
    //   resolved.message ||
    //   "We could not verify your password setup link. Please request a new one.";

    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              Link verification failed
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We could not verify your password setup link. Please request a new
              one.
            </p>

            <div className="pt-2">
              <Button
                className="w-full"
                onClick={() => router.replace("/login")}
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (query.isSuccess) {
    return <>{children}</>;
  }

  return null;
}

export default SetPasswordPageGuard;
