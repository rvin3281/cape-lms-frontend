// frontend/error-messages.ts
export const ERROR_MESSAGE: Record<string, string> = {
  // Field / input (user can fix)
  EMAIL_PASSWORD_REQUIRED: "Please enter your email and password.",
  EMAIL_NOT_FOUND: "Invalid email, Please try again",
  PASSWORD_INVALID: "Invalid password, Please try again.",

  // System/session/auth (don’t expose internals)
  UNAUTHENTICATED: "Your session has expired. Please sign in again.",
  ACCESS_TOKEN_INVALID: "Your session has expired. Please sign in again.",
  REFRESH_TOKEN_MISSING: "Your session has expired. Please sign in again.",
  REFRESH_TOKEN_INVALID: "Your session has expired. Please sign in again.",
  PASSWORD_HASH_MISSING:
    "We couldn’t sign you in. Please try again or contact support.",
  JWT_SECRET_NOT_CONFIGURED:
    "We’re having trouble signing you in right now. Please try again later.",
  LOGIN_NETWORK_ERROR:
    "We’re having trouble signing you in right now. Please try again later.",
};

export const ITEM_MESSAGE: Record<string, string> = {
  EMAIL_FIELD_REQUIRED: "Email is required.",
  PASSWORD_FIELD_REQUIRED: "Password is required.",
};
