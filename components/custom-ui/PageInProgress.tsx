"use client";

import Image from "next/image";
import { AlertTriangle, Clock3, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

type AccentVariant = "amber" | "blue" | "purple" | "green" | "slate";

type PageInProgressProps = {
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  badgeText?: string;
  note?: string;
  variant?: AccentVariant;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

const accentStyles: Record<
  AccentVariant,
  {
    wrapper: string;
    badge: string;
    title: string;
    border: string;
    icon: string;
    panel: string;
  }
> = {
  amber: {
    wrapper: "bg-gradient-to-br from-amber-50 via-white to-orange-50",
    badge: "border-amber-200 bg-amber-100 text-amber-800",
    title: "text-amber-700",
    border: "border-amber-200/70",
    icon: "text-amber-600",
    panel: "bg-white/90",
  },
  blue: {
    wrapper: "bg-gradient-to-br from-blue-50 via-white to-cyan-50",
    badge: "border-blue-200 bg-blue-100 text-blue-800",
    title: "text-blue-700",
    border: "border-blue-200/70",
    icon: "text-blue-600",
    panel: "bg-white/90",
  },
  purple: {
    wrapper: "bg-gradient-to-br from-purple-50 via-white to-fuchsia-50",
    badge: "border-purple-200 bg-purple-100 text-purple-800",
    title: "text-purple-700",
    border: "border-purple-200/70",
    icon: "text-purple-600",
    panel: "bg-white/90",
  },
  green: {
    wrapper: "bg-gradient-to-br from-emerald-50 via-white to-green-50",
    badge: "border-emerald-200 bg-emerald-100 text-emerald-800",
    title: "text-emerald-700",
    border: "border-emerald-200/70",
    icon: "text-emerald-600",
    panel: "bg-white/90",
  },
  slate: {
    wrapper: "bg-gradient-to-br from-slate-50 via-white to-gray-100",
    badge: "border-slate-200 bg-slate-100 text-slate-800",
    title: "text-slate-700",
    border: "border-slate-200/70",
    icon: "text-slate-600",
    panel: "bg-white/90",
  },
};

export default function PageInProgress({
  title = "This page is under development",
  description = "We are currently building this feature and polishing the experience. Please check back again soon.",
  imageSrc = "/images/page-under-construction.png",
  imageAlt = "Page under construction illustration",
  badgeText = "In Progress",
  note = "Some modules, actions, and reporting widgets may still be in progress.",
  variant = "amber",
  className,
  imageClassName,
  priority = false,
}: PageInProgressProps) {
  const styles = accentStyles[variant];

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border shadow-sm mx-4",
        styles.wrapper,
        styles.border,
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.75),transparent_35%)]" />

      <div className="relative grid min-h-[540px] grid-cols-1 items-center gap-8 p-6 md:p-10 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="order-2 flex flex-col justify-center xl:order-1">
          <div
            className={cn(
              "mb-4 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide",
              styles.badge,
            )}
          >
            <AlertTriangle className={cn("h-4 w-4", styles.icon)} />
            {badgeText}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {title}
          </h2>

          <p className={cn("mt-3 text-base font-semibold", styles.title)}>
            We’re working on it.
          </p>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            {description}
          </p>

          <div
            className={cn(
              "mt-6 grid gap-3 rounded-2xl border p-4 md:grid-cols-2",
              styles.panel,
              styles.border,
            )}
          >
            <div className="flex items-start gap-3">
              <Clock3 className={cn("mt-0.5 h-5 w-5 shrink-0", styles.icon)} />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Work in progress
                </p>
                <p className="text-sm text-slate-600">
                  This section is still being finalized for release.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Wrench className={cn("mt-0.5 h-5 w-5 shrink-0", styles.icon)} />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Planned improvements
                </p>
                <p className="text-sm text-slate-600">{note}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 flex items-center justify-center xl:order-2">
          <div className="relative w-full max-w-2xl">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1400}
              height={1000}
              priority={priority}
              className={cn(
                "h-auto w-full rounded-2xl object-contain",
                imageClassName,
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
