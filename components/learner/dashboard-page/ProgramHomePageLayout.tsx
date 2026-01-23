import ContinueLearningCard from "@/components/card/ContinueLearningCard";

function ProgramHomePageLayout() {
  return (
    // <div className="h-[500px] border-dashed border-2 border-gray-400 bg-white p-4 lg:col-span-2">
    //   <div className="flex items-center justify-center h-full">
    //     <h2 className="text-sm font-semibold text-slate-900">Chart A</h2>
    //   </div>
    // </div>
    <div className="bg-white rounded-2xl border border-slate-20 shadow-sm overflow-hidden lg:col-span-2 h-[500px]">
      {/* LEFT ACCENT BAR */}
      <div className="flex h-full">
        <div className="w-1 bg-amber-500" />

        {/* CONTENT */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col">
          {/* HEADER */}
          <div className="flex items-start gap-3 shrink-0">
            {/* ICON PLACEHOLDER - Add Icon later */}
            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-sm">▶</span>
            </div>

            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Continue Learning
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Pick up where you left off in your learning journey.
              </p>
            </div>
          </div>

          {/* CARDS PLACEHOLDER */}
          <div className="mt-5 flex-1 min-h-0 overflow-y-auto flex flex-col gap-4 p-2">
            <ContinueLearningCard />
            <ContinueLearningCard />
            <ContinueLearningCard />
            <ContinueLearningCard />
            <ContinueLearningCard />
            <ContinueLearningCard />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProgramHomePageLayout;
