/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CircleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type FormErrorAlertProps = {
  page?: string;
  errors?: string[];
  title?: string;
  message?: string;
};

function FormAlertError({
  page,
  errors = [],
  title = "Please fix the following errors",
  message,
}: FormErrorAlertProps) {
  // if (!errors.length) return null;
  if (page === "PROGRAM_ONBOARDING") {
    return (
      <div className="mb-4 grid w-full items-start gap-4">
        <Alert className="border-red-200 bg-red-50 text-red-800 shadow-sm [&>svg]:text-red-600">
          <CircleAlertIcon className="mt-0.5 size-5" />

          <AlertTitle className="flex items-center justify-between gap-3 text-sm font-semibold text-red-700">
            <span>{title}</span>
          </AlertTitle>

          <AlertDescription className="mt-2 text-red-700">
            <p className="mb-3 text-sm">{message}</p>
            {errors.length > 0 && (
              <ul className="space-y-2">
                {errors.map((error: any) =>
                  error.errors.map((e: string, index: number) => (
                    <li
                      key={`${e}-${index}`}
                      className="flex items-start gap-2 rounded-md border border-red-200 bg-white/70 px-3 py-2 text-sm"
                    >
                      <span className="mt-[2px] text-red-600">•</span>
                      <span>{e}</span>
                    </li>
                  )),
                )}
              </ul>
            )}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="mb-4 grid w-full items-start gap-4">
      <Alert className="border-red-200 bg-red-50 text-red-800 shadow-sm [&>svg]:text-red-600">
        <CircleAlertIcon className="mt-0.5 size-5" />

        <AlertTitle className="flex items-center justify-between gap-3 text-sm font-semibold text-red-700">
          <span>{title}</span>
        </AlertTitle>

        <AlertDescription className="mt-2 text-red-700">
          <p className="mb-3 text-sm">{message}</p>

          <ul className="space-y-2">
            {errors.map((error, index) => (
              <li
                key={`${error}-${index}`}
                className="flex items-start gap-2 rounded-md border border-red-200 bg-white/70 px-3 py-2 text-sm"
              >
                <span className="mt-[2px] text-red-600">•</span>
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}
export default FormAlertError;
