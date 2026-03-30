import { NavItem } from "@/components/layout/NavMain";
import { LearnerRoleCode } from "@/lib/constant/learner-role-code.constant";
import { Award, BookOpen, Brain, UserRound } from "lucide-react";
import { FaHome } from "react-icons/fa";

export const LEARNER_SIDEBAR_CONFIG_BY_ROLE: Record<
  LearnerRoleCode,
  NavItem[]
> = {
  INDIVIDUAL_LEARNER: [],
  CLASSROOM_LEARNER: [
    { title: "Dashboard", url: "/dashboard", icon: FaHome },
    { title: "My Programs", url: "/programs", icon: BookOpen },
    { title: "Achievements", url: "/achievement", icon: Award },
    { title: "Profile", url: "/profile", icon: UserRound },
  ],

  HYBRID_LEARNER: [
    { title: "Dashboard", url: "/dashboard", icon: FaHome },
    { title: "Skills", url: "/skills", icon: Brain },
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
    { title: "Achievements", url: "/achievement", icon: Award },
    { title: "Profile", url: "/profile", icon: UserRound },
  ],
};
