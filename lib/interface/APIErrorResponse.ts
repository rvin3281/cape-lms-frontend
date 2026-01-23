export interface ApiErrorItem {
  code: string;
  meta?: {
    field?: string;
    [k: string]: any;
  };
}

export interface ApiValidationErrorItem {
  field: string;
  messages: string[];
}

export interface ApiValidationErrorPayload {
  statusCode?: number;
  timestamp?: string;
  path?: string;
  code?: string;
  message?: string;
  items?: ApiValidationErrorItem[];
}

export interface ApiErrorPayload {
  statusCode?: number;
  timestamp?: string;
  path?: string;
  code?: string;
  message?: string; // sometimes APIs send this
  items?: ApiErrorItem[];
}

export type ResolvedFormError = {
  message: string; // for FormErrorDisplay banner
  fieldErrors?: Record<string, string>; // for RHF setError
  items?: ApiErrorItem[];
  rawCode?: string;
  statusCode?: number;
};
