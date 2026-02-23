/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ERROR_MESSAGE,
  ITEM_MESSAGE,
} from "@/lib/constant/error-response.constants";
import { AxiosError } from "axios";
import { AlertCircleIcon } from "lucide-react";

export type ApiErrorPayload = {
  code: string;
  items?: { code?: string; meta?: Record<string, any> }[];
};

function ErrorLogin({ error }: { error: AxiosError<ApiErrorPayload> | null }) {
  const errCode = error?.response?.data?.code;
  const errItems = error?.response?.data?.items ?? [];

  return (
    <div className="mb-4">
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>
          {errCode
            ? (ERROR_MESSAGE[errCode] ?? "Something went wrong")
            : "Something went wrong"}
        </AlertTitle>
        <AlertDescription>
          {errItems?.length > 0 && (
            <ul className="list-inside list-disc text-sm">
              {errItems?.map((item, index) =>
                item.code ? (
                  <li key={index}>
                    {ITEM_MESSAGE[item.code] ?? "Unknown error"}
                  </li>
                ) : null,
              )}
            </ul>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default ErrorLogin;
