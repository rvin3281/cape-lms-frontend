import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Card } from "../ui/card";

type KpiItem = {
  key: string;
  title: string;
  value: string | number;
  suffix?: string; // e.g. "days", "%"
  icon: LucideIcon;
  // progress between 0-100 (optional)
  progress?: number;
  // small helper text (optional)
  subtitle?: string;
  // theme color (tailwind classes)
  theme?: {
    ring: string; // top border or ring
    iconBg: string;
    iconFg: string;
    progressTrack: string;
    progressFill: string;
  };
};

const DEFAULT_THEME = {
  ring: "border-t-4 border-t-amber-400",
  iconBg: "bg-amber-400/20",
  iconFg: "text-amber-600",
  progressTrack: "bg-slate-200",
  progressFill: "bg-slate-900",
};

function ProgressBar({
  value,
  trackClass,
  fillClass,
}: {
  value: number;
  trackClass?: string;
  fillClass?: string;
}) {
  const safe = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("h-2 w-full rounded-full", trackClass)}>
      <div
        className={cn("h-2 rounded-full transition-all", fillClass)}
        style={{ width: `${safe}%` }}
      />
    </div>
  );
}

function KpiCard({ item }: { item: KpiItem }) {
  const theme = { ...DEFAULT_THEME, ...(item.theme ?? {}) };
  const Icon = item.icon;

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-white shadow-sm",
        "hover:shadow-md transition-shadow",
        theme.ring
      )}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500">{item.title}</p>

            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-semibold tracking-tight text-slate-900">
                {item.value}
              </p>
              {item.suffix ? (
                <span className="text-lg font-medium text-slate-600">
                  {item.suffix}
                </span>
              ) : null}
            </div>

            {item.subtitle ? (
              <p className="text-xs text-slate-500">{item.subtitle}</p>
            ) : null}
          </div>

          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm",
              theme.iconBg
            )}
          >
            <Icon className={cn("h-7 w-7", theme.iconFg)} />
          </div>
        </div>

        {typeof item.progress === "number" ? (
          <div className="mt-5 space-y-2">
            <ProgressBar
              value={item.progress}
              trackClass={theme.progressTrack}
              fillClass={theme.progressFill}
            />
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Progress</span>
              <span className="font-medium text-slate-700">
                {item.progress}%
              </span>
            </div>
          </div>
        ) : null}
      </div>

      {/* subtle background decoration */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-slate-100/70 blur-2xl" />
    </Card>
  );
}

export default KpiCard;
