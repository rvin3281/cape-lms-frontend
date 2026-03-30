"use client";

import FadeLoader from "react-spinners/FadeLoader";

type AppProcessingOverlayProps = {
  open: boolean;
  title?: string;
  description?: string;
};

export default function AppProcessingOverlay({
  open,
  title = "Signing you out",
  description = "Please wait while we secure your session...",
}: AppProcessingOverlayProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] grid place-items-center bg-white/70 backdrop-blur-md">
      <div className="flex flex-col items-center justify-center text-center px-6">
        <FadeLoader color="#2563eb" aria-label="Processing" />
        <h2 className="mt-6 text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}
