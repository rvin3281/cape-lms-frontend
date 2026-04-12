export type ClassroomProgramFacilitatorDto = {
  facilitatorId: string;
  facilitatorName: string;
};

export type ClassroomProgramUserDto = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
};

export type ClassroomProgramDto = {
  enrollmentId: string;
  status: string;
  isReviewFeedbackCompleted: boolean;
  user: ClassroomProgramUserDto;
  program: {
    programId: string;
    programName: string;
    programDate: string;
    programCohort: string;
  };
  facilitators: ClassroomProgramFacilitatorDto[];
};

export type GetAllClassroomProgramByUserResponseDto = {
  success: boolean;
  code: string;
  message: string;
  timestamp: string;
  path: string;
  data: ClassroomProgramDto[];
};
