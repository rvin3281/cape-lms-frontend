import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

export interface ILoginFormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  id: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  ariaInvalid?: boolean;
  className?: string;
  field?: ControllerRenderProps<TFieldValues, TName>;
}

function LoginFormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  id,
  type,
  placeholder,
  autoComplete,
  ariaInvalid,
  className,
  field,
}: ILoginFormInput<TFieldValues, TName>) {
  return (
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      {...field}
      aria-invalid={ariaInvalid}
      className={cn(
        `
        h-12 w-full border-2 border-[#bfc6d4] bg-white px-4 py-3 text-base
        outline-none shadow-sm rounded-0 transition-all duration-200
        placeholder:text-gray-500 placeholder:tracking-wide placeholder:text-[16px]
        aria-invalid:border-red-500 aria-invalid:ring-red-400/30
        focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none
        focus-visible:outline-none focus-visible:border-[#00baff]
        `,
        className,
      )}
    />
  );
}

export default LoginFormInput;
