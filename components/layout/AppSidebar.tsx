"use client";
import { Sidebar, SidebarContent, SidebarFooter } from "../ui/sidebar";
import AppSidebarHeader from "./AppSidebarHeader";
import NavMain from "./NavMain";
import NavUser from "./NavUser";
import { useMe } from "@/app/queries/useMe";
import { LEARNER_SIDEBAR_CONFIG_BY_ROLE } from "@/utils/learner-sidebar-config";
import { LEARNER_ROLE_CODE } from "@/lib/constant/learner-role-code.constant";
// const data: { navMain: NavItem[] } = {
//   navMain: [
//     { title: "Dashboard", url: "/dashboard", icon: FaHome },

//     { title: "Skills", url: "/skills", icon: Brain },
//     {
//       title: "Programs",
//       icon: BookOpen,
//       items: [
//         { title: "My Programs", url: "/programs" },
//         {
//           title: "Recommended Programs",
//           url: "/programs/recommended-programs",
//         },
//       ],
//     },
//     // { title: "Community", url: "/community", icon: Users },
//     { title: "Achievements", url: "/achievement", icon: Award },
//     { title: "Profile", url: "/profile", icon: UserRound },
//   ],
// };

function AppSidebar() {
  const { data } = useMe();

  const user = data?.data?.user;
  const roleCode = user?.roleCode;

  const navItems =
    roleCode && roleCode in LEARNER_SIDEBAR_CONFIG_BY_ROLE
      ? LEARNER_SIDEBAR_CONFIG_BY_ROLE[
          roleCode as keyof typeof LEARNER_SIDEBAR_CONFIG_BY_ROLE
        ]
      : LEARNER_SIDEBAR_CONFIG_BY_ROLE[LEARNER_ROLE_CODE.CLASSROOM_LEARNER];

  return (
    <Sidebar collapsible="icon" className="w-64">
      {/* Sidebar Header */}
      <AppSidebarHeader title="CAPE Learning Hub" />

      {/* Sidebar Content */}
      <SidebarContent>
        <NavMain items={navItems} />
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
