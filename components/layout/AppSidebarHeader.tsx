"use client";
/* eslint-disable @next/next/no-img-element */

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";

function AppSidebarHeader({ title }: { title: string }) {
  const { open } = useSidebar();

  return (
    <SidebarHeader className="mb-3">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="group-data-[collapsible=icon]:size-12! data-[slot=sidebar-menu-button]:p-1.5!"
          >
            <a
              className={`h-15 ${!open && "justify-center"} transition-all`}
              href="#"
            >
              <img
                src="/images/cape-logo/Oval UTP.png"
                alt="CAPE Dashboard"
                className=" shrink-0 h-13 w-13"
              />
              <span className="text-base font-semibold">{title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

export default AppSidebarHeader;
