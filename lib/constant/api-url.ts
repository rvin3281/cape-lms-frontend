export const LOGIN_API = "/auth/login";
export const ME_API = "/auth/me";
export const REFRESH_API = "/auth/refresh";
export const LOGOUT_API = "/auth/logout";
export const VALIDATE_EMAIL_API = "/auth/validate-email";
export const SET_PASSWORD_API = "/auth/set-password";
export const VALIDATE_PASSWORD_TOKEN_API = "/auth/validate-password-token";
export const GET_ALL_TOTAL_NUMBER_ACTIVE_COURSE = (userId: string) =>
  `/course/get-overall-progress/${userId}`;
export const GET_ALL_PROGRAM_BY_USER = "/user/all-program";
export const SSO_USER_PROGRAM = "/user/learnworlds/sso";
export const ONBOARDING_LEARNER = "/auth/onboarding";
export const GET_USER_ONBOARDING_DATA = "/user/user-profile";
