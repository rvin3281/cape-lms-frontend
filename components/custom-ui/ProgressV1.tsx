"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type ProgressV1Props = {
  value: number; // 0 - 100
  className?: string;
};

function clamp(n: number) {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

function ProgressV1({ value, className }: ProgressV1Props) {
  return <Progress value={clamp(value)} className={cn("h-2", className)} />;
}

export default ProgressV1;
