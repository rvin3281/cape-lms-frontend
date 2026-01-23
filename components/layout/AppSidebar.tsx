"use client";
import { Award, BookOpen, Brain, UserRound, Users } from "lucide-react";
import { FaHome } from "react-icons/fa";
import { Sidebar, SidebarContent, SidebarFooter } from "../ui/sidebar";
import AppSidebarHeader from "./AppSidebarHeader";
import NavMain, { NavItem } from "./NavMain";
import NavUser from "./NavUser";
const data: { navMain: NavItem[] } = {
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: FaHome },

    {
      title: "Programs",
      icon: BookOpen,
      items: [
        { title: "My Programs", url: "/programs" },
        {
          title: "Recommended Programs",
          url: "/programs/recommended-programs",
        },
      ],
    },

    { title: "Skills", url: "/skills", icon: Brain },
    { title: "Community", url: "/community", icon: Users },
    { title: "Achievements", url: "/achievement", icon: Award },
    { title: "Profile", url: "/profile", icon: UserRound },
  ],
};

function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="w-64">
      {/* Sidebar Header */}
      <AppSidebarHeader />

      {/* Sidebar Content */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <NavUser />

        {/* <SidebarFooterContent /> */}
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
