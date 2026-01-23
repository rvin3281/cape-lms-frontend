import { RootState } from "../../store";
import { TOnBoardingProps } from "./authOnBoardingSlice";

export const selectAuthUser = (state: RootState) => state?.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectIsAuthed = (state: RootState) =>
  state.auth.status === "authenticated";

export const selectOnBoardingUserData = (state: RootState): TOnBoardingProps =>
  state.onBoarding;
