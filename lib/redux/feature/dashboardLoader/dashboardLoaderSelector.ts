import { RootState } from "../../store";

export const selectDashboardLoader = (state: RootState) =>
  state?.dashboardLoader?.loading;
