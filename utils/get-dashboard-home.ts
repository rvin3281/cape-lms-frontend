// lib/auth/get-dashboard-home.ts
export type LearnerRoleCode =
  | "INDIVIDUAL_LEARNER"
  | "HYBRID_LEARNER"
  | "CLASSROOM_LEARNER";

export function getDashboardHomeByRole(roleCode?: string) {
  switch (roleCode) {
    case "INDIVIDUAL_LEARNER":
      return "/dashboard/individual";
    case "HYBRID_LEARNER":
      return "/dashboard/hybrid";
    case "CLASSROOM_LEARNER":
      return "/dashboard/classroom";
    default:
      return "/login";
  }
}
