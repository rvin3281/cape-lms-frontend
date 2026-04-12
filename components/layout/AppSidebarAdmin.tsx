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
      url: "/admin/dashboard",
      icon: FaHome,
      isActive: false,
    },
    {
      title: "Facilitator",
      url: "#",
      icon: GiGraduateCap,
      isActive: false,
      items: [
        {
          title: "View All Facilitators",
          url: "/admin/facilitator",
        },
        {
          title: "New Facilitator",
          url: "/admin/facilitator/add-facilitator",
        },
      ],
    },
    {
      title: "CAPE Programs",
      url: "#",
      icon: GiGraduateCap,
      isActive: false,
      items: [
        {
          title: "Classroom Programs",
          url: "/admin/classroom-programs",
        },
        {
          title: "LearnWorlds Programs",
          url: "/admin/learnworlds-programs",
        },
        {
          title: "Create Classroom Program",
          url: "/admin/classroom-programs/create-classroom-program",
        },
      ],
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
      title: "Learners",
      url: "/admin/cape-learners",
      icon: MdInsights,
      isActive: false,
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
    <Sidebar collapsible="icon" className="w-64">
      {/* Sidebar Header */}
      <AppSidebarHeader title="CAPE Admin Dashboard" />

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
