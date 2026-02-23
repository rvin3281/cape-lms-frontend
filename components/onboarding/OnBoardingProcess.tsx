/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import OnBoardingAccount from "./OnBoardingAccount";

function OnBoardingProcess() {
  const [progress, setProgress] = useState(0);

  const nextBtnClick = () => {
    setProgress(50);
  };

  return (
    <>
      <div className="mb-6 flex flex-col">
        {/* <span className="text-sm font-bold mb-2">Step 1 / 2</span>
        <Progress value={progress} /> */}
      </div>
      <div className="bg-white shadow-sm border border-slate-200 p-6">
        <OnBoardingAccount nextBtnClick={nextBtnClick} />
        {/* <OnBoardingCareerGoals /> */}
      </div>
    </>
  );
}
export default OnBoardingProcess;
