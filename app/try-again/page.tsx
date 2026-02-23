import TryAgain from "@/components/try-again/TryAgain";
import { Suspense } from "react";

function page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <TryAgain />
    </Suspense>
  );
}

export default page;
