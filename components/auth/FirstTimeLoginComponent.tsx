/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFirstLogin } from "@/app/queries/useFirstLogin";
import { cn } from "@/lib/utils";
import {
  firstTimeLoginEmailSchema,
  TFirstTimeLoginEmailSchema,
} from "@/lib/validation/zodValidationSchema";
import { resolveFormError } from "@/utils/formErrorResponseHandler";
import { SetSessionStorageUserLogin } from "@/utils/setSessionStorageUserLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import LoginRedirection from "../loading/LoginRedirection";
import { Card, CardContent } from "../ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { ApiErrorPayload } from "./form/ErrorLogin";
import LoginFormButton from "./form/LoginFormButton";
import LoginFormInput from "./form/LoginFormInput";
import FormErrorDisplay from "./FormErrorDisplay";
import { useFirstLoginClassroom } from "@/app/queries/useFirstLoginClassroom";

export type VerifyEmailRole = "hybrid" | "classroom";

const VERIFY_EMAIL_CONTENT: Record<
  VerifyEmailRole,
  {
    bannerTitle: string;
    bannerDescription: string;
    submitButtonText: string;
    loadingText: string;
    validateErrorToast: string;
    loginRedirectPath: string;
    setPasswordBasePath: string;
  }
> = {
  hybrid: {
    bannerTitle: "Verify your email",
    bannerDescription:
      "To continue, we’ll verify your email and send you to the next step to create your password.",
    submitButtonText: "Validate Email",
    loadingText: "Validating with LearnWorlds",
    validateErrorToast: "Failed to validate your email",
    loginRedirectPath: "/login",
    setPasswordBasePath: "/verify-email/set-password",
  },
  classroom: {
    bannerTitle: "Verify your classroom email",
    bannerDescription:
      "To continue, we’ll verify your classroom learner email and send you to the next step to create your password.",
    submitButtonText: "Validate Classroom Email",
    loadingText: "Validating classroom learner access",
    validateErrorToast: "Failed to validate your classroom email",
    loginRedirectPath: "/login",
    setPasswordBasePath: "/verify-email/set-password",
  },
};

type FirstTimeLoginComponentProps = {
  role: VerifyEmailRole;
};

