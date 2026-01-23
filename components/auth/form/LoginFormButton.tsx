import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FiLoader } from "react-icons/fi";

export interface ILoginFormButton {
  type?: "button" | "submit" | "reset";
  btnName: string;
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
  disabled?: boolean; // ✅ optional
  classname?: string;
}

function LoginFormButton({
  type = "button",
  btnName,
  variant = "primary",
  isLoading = false,
  disabled = false,
  classname,
}: ILoginFormButton) {
  const isButtonDisabled = disabled || isLoading; // ✅ single source

  // Base Style
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    h-11 w-full
    rounded-md
    px-4 py-2
    text-sm font-medium
    transition-all duration-200
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    disabled:opacity-60
    disabled:cursor-not-allowed
    cursor-pointer
  `;

  // Variant Style
  const variantStyles: Record<typeof variant, string> = {
    primary: `
      bg-[#00baff]
      text-white
      shadow-sm
      hover:bg-[#003a70]
      focus-visible:ring-[#004880]/60

      disabled:bg-slate-300        /* ✅ grey background */
      disabled:text-slate-500      /* ✅ muted text */
      disabled:hover:bg-slate-300  /* ✅ kill hover */
      disabled:shadow-none         /* ✅ flatter look */

      px-[24px]
      py-[12px]
      text-base
      leading-[1.5rem]
      font-medium
      rounded-[8px]
      w-full
      border-none
      transition-all duration-300 ease-in-out
      `,
    secondary: `
      bg-[#e6f0f7]
      text-[#004880]
      hover:bg-[#d2e4f2]
      focus-visible:ring-[#004880]/40
    `,
    outline: `
      border border-[#004880]
      bg-white
      text-[#004880]
      hover:bg-[#004880]/5
      focus-visible:ring-[#004880]/40
    `,
  };

  return (
    <Button
      type={type}
      disabled={isButtonDisabled}
      className={cn(baseStyles, variantStyles[variant], classname)}
    >
      {isLoading && (
        <FiLoader className="h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      <span>{isLoading ? "Please wait..." : btnName}</span>
    </Button>
  );
}
export default LoginFormButton;
