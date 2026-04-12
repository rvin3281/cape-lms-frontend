/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useLogin } from "@/app/queries/useLogin";
import { cn } from "@/lib/utils";
import {
  loginSchema,
  TLoginSchema,
} from "@/lib/validation/zodValidationSchema";
import { resolveFormError } from "@/utils/formErrorResponseHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import ErrorLogin, { ApiErrorPayload } from "./form/ErrorLogin";
import LoginFormButton from "./form/LoginFormButton";
import LoginFormInput from "./form/LoginFormInput";
import LoginFormSelect from "./form/LoginFormSelect";
import FormErrorDisplay from "./FormErrorDisplay";

function getVerifyEmailHref(roleCode?: string) {
  switch (roleCode) {
    case "HYBRID_LEARNER":
      return "/verify-email/hybrid";
    case "CLASSROOM_LEARNER":
      return "/verify-email/classroom";
    default:
      return null;
  }
}

function getLoginButtonText(roleCode?: string) {
  switch (roleCode) {
    case "INDIVIDUAL_LEARNER":
      return "Sign In as Individual Learner";
    case "HYBRID_LEARNER":
      return "Sign In as Hybrid Learner";
    case "CLASSROOM_LEARNER":
      return "Sign In as Classroom Learner";
    default:
      return "Sign In";
  }
}

type PostSetPasswordRole = "hybrid" | "classroom";

function getRoleCodeFromPostSetPasswordRole(
  role?: PostSetPasswordRole | null,
): TLoginSchema["roleCode"] | "" {
  switch (role) {
    case "hybrid":
      return "HYBRID_LEARNER";
    case "classroom":
      return "CLASSROOM_LEARNER";
    default:
      return "";
  }
}

function getValidatedBannerContent(role?: PostSetPasswordRole | null) {
  switch (role) {
    case "hybrid":
      return {
        title: "Your Hybrid Learner account is ready",
        description: "Please sign in using your verified email and password.",
      };
    case "classroom":
      return {
        title: "Your Classroom Learner account is ready",
        description:
          "Please sign in using your verified classroom email and password.",
      };
    default:
      return {
        title: "Your learner account is ready",
        description: "Please sign in using your email and password.",
      };
  }
}

