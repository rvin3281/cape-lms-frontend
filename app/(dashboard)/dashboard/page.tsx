/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDashboardHomeByRole } from "@/utils/get-dashboard-home";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import DashboardRedirectClient from "@/components/layout/DashboardRedirectClient";

async function getMeOnServer(): Promise<any | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (res.status === 401) return null;

    if (!res.ok) {
      throw new Error(`Failed to fetch /auth/me: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Dashboard getMeOnServer error:", error);
    throw error;
  }
}

export default async function DashboardEntryPage() {
  const me = await getMeOnServer();
  const user = me?.data?.user ?? null;

  return <DashboardRedirectClient user={user} />;
}
