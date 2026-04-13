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
    {
      title: "Classroom Programs",
      icon: BookOpen,
      items: [{ title: "My Classroom Sessions", url: "/classroom-program" }],
    },
    { title: "Achievements", url: "/achievements", icon: Award },
    { title: "Profile", url: "/profile", icon: UserRound },
  ],

  HYBRID_LEARNER: [
    { title: "Dashboard", url: "/dashboard", icon: FaHome },
    { title: "Skills", url: "/skills", icon: Brain },
    {
      title: "Hybrid Programs",
      icon: BookOpen,
      items: [
        { title: "My Learning", url: "/hybrid-program" },
        {
          title: "Recommended Programs",
          url: "/hybrid-program/recommended-programs",
        },
      ],
    },
    { title: "Achievements", url: "/achievements", icon: Award },
    { title: "Profile", url: "/profile", icon: UserRound },
  ],
};
