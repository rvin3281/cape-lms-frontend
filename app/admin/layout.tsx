import AppSidebarAdmin from "@/components/layout/AppSidebarAdmin";
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
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full">
        {/* NAVBAR */}
        <AppSidebarAdmin />

        {/* MAIN-LAYOUT */}
        <main className="w-full min-h-screen ">
          <div className="w-full 2xl:max-w-[1400px] 2xl:mx-auto px-4s">
            {/* NAVBAR */}
            {/* <Navbar /> */}

            <div className="flex">
              <div className="flex items-center gap-2 h-20 shrink-0 px-3 py-5">
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
  );
}
export default DashboardLayoutAdmin;
