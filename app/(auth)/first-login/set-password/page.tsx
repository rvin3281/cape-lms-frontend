import { Suspense } from "react";
import SetPasswordClient from "./SetPasswordClient";

function SetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <SetPasswordClient />
    </Suspense>
  );
}
export default SetPasswordPage;
