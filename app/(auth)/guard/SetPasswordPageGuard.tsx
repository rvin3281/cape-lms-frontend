"use client";

import { useValidateSetPasswordToken } from "@/app/queries/useValidateSetPasswordToken";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

function SetPasswordPageGuard({ children }: { children: React.ReactNode }) {
  const searchParam = useSearchParams();
  console.log(searchParam.get("email"));
  const email = searchParam.get("email");
  const token = searchParam.get("token");

  const mutation = useValidateSetPasswordToken();
  const router = useRouter();

  // 🧠 Memory that survives renders
  const hasValidatedRef = useRef(false);

  useEffect(() => {
    if (!token || !email) {
      router.replace("/first-login");
      return;
    }

    // Stop repeated execution
    if (hasValidatedRef.current) {
      console.log(hasValidatedRef.current);
    }
    hasValidatedRef.current = true;

    mutation.mutate(
      { token, email },
      {
        onSuccess: (data) => {
          //NOTE: USER NOTIFICATION MESSAGE
          // console.log("Token valid", data);
          // stay on page → allow user to set password
        },
        onError: (error: any) => {
          //NOTE: USER NOTIFICATION MESSAGE
          router.replace("/first-login");
        },
      }
    );
  }, [token, email, router]); // no mutation object

  return <div>{children}</div>;
}
export default SetPasswordPageGuard;
