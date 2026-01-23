import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TOnBoardingProps = {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
};

const initialState: TOnBoardingProps = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
};

const authOnBoardingSlice = createSlice({
  name: "onBoarding",
  initialState,
  reducers: {
    setUserOnBoarding(state, action: PayloadAction<TOnBoardingProps>) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.company = action.payload.company;
    },
    clearUserOnBoarding(state) {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.company = "";
    },
  },
});

export const { setUserOnBoarding, clearUserOnBoarding } =
  authOnBoardingSlice.actions;

export default authOnBoardingSlice.reducer;
