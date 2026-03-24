"use client";

import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

export default function DashboardGuardLoading() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-white/60 backdrop-blur-md">
      <div className="flex flex-col items-center justify-center text-center px-5">
        {/* LOADER */}
        <div className="">
          {/* Mobile (<768px) */}
          <div className="block md:hidden">
            <FadeLoader color="#2563eb" aria-label="Loading" />
          </div>

          {/* Desktop (>=768px) */}
          <div className="hidden md:block">
            <FadeLoader color="#2563eb" aria-label="Loading" />
          </div>
        </div>

        {/* TEXT */}
        {/* <h2 className="font-semibold tracking-tight text-slate-900 text-[24px] lg:text-[30px]">
          Loading Dashboard
        </h2>

        <p className="mt-1 font-medium text-slate-600 text-[16px] lg:text-[20px]">
          Verifying your session…
        </p> */}
      </div>
    </div>
  );
}
