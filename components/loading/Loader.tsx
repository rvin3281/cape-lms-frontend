"use client";

import { selectDashboardLoader } from "@/lib/redux/feature/dashboardLoader/dashboardLoaderSelector";
import { useAppSelector } from "@/lib/redux/hooks";
import { Bars } from "react-loader-spinner";

function Loader() {
  const isLoading = useAppSelector(selectDashboardLoader);

  if (isLoading) {
    return (
      <div className="absolute inset-0 z-[999999] flex justify-center items-center backdrop-blur-sm">
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return null;
}
export default Loader;
