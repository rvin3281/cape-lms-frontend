"use client";

import LoginFormContainer from "@/components/auth/LoginFormContainer";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LoginComponent from "./LoginComponent";
import LoginComponentAdmin from "./LoginComponentAdmin";
import LoginHeader from "./LoginHeader";

type PostSetPasswordRole = "hybrid" | "classroom";

type PostSetPasswordPayload = {
  email?: string;
  role?: PostSetPasswordRole;
  at?: number;
};

function isValidPostSetPasswordRole(
  value: unknown,
): value is PostSetPasswordRole {
  return value === "hybrid" || value === "classroom";
}

// const POST_SET_PASSWORD_CONTENT: Record<
//   PostSetPasswordRole,
//   {
//     title: string;
//     description: string;
//   }
// > = {
//   hybrid: {
//     title: "Password created successfully",
//     description:
//       "Your hybrid learner account is ready. Please sign in using your verified email and password.",
//   },
//   classroom: {
//     title: "Password created successfully",
//     description:
//       "Your classroom learner account is ready. Please sign in using your verified classroom email and password.",
//   },
// };

function LoginMultiRoleUi() {
  const [lockToLearner, setLockToLearner] = useState(false);
  const [validatedEmail, setValidatedEmail] = useState("");
  const [postSetPasswordRole, setPostSetPasswordRole] =
    useState<PostSetPasswordRole | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("post_set_password");
    if (!raw) return;

    try {
      const payload = JSON.parse(raw) as PostSetPasswordPayload;

      const isFresh =
        typeof payload.at === "number" &&
        Date.now() - payload.at < 5 * 60 * 1000;

      if (!isFresh) return;

      if (payload.email) {
        setValidatedEmail(payload.email.trim());
      }

      if (isValidPostSetPasswordRole(payload.role)) {
        setPostSetPasswordRole(payload.role);
        setLockToLearner(true);
      }
    } catch {
      // do nothing
    } finally {
      sessionStorage.removeItem("post_set_password");
    }
  }, []);

  return (
    <LoginFormContainer>
      <div className="mb-2">
        <div className="flex flex-col gap-5">
          <LoginHeader
            title="Sign in"
            description="Select your role and sign in to continue."
          />

          <Tabs defaultValue="learner">
            <TabsList className="w-full mb-4 rounded-full py-1 px-2">
              <TabsTrigger value="learner">Learner</TabsTrigger>
              <TabsTrigger value="admin" disabled={lockToLearner}>
                Admin
              </TabsTrigger>
            </TabsList>

            <TabsContent value="learner">
              <LoginComponent
                prefillEmail={validatedEmail}
                showValidatedBanner={!!postSetPasswordRole}
                postSetPasswordRole={postSetPasswordRole}
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
