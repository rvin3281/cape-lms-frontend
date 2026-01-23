"use client";
import { FaHome } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { MdInsights } from "react-icons/md";
import { Sidebar, SidebarContent, SidebarFooter } from "../ui/sidebar";
import AppSidebarHeader from "./AppSidebarHeader";
import NavMain from "./NavMain";
import NavUser from "./NavUser";
const data = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: FaHome,
      isActive: false,
    },
    {
      title: "Courses",
      url: "#",
      icon: GiGraduateCap,
      isActive: false,
      items: [
        {
          title: "View All Courses",
          url: "/cohort",
        },
      ],
    },
    {
      title: "Insights",
      url: "#",
      icon: MdInsights,
      isActive: false,
      items: [
        {
          title: "Cohort",
          url: "/dashboard/insights/cohort",
        },
      ],
    },
  ],
};

function AppSidebarAdmin() {
  return (
    <Sidebar collapsible="icon">
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

export default AppSidebarAdmin;