function FirstTimeLoginComponent({ role }: FirstTimeLoginComponentProps) {
  // API ERROR
  const [_error, setError] = useState<AxiosError<ApiErrorPayload> | null>(null);

  // Form Error
  const [formError, setFormError] = useState<string | null | undefined>(null);

  // Loading Redirection
  const [redirecting, setRedirecting] = useState(false);

  const router = useRouter();

  const searchParams = useSearchParams();

  const content = VERIFY_EMAIL_CONTENT[role];

  // Normalize only (no validation here; zod will handle it)
  const emailParam = useMemo(() => {
    return (searchParams.get("email") ?? "").trim();
  }, [searchParams]);

  // React Form Integration
  const form = useForm<TFirstTimeLoginEmailSchema>({
    resolver: zodResolver(firstTimeLoginEmailSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const email = form.watch("email");

  useEffect(() => {
    if (!emailParam) return;

    const current = form.getValues("email");
    const userAlreadyTyped = !!current && current !== emailParam;

    if (userAlreadyTyped) return;

    form.setValue("email", emailParam, {
      shouldValidate: true,
      shouldDirty: false,
      shouldTouch: false,
    });
  }, [emailParam, form]);

  const hybridFirstLogin = useFirstLogin();

  const classroomFirstLogin = useFirstLoginClassroom();

  const activeMutation =
    role === "hybrid" ? hybridFirstLogin : classroomFirstLogin;

  const { isValid, isSubmitting } = form.formState;
  const isDisabled =
    !isValid || isSubmitting || activeMutation.isPending || redirecting;

  // Form Submission Handler
  const handleSuccessfulValidation = (response: any) => {
    setError(null);
    setRedirecting(true);

    const resolvedEmail = response?.data?.email ?? form.getValues("email");
    const resolvedToken = response?.data?.token;

    router.push(
      `${content.setPasswordBasePath}?email=${encodeURIComponent(
        resolvedEmail,
      )}&token=${encodeURIComponent(resolvedToken ?? "")}&role=${role}`,
    );
  };

  const handleAlreadyActivatedUser = () => {
    SetSessionStorageUserLogin(form.getValues("email"));

    toast.success(
      "Your account is already activated. Please log in using your email and password.",
    );

    router.replace(content.loginRedirectPath);
  };

  const handleMutationError = (error: any) => {
    setRedirecting(false);

    const resolved = resolveFormError(error);

    if (resolved.rawCode === "USER_EXIST_ACTIVE") {
      handleAlreadyActivatedUser();
      return;
    }

    if (
      resolved.rawCode === "USER_NOT_FOUND" ||
      resolved.rawCode === "INVALID_USER_ROLE" ||
      resolved.rawCode === "USER_ACCOUNT_INACTIVE" ||
      resolved.rawCode === "INVALID_USER_ROLE_HYBRID" ||
      resolved.rawCode === "NO_PROGRAM_ENROLLED_HYBRID" ||
      resolved.rawCode === "USER_EXIST_ACTIVE" ||
      resolved.rawCode === "LW_USER_EXIST_COMPLETED_ONBOARDING" ||
      resolved.rawCode === "LW_FAILED_FETCH_USER_DATA" ||
      resolved.rawCode === "LW_SERVICE_UNAVAILABLE" ||
      resolved.rawCode === "LW_USER_SUSPENDED" ||
      resolved.rawCode === "LW_USER_SUSPENDED" ||
      resolved.rawCode === "LW_USER_NOT_ELIGIBLE"
    ) {
      setFormError(resolved.message);
      toast.error(content.validateErrorToast);
      return;
    }

    // setFormError(resolved.message);

    if (resolved.fieldErrors) {
      Object.entries(resolved.fieldErrors).forEach(([field, message]) => {
        form.setError(field as any, { type: "server", message });
      });

      const firstField = Object.keys(resolved.fieldErrors)[0];
      if (firstField) form.setFocus(firstField as any);
    }

    toast.error(content.validateErrorToast);
  };

  const onSubmit = (data: TFirstTimeLoginEmailSchema) => {
    setError(null);

    if (role === "hybrid") {
      hybridFirstLogin.mutate(data, {
        onSuccess: (response: any) => {
          handleSuccessfulValidation(response);
        },
        onError: (error: any) => {
          handleMutationError(error);
        },
      });

      return;
    }

    if (role === "classroom") {
      classroomFirstLogin.mutate(data, {
        onSuccess: (response: any) => {
          handleSuccessfulValidation(response);
        },
        onError: (error: unknown) => {
          handleMutationError(error);
        },
      });
      return;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 my-4">
        <Card className="border border-blue-200 bg-blue-50/60 rounded-xl py-3 my-3">
          <CardContent className="flex flex-col gap-1">
            <p className="text-blue-900 text-sm leading-relaxed">
              <span className="font-semibold">{content.bannerTitle}</span>{" "}
              {content.bannerDescription}
            </p>
          </CardContent>
        </Card>

        {formError && <FormErrorDisplay message={formError} />}

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={activeMutation.isPending || redirecting}>
            <FieldSet>
              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="corporate-email"
                        className="text-[16px] font-medium text-slate-700"
                      >
                        Email
                      </FieldLabel>

                      <LoginFormInput
                        id="corporate-email"
                        type="email"
                        placeholder="Your e-mail"
                        autoComplete="email"
                        field={field}
                        ariaInvalid={fieldState.invalid}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            <div className="flex mt-6">
              <LoginFormButton
                btnName={content.submitButtonText}
                variant="primary"
                type="submit"
                disabled={isDisabled}
                isLoading={activeMutation.isPending || redirecting}
                loadingText="Validating..."
                classname={cn(
                  "w-full h-12 rounded-xl font-semibold shadow-sm hover:shadow-md transition",
                  isDisabled && "opacity-60 cursor-not-allowed hover:shadow-sm",
                )}
              />
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}
export default FirstTimeLoginComponent;
