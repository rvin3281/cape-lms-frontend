"use client";

import LoginFormContainer from "@/components/auth/LoginFormContainer";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LoginComponent from "./LoginComponent";
import LoginComponentAdmin from "./LoginComponentAdmin";
import LoginHeader from "./LoginHeader";

type PostSetPasswordPayload = { email?: string; at?: number };

function LoginMultiRoleUi() {
  const [lockedToEnterpriseLearner, setLockedToEnterpriseLearner] =
    useState(false);
  const [validatedEmail, setValidatedEmail] = useState<string>("");

  useEffect(() => {
    const raw = sessionStorage.getItem("post_set_password");
    if (!raw) return;

    try {
      const payload = JSON.parse(raw) as PostSetPasswordPayload;

      // expire in 5 minutes (avoid stale UI)
      const isFresh =
        typeof payload.at === "number" &&
        Date.now() - payload.at < 5 * 60 * 1000;

      // const isFresh = true;

      if (isFresh) {
        setLockedToEnterpriseLearner(true);
        setValidatedEmail(payload.email?.trim() || "");
      }
    } finally {
      // one-time UX
      sessionStorage.removeItem("post_set_password");
    }
  }, []);

  return (
    <LoginFormContainer>
      {/* Sign In Title + Toggle */}
      <div className="mb-2">
        <div className="flex flex-col gap-5">
          <LoginHeader
            title="Sign in"
            description="Select your role and sign in to continue."
          />

          <Tabs defaultValue="learner">
            <TabsList className="w-full mb-4 rounded-full py-1 px-2">
              <TabsTrigger value="learner">Learner</TabsTrigger>
              <TabsTrigger value="admin" disabled={lockedToEnterpriseLearner}>
                Admin
              </TabsTrigger>
            </TabsList>
            <TabsContent value="learner">
              <LoginComponent
                lockEnterpriseLearner={lockedToEnterpriseLearner}
                prefillEmail={validatedEmail}
                showValidatedBanner={lockedToEnterpriseLearner}
              />
            </TabsContent>
            <TabsContent value="admin">
              <LoginComponentAdmin />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </LoginFormContainer>
  );
}
export default LoginMultiRoleUi;
