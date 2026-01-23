/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

import { CheckCircle2Icon, PopcornIcon, AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AxiosError } from "axios";
import {
  ERROR_MESSAGE,
  ITEM_MESSAGE,
} from "@/lib/constant/error-response.constants";

export type ApiErrorPayload = {
  code: string;
  items?: { code?: string; meta?: Record<string, any> }[];
};

function ErrorLogin({ error }: { error: AxiosError<ApiErrorPayload> | null }) {
  const errCode = error?.response?.data?.code;
  const errItems = error?.response?.data?.items;

  return (
    <div className="mb-4">
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>{ERROR_MESSAGE[errCode]}</AlertTitle>
        <AlertDescription>
          {errItems?.length > 0 && (
            <ul className="list-inside list-disc text-sm">
              {errItems?.map((item, index) => (
                <li key={index}>{ITEM_MESSAGE[item.code]}</li>
              ))}
            </ul>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default ErrorLogin;
