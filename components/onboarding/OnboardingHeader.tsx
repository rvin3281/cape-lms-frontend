"use client";

import { selectOnBoardingUserData } from "@/lib/redux/feature/auth/authSelectors";
import { useAppSelector } from "@/lib/redux/hooks";

function OnboardingHeader() {
  const data = useAppSelector(selectOnBoardingUserData);

  return (
    <div className="mb-4">
      <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
        {`Welcome, ${data?.firstName} ${data?.lastName} `}
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        Please complete your profile to finish the onboarding process and
        continue to your dashboard.
      </p>
    </div>
  );
}
export default OnboardingHeader;
