import { configureStore } from "@reduxjs/toolkit";
import onBoardingReducer from "./feature/auth/authOnBoardingSlice";
import authReducer from "./feature/auth/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      onBoarding: onBoardingReducer,
      // ui: uiReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