function LoginComponent({
  lockLearnerType,
  prefillEmail,
  showValidatedBanner,
  postSetPasswordRole,
}: {
  lockLearnerType?: boolean;
  prefillEmail?: string;
  showValidatedBanner?: boolean;
  postSetPasswordRole?: PostSetPasswordRole | null;
}) {
  const [error, setError] = useState<AxiosError<ApiErrorPayload> | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  const router = useRouter();

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      roleCode: "",
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const loginAdmin = useLogin();

  const { isDirty, isValid, isSubmitting } = form.formState;

  const isDisabled =
    !isDirty || !isValid || isSubmitting || loginAdmin.isPending || redirecting;

  // watch field values
  const email = form.watch("email");
  const password = form.watch("password");
  const roleCode = form.watch("roleCode");

  const isIndividualLearner = roleCode === "INDIVIDUAL_LEARNER";

  const verifyEmailHref = useMemo(
    () => getVerifyEmailHref(roleCode),
    [roleCode],
  );

  useEffect(() => {
    form.reset({
      roleCode: getRoleCodeFromPostSetPasswordRole(postSetPasswordRole),
      email: prefillEmail ?? "",
      password: "",
    });
  }, [postSetPasswordRole, prefillEmail]);

  useEffect(() => {
    if (!formError) return;

    setFormError(null);
  }, [email, password]);

  const onSubmit = async (values: TLoginSchema) => {
    setError(null);

    loginAdmin.mutate(values, {
      onSuccess: (data: any) => {
        setError(null);
        setRedirecting(true);

        if (data?.data?.user?.isFirstTimeLogin) {
          router.replace("/onboarding");
          return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const next = urlParams.get("next") || "/dashboard";

        setTimeout(() => {
          router.replace(next);
        }, 300);
      },
      onError: (e) => {
        setRedirecting(false);
        const resolved = resolveFormError(e);
        setFormError(resolved.message);

        if (resolved.fieldErrors) {
          Object.entries(resolved.fieldErrors).forEach(([field, message]) => {
            form.setError(field as any, { type: "server", message });
          });

          const firstField = Object.keys(resolved.fieldErrors)[0];
          if (firstField) form.setFocus(firstField as any);
        }
      },
    });
  };
  return (
    <>
      {error && <ErrorLogin error={error} />}

      <div className="flex flex-col gap-4">
        {showValidatedBanner ? (
          <Card className="border border-emerald-200 bg-emerald-50/60 p-3 text-emerald-900 rounded-xl py-3 my-3">
            <CardContent className="flex flex-col">
              <p className="font-semibold mb-1 text-sm">
                {getValidatedBannerContent(postSetPasswordRole).title}
              </p>
              <p className="text-sm">
                {getValidatedBannerContent(postSetPasswordRole).description}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border border-blue-200 bg-blue-50/60 rounded-xl py-3 my-3">
            <CardContent className="flex flex-col gap-2">
              <p className="text-blue-900 text-sm leading-relaxed">
                Choose the learner type that matches how your account was
                created and how you access training on CAPE.
              </p>

              <p className="text-blue-900 text-sm leading-relaxed">
                <span className="font-semibold">Individual Learner -</span> For
                users who sign up on their own to explore, purchase, and join
                available courses or programmes.
              </p>

              <p className="text-blue-900 text-sm leading-relaxed">
                <span className="font-semibold">Hybrid Learner -</span> For
                employees or sponsored learners whose account was created for
                company or organisation training access.
              </p>

              <p className="text-blue-900 text-sm leading-relaxed">
                <span className="font-semibold">Classroom Learner -</span> For
                learners attending physical or in-person training sessions
                conducted by CAPE.
              </p>
            </CardContent>
          </Card>
        )}

        {/* SERVER FORM ERROR */}
        {formError && <FormErrorDisplay message={formError} />}

        {/* ========================= */}
        {/* EMAIL / PASSWORD FORM     */}
        {/* ========================= */}

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={loginAdmin.isPending || redirecting}>
            <FieldGroup>
              <FieldSet>
                <FieldGroup className="gap-4">
                  {/* Role / Login Context */}
                  <Controller
                    name="roleCode"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="role-code"
                          className="text-[16px] font-medium text-slate-700"
                        >
                          Learner Type
                        </FieldLabel>

                        <LoginFormSelect
                          id="role-code"
                          placeholder="Select learner type"
                          options={[
                            {
                              value: "INDIVIDUAL_LEARNER",
                              label: "Individual Learner",
                              disabled: true,
                            },
                            {
                              value: "HYBRID_LEARNER",
                              label: "Hybrid Learner",
                            },
                            {
                              value: "CLASSROOM_LEARNER",
                              label: "Classroom Learner",
                            },
                          ]}
                          // field={field}
                          value={field.value}
                          onValueChange={field.onChange}
                          ariaInvalid={fieldState.invalid}
                          disabled={
                            loginAdmin.isPending ||
                            redirecting ||
                            lockLearnerType
                          }
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Email */}
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

                  {/* Password */}
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="edit-password"
                          className="text-[16px] font-medium text-slate-700"
                        >
                          Password
                        </FieldLabel>

                        <LoginFormInput
                          id="edit-password"
                          type="password"
                          placeholder="Your Password"
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
            </FieldGroup>

            {/* Remeber me and Forgot Password */}
            <div className="flex items-end justify-between mt-3">
              {verifyEmailHref && (
                <Link
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                  href={verifyEmailHref}
                >
                  Verify Email
                </Link>
              )}

              <Link
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                href="#"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="flex mt-6">
              <LoginFormButton
                variant="primary"
                type="submit"
                disabled={isDisabled}
                isLoading={loginAdmin.isPending || redirecting}
                loadingText="Signing in..."
                btnName={getLoginButtonText(roleCode)}
                classname={cn(
                  "w-full h-12 rounded-xl font-semibold shadow-sm hover:shadow-md transition",
                  isDisabled && "opacity-60 cursor-not-allowed hover:shadow-sm",
                )}
              />
            </div>
          </fieldset>
        </form>

        {/* ========================= */}
        {/* OAuth SEPARATOR (OR)      */}
        {/* ========================= */}
        {isIndividualLearner && (
          <>
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs font-medium text-slate-500 uppercase">
                OR
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="flex flex-col gap-3">
              <Button variant="outline" size="lg">
                <FaGoogle /> Continue with Google
              </Button>
              <Button variant="outline" size="lg">
                <FaGithub /> Continue with GitHub
              </Button>
            </div>

            <p className="mt-3 text-center text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                href="#"
              >
                Sign up Free
              </Link>
            </p>
          </>
        )}
      </div>
    </>
  );
}
export default LoginComponent;
