"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";

type ButtonV1Props = {
  label: string;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof Button>;

function ButtonV1({
  label,
  href,
  leftIcon,
  rightIcon,
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonV1Props) {
  // ✅ Link-button using shadcn Button asChild
  if (href) {
    return (
      <Button asChild variant={variant} size={size} className={className}>
        <Link href={href} className="inline-flex items-center gap-2">
          {leftIcon}
          <span>{label}</span>
          {rightIcon}
        </Link>
      </Button>
    );
  }

  // ✅ Normal button
  return (
    <Button
      variant={variant}
      size={size}
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    >
      {leftIcon}
      <span>{label}</span>
      {rightIcon}
    </Button>
  );
}

export default ButtonV1;
