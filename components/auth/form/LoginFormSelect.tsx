/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type LoginSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export interface ILoginFormSelect {
  id?: string;
  placeholder?: string;
  className?: string;
  ariaInvalid?: boolean;

  // ✅ dynamic options
  options: LoginSelectOption[];

  // ✅ react-hook-form field
  field?: ControllerRenderProps<any, any>;

  // ✅ optional external control if you ever need it
  value?: string;
  onValueChange?: (value: string) => void;

  disabled?: boolean;
}

function LoginFormSelect({
  id,
  placeholder = "Select an option",
  className,
  ariaInvalid,
  options,

  value,
  onValueChange,
  disabled,
}: ILoginFormSelect) {
  // Priority:
  // 1) RHF field value if provided
  // 2) explicit value prop
  // const currentValue = (field?.value ?? value) || undefined;

  // const handleChange = (v: string) => {
  //   // 1) update RHF if present
  //   field?.onChange?.(v);
  //   // 2) external callback if present
  //   onValueChange?.(v);
  // };

  return (
    <Select
      key={value ?? "empty"}
      value={value ?? ""} // keep it controlled
      onValueChange={(v) => onValueChange?.(v)}
      disabled={disabled}
    >
      <SelectTrigger
        id={id}
        aria-invalid={ariaInvalid}
        className={cn(
          `
          h-12
          w-full
          border-2
          border-[#bfc6d4]
          bg-white
          px-4
          text-base
          shadow-sm
          rounded-none
          transition-all duration-200
          focus:outline-none
          focus:ring-0
          focus-visible:ring-0
          focus-visible:ring-offset-0
          focus-visible:shadow-none
          aria-invalid:border-red-500
          `,
          // ✅ mimic your input focus border
          !ariaInvalid && "focus:border-[#00baff]",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default LoginFormSelect;
