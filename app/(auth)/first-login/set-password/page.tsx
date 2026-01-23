import LoginFormContainer from "@/components/auth/LoginFormContainer";
import LoginHeader from "@/components/auth/LoginHeader";
import SetPasswordComponent from "@/components/auth/SetPasswordComponent";
import SetPasswordPageGuard from "../../guard/SetPasswordPageGuard";

function SetPasswordPage() {
  return (
    <SetPasswordPageGuard>
      <LoginFormContainer>
        {/* Sign In Title + Toggle */}
        <div className="mb-2">
          <div className="flex flex-col gap-5">
            <LoginHeader
              title="Create your password"
              description="Set a new password to secure your account."
            />
          </div>
          <SetPasswordComponent />
        </div>
      </LoginFormContainer>
    </SetPasswordPageGuard>
  );
}
export default SetPasswordPage;
