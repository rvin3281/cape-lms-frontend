import { Suspense } from "react";
import SetPasswordClient from "./SetPasswordClient";

export const metadata = {
  title: "Set Password | CAPE-LMS",
  description:
    "Set your password securely to activate your CAPE-LMS account and access your learning portal.",
};

function SetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <SetPasswordClient />
    </Suspense>
  );
}
export default SetPasswordPage;
