import FirstTimeLoginComponent from "@/components/auth/FirstTimeLoginComponent";
import LoginHeader from "@/components/auth/LoginHeader";
import { Suspense } from "react";
import LoginFormContainer from "../../../components/auth/LoginFormContainer";

function FirstLoginPage() {
  return (
    <LoginFormContainer>
      {/* Sign In Title + Toggle */}
      <div className="mb-2">
        <div className="flex flex-col gap-5">
          <LoginHeader
            title="Verify your email"
            description="Enter your registered email to begin first-time setup."
          />
        </div>
        <Suspense fallback={<div className="mt-4">Loading...</div>}>
          <FirstTimeLoginComponent />
        </Suspense>
      </div>
    </LoginFormContainer>
  );
}
export default FirstLoginPage;
