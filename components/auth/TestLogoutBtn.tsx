"use client";

import { useLogout } from "@/app/queries/useLogOut";
import { Button } from "../ui/button";

function TestLogoutBtn() {
  const logOutQuery = useLogout();

  const logout = () => {
    logOutQuery.mutate();
  };

  return <Button onClick={logout}>Log out</Button>;
}
export default TestLogoutBtn;
