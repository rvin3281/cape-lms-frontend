/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client";';
import { useLogin } from "@/app/queries/useLogin";
import { cn } from "@/lib/utils";
import {
  loginSchemaAdmin,
  TLoginSchemaAdmin,
} from "@/lib/validation/zodValidationSchema";
import { resolveFormError } from "@/utils/formErrorResponseHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import LoginRedirection from "../loading/LoginRedirection";
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

function LoginComponentAdmin() {
  const [error, setError] = useState<AxiosError<ApiErrorPayload> | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const [redirecting, setRedirecting] = useState(false);

  const skipNextAutoClearRef = useRef(false);

  const form = useForm<TLoginSchemaAdmin>({
    resolver: zodResolver(loginSchemaAdmin),
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
    !isDirty || !isValid || isSubmitting || loginAdmin.isPending;

  const email = form.watch("email");
  const password = form.watch("password");
  const roleCode = form.watch("roleCode");

  useEffect(() => {
    if (!formError) return;

    setFormError(null);
  }, [email, password, roleCode]);

  useEffect(() => {
    if (!error) return;

    if (skipNextAutoClearRef.current) {
      skipNextAutoClearRef.current = false;
      return;
    }

    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, roleCode]);

  const router = useRouter();

  const onSubmit = async (values: TLoginSchemaAdmin) => {
    setError(null);
    loginAdmin.mutate(values, {
      onSuccess: (data: any) => {
        setError(null);
        setRedirecting(true);

        router.replace("/admin/dashboard");
      },
      onError: (e) => {
        console.log("Error", e);
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
      {redirecting && <LoginRedirection title="Redirecting" />}
      {error && <ErrorLogin error={error} />}

      <div className="flex flex-col gap-4">
        <Card className="border border-blue-200 bg-blue-50/60 rounded-xl py-3 my-3">
          <CardContent className="flex flex-col gap-1">
            <p className="text-blue-900 text-sm leading-relaxed">
              <span className="font-semibold">Admin Access:</span> Manage
              courses, users, content, analytics, and platform settings.
            </p>
          </CardContent>
        </Card>

        {formError && <FormErrorDisplay message={formError} />}

        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* <fieldset disabled={loginAdmin.isPending || redirecting}> */}
          <fieldset disabled={false}>
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
                          htmlFor="login-context"
                          className="text-[16px] font-medium text-slate-700"
                        >
                          Admin Type
                        </FieldLabel>

                        <LoginFormSelect
                          id="login-context"
                          placeholder="Select Admin type"
                          options={[
                            {
                              value: "CAPE_ADMIN",
                              label: "CAPE Admin ",
                            },
                            {
                              value: "HR_FOCAL_ADMIN",
                              label: "HR Focal Admin",
                              disabled: true,
                            },
                          ]}
                          field={field}
                          ariaInvalid={fieldState.invalid}
                          // disabled={loginAdmin.isPending || redirecting}
                          value={field.value} // ✅ pass value explicitly
                          onValueChange={field.onChange}
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
                          placeholder="admin@learnhub.com"
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
                          placeholder="Enter admin password"
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
            <div className="flex justify-end mt-3">
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
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="flex mt-6">
              <LoginFormButton
                btnName={
                  loginAdmin.isPending ? "Logging in..." : "Sign In As Admin"
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
      </div>
    </>
  );
}
export default LoginComponentAdmin;
