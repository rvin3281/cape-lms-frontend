import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  roleName: string;
  roleId: string;
  role?: string;
};

type AuthState = {
  user: AuthUser | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  lastSynctedAt: number | null;
};

const initialState: AuthState = {
  user: null,
  status: "idle",
  lastSynctedAt: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading(state) {
      state.status = "loading";
    },
    setAuthUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.status = "authenticated";
      state.lastSynctedAt = Date.now();
    },
    clearAuth(state) {
      state.user = null;
      state.status = "unauthenticated";
      state.lastSynctedAt = Date.now();
    },
  },
});

export const { setAuthLoading, setAuthUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
