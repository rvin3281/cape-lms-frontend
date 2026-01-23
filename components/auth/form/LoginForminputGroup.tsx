"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import type { ControllerRenderProps } from "react-hook-form";

export interface ILoginFormInputGroup {
  id: string;
  /**
   * Use "password" to enable the eye toggle.
   * For other types ("text", "email", etc.), it behaves like a normal input.
   */
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  ariaInvalid?: boolean;
  className?: string;
  field?: ControllerRenderProps<any, any>;
  /**
   * Optional right-side element. If provided, it overrides the default eye toggle UI.
   * Example: <Icon />, <Button />, etc.
   */
  rightSlot?: React.ReactNode;
  /**
   * Disable password toggle even if type="password"
   */
  disablePasswordToggle?: boolean;
  /**
   * Accessible labels for the toggle
   */
  showLabel?: string;
  hideLabel?: string;
}

function LoginFormInputGroup({
  id,
  type,
  placeholder,
  autoComplete,
  ariaInvalid,
  className,
  field,
  rightSlot,
  disablePasswordToggle,
  showLabel = "Show password",
  hideLabel = "Hide password",
}: ILoginFormInputGroup) {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = React.useState(false);

  const effectiveType: React.HTMLInputTypeAttribute =
    isPassword && !disablePasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

  const canToggle = isPassword && !disablePasswordToggle && !rightSlot;

  return (
    <div className="relative w-full">
      <Input
        id={id}
        type={effectiveType}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...field}
        aria-invalid={ariaInvalid}
        className={cn(
          // BASE STYLE (same as your LoginFormInput)
          `
          h-12
          w-full
          border-2
          border-[#bfc6d4]
          bg-white
          px-4 py-3
          text-base
          outline-none
          shadow-sm
          rounded-0
          transition-all duration-200
          placeholder:text-gray-500
          placeholder:tracking-wide
          placeholder:text-[16px]
          aria-invalid:border-red-500
          aria-invalid:ring-red-400/30
          focus-visible:ring-0
          focus-visible:ring-offset-0
          focus-visible:shadow-none
          focus-visible:outline-none
          focus-visible:border-[#00baff]
          `,
          // reserve space for right icon/slot
          (canToggle || rightSlot) && "pr-12",
          className
        )}
      />

      {(rightSlot || canToggle) && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {rightSlot ? (
            rightSlot
          ) : (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? hideLabel : showLabel}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-md",
                "text-slate-600 hover:text-slate-900",
                "hover:bg-slate-100 active:bg-slate-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              )}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default LoginFormInputGroup;
