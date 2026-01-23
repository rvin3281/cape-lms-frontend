"use client";

import { useLogin } from "@/app/queries/useLogin";
import { useAppDispatch } from "@/lib/redux/hooks";
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
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import LoginRedirection from "../loading/LoginRedirection";
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

function LoginComponent({
  lockEnterpriseLearner,
  prefillEmail,
  showValidatedBanner,
}: {
  lockEnterpriseLearner?: boolean;
  prefillEmail?: string;
  showValidatedBanner?: boolean;
}) {
  const [error, setError] = useState<AxiosError<ApiErrorPayload> | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const [redirecting, setRedirecting] = useState(false);

  const [individualLearnerSelected, setIndividualLearnerSelected] =
    useState(true);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginContext: "",
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const loginAdmin = useLogin();

  const { isDirty, isValid, isSubmitting } = form.formState;

  const isDisabled =
    !isDirty || !isValid || isSubmitting || loginAdmin.isPending;

  // ✅ watch field values
  const email = form.watch("email");
  const password = form.watch("password");
  const loginContext = form.watch("loginContext");

  // useEffect(() => {
  //   if (!prefillEmail) return;

  //   form.setValue("email", "test@gmail.com", { shouldDirty: true });
  // }, [prefillEmail]);

  useEffect(() => {
    form.reset({
      loginContext: lockEnterpriseLearner ? "ENTERPRISE_LEARNER" : "",
      email: prefillEmail ?? "",
      password: "",
    });
  }, [lockEnterpriseLearner, prefillEmail]); // ✅ correct deps

  useEffect(() => {
    if (!formError) return;

    setFormError(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  useEffect(() => {
    if (!loginContext) return;

    if (loginContext === "INDIVIDUAL_LEARNER") {
      setIndividualLearnerSelected(true);
    }

    if (loginContext === "ENTERPRISE_LEARNER") {
      setIndividualLearnerSelected(false);
    }
  }, [loginContext]);

  useEffect(() => {}, [lockEnterpriseLearner, prefillEmail]);
  // Form Submission
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

        // ✅ handle redirect with optional `next`
        const urlParams = new URLSearchParams(window.location.search);
        const next = urlParams.get("next") || "/dashboard";

        router.replace(next);
      },
      onError: (e) => {
        setRedirecting(false);

        const resolved = resolveFormError(e);

        setFormError(resolved.message);

        if (resolved.fieldErrors) {
          // field-level (RHF)
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
      {redirecting && (
        <LoginRedirection title="Preparing your dashboard. Please wait." />
      )}
      {error && <ErrorLogin error={error} />}

      <div className="flex flex-col gap-4">
        {showValidatedBanner ? (
          <Card className="border border-emerald-200 bg-emerald-50/60 p-3 text-emerald-900 rounded-xl py-3 my-3">
            <CardContent className="flex flex-col">
              <p className="font-semibold mb-1 text-sm">
                Your Enterprise Learner account has been validated
              </p>
              <p className="text-sm">
                Please log in using your email and password.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border border-blue-200 bg-blue-50/60 rounded-xl py-3 my-3">
            <CardContent className="flex flex-col gap-1">
              <p className="text-blue-900 text-sm leading-relaxed">
                <span className="font-semibold">Learner Access:</span> Access
                your courses, track progress, join community discussions, and
                earn achievements.
              </p>
              <p className="text-blue-900 text-sm leading-relaxed">
                <span className="font-semibold">Individual Learner -</span> Sign
                up and learn on your own.
              </p>
              <p className="text-blue-900 text-sm leading-relaxed">
                <span className="font-semibold">Enterprise Learner -</span>{" "}
                Access training provided by your company (account pre-created).
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
                    name="loginContext"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="login-context"
                          className="text-[16px] font-medium text-slate-700"
                        >
                          Learner Type
                        </FieldLabel>

                        <LoginFormSelect
                          id="login-context"
                          placeholder="Select learner type"
                          options={[
                            {
                              value: "INDIVIDUAL_LEARNER",
                              label: "Individual Learner",
                            },
                            {
                              value: "ENTERPRISE_LEARNER",
                              label: "Enterprise Learner",
                            },
                          ]}
                          // field={field}
                          value={field.value} // ✅ pass value explicitly
                          onValueChange={field.onChange} // ✅ pass change handler explicitly
                          ariaInvalid={fieldState.invalid}
                          disabled={
                            loginAdmin.isPending ||
                            redirecting ||
                            lockEnterpriseLearner
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
              {!individualLearnerSelected && (
                <Link
                  className="text-bluetext-sm text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                  href="/first-login"
                >
                  First Time Login?
                </Link>
              )}

              <Link
                className="text-bluetext-sm text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                href="#"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="flex mt-6">
              <LoginFormButton
                btnName={
                  loginAdmin.isPending
                    ? "Logging in..."
                    : `${
                        individualLearnerSelected
                          ? "Sign In As Learner"
                          : "Sign In As Enterprise Learner"
                      }`
                }
                variant="primary"
                type="submit"
                disabled={isDisabled}
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
        {individualLearnerSelected && (
          <>
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs font-medium text-slate-500 uppercase">
                OR
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* ========================= */}
            {/* OAuth BUTTONS (OUTSIDE FORM) */}
            {/* ========================= */}
            <div className="flex flex-col gap-3">
              <Button variant="outline" size="lg">
                <FaGoogle /> Continue with Google
              </Button>
              <Button variant="outline" size="lg">
                <FaGithub /> Continue with GitHub
              </Button>
            </div>

            {/* ========================= */}
            {/* SIGN UP LINK              */}
            {/* ========================= */}
            {/* subtle helper text */}
            <p className="mt-3 text-center  text-slate-500">
              Don't have an account?{" "}
              <Link
                className="text-bluetext-sm
      text-blue-600
      hover:text-blue-700
      hover:underline
      underline-offset-4
      transition-colors
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-blue-500
      rounded-sm"
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
