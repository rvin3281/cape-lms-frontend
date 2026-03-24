import DashboardAdminGuard from "@/components/guard/DashboardAdminGuard";
import AppSidebarAdmin from "@/components/layout/AppSidebarAdmin";
import DashboardGuardLoading from "@/components/loading/DashboardGuardLoading";
import Loader from "@/components/loading/Loader";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

async function DashboardLayoutAdmin({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  // const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  // await new Promise((res) => setTimeout(res, 3000));

  return (
    <>
      <DashboardAdminGuard>
        <SidebarProvider defaultOpen={true}>
          <div className="relative flex w-full">
            <Loader />
            {/* NAVBAR */}
            <AppSidebarAdmin />

            {/* MAIN-LAYOUT */}
            <main className="w-full min-h-screen ">
              <div className="w-full 2xl:max-w-[1400px] 2xl:mx-auto px-4s">
                {/* NAVBAR */}
                {/* <Navbar /> */}

                <div className="flex flex-col md:flex-row">
                  <div className="flex items-center gap-2 h-20 shrink-0 px-3  md:py-5 pt-5 pb-0">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                      orientation="vertical"
                      className="mr-2 data-[orientation=vertical]:h-4"
                    />
                  </div>
                  {/* MAIN CONTENT */}
                  <div className="h-full grow">{children}</div>
                </div>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </DashboardAdminGuard>
    </>
  );
}
export default DashboardLayoutAdmin;
