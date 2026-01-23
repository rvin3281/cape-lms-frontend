"use client";

import { useSearchParams } from "next/navigation";

function LoginQueryParamValidation({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParam = useSearchParams();

  const email = searchParam.get("email");
  const isUserValidated = searchParam.get("user");

  return <>{children}</>;
}
export default LoginQueryParamValidation;
