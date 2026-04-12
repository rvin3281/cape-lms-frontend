import AppSidebar from "@/components/layout/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardGuard from "../../components/guard/DashboardGuard";

async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DashboardGuard>
      <SidebarProvider defaultOpen={true}>
        <div className="flex w-full">
          {/* NAVBAR */}
          <AppSidebar />

          {/* MAIN-LAYOUT */}
          <main className="w-full min-h-screen ">
            <div className="w-full 2xl:max-w-[1400px] 2xl:mx-auto px-4">
              {/* NAVBAR */}
              {/* <Navbar /> */}

              <div className="flex flex-col">
                <div className="flex items-center gap-2 h-10 shrink-0 px-3 pt-5">
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
    </DashboardGuard>
  );
}
export default DashboardLayout;
