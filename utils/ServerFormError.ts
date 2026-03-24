export const ServerFormError = (errorCode?: string): string => {
  switch (errorCode) {
    case "FORM_FIELD_ERROR":
      return "Please review the highlighted fields and correct the errors before continuing.";

    case "EMAIL_NOT_FOUND_QUERY":
      return "We couldn’t find an account with this email address. Please check the email or try another one.";

    case "PASSWORD_FIELD_REQUIRED":
      return "Please enter a password to continue.";

    case "CONFIRM_PASSWORD_FIELD_REQUIRED":
      return "Please confirm your password to continue.";

    case "PASSWORDS_DO_NOT_MATCH":
      return "The passwords you entered do not match. Please make sure both passwords are the same.";

    case "PASSWORD_TOO_WEAK":
      return "Your password is too weak. Please choose a stronger password for better security.";

    case "PASSWORD_CAPITAL_REQUIRED":
      return "Your password must include at least one uppercase letter (A–Z).";

    case "PASSWORD_NUMBER_REQUIRED":
      return "Your password must include at least one number (0–9).";

    case "PASSWORD_SPCIALCHAR_REQUIRED":
      return "Your password must include at least one special character (for example: ! @ # $ %).";

    case "USER_NOT_FOUND":
      return "We couldn’t find your account. Please check your details or contact support if the issue continues.";

    case "USER_ALREADY_ACTIVE":
      return "Your account is already active. Please log in using your existing password.";

    case "LOGIN_USER_NOT_FOUND":
      return "We couldn’t sign you in with the details provided. Please check your email try again.";

    case "USER_EXIST_ACTIVE":
      return "Your account is already active. Please log in using your registered email address and password.";

    case "PASSWORD_INVALID":
      return "Wrong Password! Please try again";

    case "LW_USER_NOT_ELIGIBLE":
      return "Your email is not activated. Please contact CAPE support team.";

    case "LW_SERVICE_UNAVAILABLE":
      return "Our service is temporarily unavailable. Please try again later or contact the CAPE support team if the issue persists.";

    case "VALIDATE_YOUR_EMAIL":
      return "Please validate your email. Click First Login to validate.";

    case "ONBOARDING_USER_EMAIL_NOT_FOUND":
      return "We couldn’t find an account with that email. Please check the email address and try again.";

    case "ONBOARDING_ALREADY_COMPLETED":
      return "Your account setup is already complete. Please log in to continue.";

    case "ONBOARDING_LEARNER_PROFILE_NOT_FOUND":
      return "We couldn’t load your profile to complete setup. Please contact support for help.";

    case "ONBOARDING_LEARNWORLDS_UPDATE_FAILED":
      return "We couldn’t save your details right now due to a system issue. Please try again in a moment.";

    case "VALIDATION_ERROR":
      return "Fix Required Fields";

    case "ONBOARDING_ERROR":
      return "Profile Setup Issue";

    case "LW_ERROR":
      return "System Connection Issue";

    case "BACKEND_SERVER_ERROR":
      return "Temporary System Issue";

    case "LW_CONNECTION_ISSUE":
      return "Something went wrong while we are trying to connect with our system. This may be a temporary issue. Please try again later or contact our support team if the problem persists.";

    case "ROLE_NOT_MATCH":
      return "Your selected role does not match. Please change your role";

    case "FACILITATOR_NAME_EXIST":
      return "Facilitator Name Already Exist. Please try again!";

    case "INVALID_USER_ROLE":
      return "This email is not registered as a classroom learner account.";

    case "USER_ACCOUNT_INACTIVE":
      return "This account is inactive. Please contact administrator.";

    case "SET_PASSWORD_EMAIL_MISSING":
      return "Your password setup link is incomplete. Please use the latest link or start again.";

    case "SET_PASSWORD_TOKEN_MISSING":
      return "Your password setup link is missing required details. Please use the latest link or request a new one.";

    case "SET_PASSWORD_TOKEN_INVALID":
      return "This password setup link is invalid or has already been used. Please request a new one.";

    case "SET_PASSWORD_TOKEN_EXPIRED":
      return "This password setup link has expired. Please request a new one.";

    case "SET_PASSWORD_LINK_INVALID":
      return "We could not verify your password setup link. Please request a new one.";

    default:
      return "Something went wrong on our side. Please try again later or contact our support team for assistance.";
  }
};
