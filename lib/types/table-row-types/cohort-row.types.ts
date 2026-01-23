export type CohortRow = {
  id: string;
  title: string;
  description?: string | null;
  access: "private" | "public";
  createdAt: number;
  totalCourse: number;
};
