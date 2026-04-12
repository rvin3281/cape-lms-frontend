import { createSlice } from "@reduxjs/toolkit";

export type DashboardLoader = {
  loading: boolean;
};

const initialState: DashboardLoader = {
  loading: false,
};

const dasboardLoaderSlice = createSlice({
  name: "dashboard-loader",
  initialState,
  reducers: {
    setDashboardLoading(state) {
      state.loading = true;
    },
    clearDashboardLoading(state) {
      state.loading = false;
    },
  },
});

export const { setDashboardLoading, clearDashboardLoading } =
  dasboardLoaderSlice.actions;
export default dasboardLoaderSlice.reducer;
