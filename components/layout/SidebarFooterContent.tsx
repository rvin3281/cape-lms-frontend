"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

function SidebarFooterContent() {
  const { toggleSidebar, open, state, openMobile } = useSidebar();

  // console.log(open);

  // console.log("state", state);

  // console.log("openMobile", openMobile);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={toggleSidebar}>
          {open && (
            <div className="flex justify-end w-full">
              <MdArrowBackIosNew size={20} />
            </div>
          )}
          {!open && (
            <div className="flex justify-end w-full">
              <MdArrowForwardIos size={20} />
            </div>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default SidebarFooterContent;
