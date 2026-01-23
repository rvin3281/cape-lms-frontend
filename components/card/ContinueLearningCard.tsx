import { BookOpen, Clock, Play } from "lucide-react";
import ButtonV1 from "../custom-ui/ButtonV1";
import ProgressV1 from "../custom-ui/ProgressV1";
import { Card, CardContent } from "../ui/card";

function ContinueLearningCard() {
  return (
    <Card
      className="group
    rounded-2xl
    border border-slate-200
    bg-white
    shadow-sm
    transition-all duration-300 ease-out
    hover:-translate-y-0.5
    hover:border-amber-300
    hover:bg-amber-50/40

    focus-within:ring-2
    focus-within:ring-amber-200
    py-4 sm:py-6"
    >
      <CardContent className="p-4 sm:p-5">
        {/* Top Row: Title & Button */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 mb-3 sm:mb-0">
            <h4 className="text-base font-semibold text-slate-900 leading-snug line-clamp-2 transition-colors group-hover:text-slate-950">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
              provident.
            </h4>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-slate-400" />
                2/11
              </span>

              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />2 Hours Ago
              </span>
            </div>
          </div>

          {/* Right button */}
          <div className="sm:shrink-0">
            <ButtonV1
              label="Continue"
              href="#"
              size="lg"
              variant="default"
              leftIcon={<Play className="h-4 w-4" />}
              className="w-full sm:w-auto rounded-xl px-6 sm:px-10 shadow-sm"
            />
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 pt-4 border-t border-slate-100 group-hover:border-amber-200 transition-colors">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600 group-hover:text-slate-700 transition-colors">
              Progress
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {Math.round(10)}%
            </p>
          </div>

          <div className="mt-2">
            <ProgressV1 value={10} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default ContinueLearningCard;
