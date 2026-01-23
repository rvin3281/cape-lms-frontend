export interface GetUserProgramsResponse {
  total: number;
  programs: UserProgramItem[];
}

export interface UserProgramItem {
  enrollment: EnrollmentInfo;
  program: ProgramInfo;
}

export interface EnrollmentInfo {
  id: number;
  enrolledAt: string; // ISO date string
  status: "active" | "inactive" | "completed" | string;
  progress: number;
}

export interface ProgramInfo {
  productId: string;
  title: string;
  type: "learning_program" | string;
  currency: string | null;
  description: string;
  price: number | null;
  url: string | null;
}
