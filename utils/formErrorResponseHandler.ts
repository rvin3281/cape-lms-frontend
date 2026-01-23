/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApiErrorItem,
  ApiErrorPayload,
  ResolvedFormError,
} from "@/lib/interface/APIErrorResponse";
import { ServerFormError } from "./ServerFormError";

/**
 * Normalize any unknown error shape into { message, fieldErrors }.
 * Accepts:
 * - axios error
 * - axios error.response
 * - axios error.response.data
 * - raw payload
 */
export const resolveFormError = (input: any): ResolvedFormError => {
  // 1) Try to locate the payload safely
  const payload: ApiErrorPayload | undefined =
    input?.response?.data ?? // axios error
    input?.data ?? // axios response
    input; // already payload

  // 2) If nothing usable, return default
  if (!payload || typeof payload !== "object") {
    return { message: ServerFormError() };
  }

  const rawCode = typeof payload.code === "string" ? payload.code : undefined;

  // 3) If items exist and are valid array -> build fieldErrors + banner message
  const itemsRaw = Array.isArray(payload.items) ? payload.items : undefined;

  if (itemsRaw && itemsRaw.length > 0) {
    const normalizedItems: ApiErrorItem[] = itemsRaw
      .filter((x) => x && typeof x === "object")
      .map((x) => ({
        code: x?.code,
        meta: x?.meta ?? {},
      }));

    const fieldErrors: Record<string, string> = {};

    for (const it of normalizedItems) {
      const field = it.meta?.field;
      const msg = ServerFormError(it.code);

      if (field && typeof field === "string") {
        // if multiple errors for same field, keep first (usually best UX)
        if (!fieldErrors[field]) fieldErrors[field] = msg;
      }
    }

    // Banner message strategy:
    // - if there are field errors -> show generic form banner
    // - else -> show the first item message
    const message =
      Object.keys(fieldErrors).length > 0
        ? ServerFormError("FORM_FIELD_ERROR")
        : ServerFormError(normalizedItems[0]?.code);

    return {
      message,
      fieldErrors: Object.keys(fieldErrors).length ? fieldErrors : undefined,
      items: normalizedItems,
      rawCode,
      statusCode: payload.statusCode,
    };
  }

  // 4) No items -> use payload.code if exists; fallback to payload.message; else default
  if (rawCode) {
    return {
      message: ServerFormError(rawCode),
      rawCode,
      statusCode: payload.statusCode,
    };
  }

  // sometimes backend returns message without code
  if (typeof payload.message === "string" && payload.message.trim()) {
    return {
      message: payload.message,
      statusCode: payload.statusCode,
    };
  }

  // 5) Final fallback
  return { message: ServerFormError(), statusCode: payload.statusCode };
};
