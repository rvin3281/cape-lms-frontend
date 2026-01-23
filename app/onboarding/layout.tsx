import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import OnBoardingGuard from "../(dashboard)/guard/OnBoardingGuard";

function OnBoardingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <OnBoardingGuard>
      <div className="min-h-screen bg-slate-50 flex justify-center px-4">
        <div className="w-full max-w-3xl my-10">
          {/* Header */}
          <OnboardingHeader />
          <div>{children}</div>
        </div>
      </div>
    </OnBoardingGuard>
  );
}
export default OnBoardingLayout;
