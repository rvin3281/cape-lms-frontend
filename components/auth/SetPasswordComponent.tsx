"use client";

import { useSetPassword } from "@/app/queries/useSetPassword";
import {
  firstTimeSetPasswordSchema,
  TFirstTimeSetPasswordSchema,
} from "@/lib/validation/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { resolveFormError } from "@/utils/formErrorResponseHandler";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
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
import { ApiErrorPayload } from "./form/ErrorLogin";
import LoginFormButton from "./form/LoginFormButton";
import LoginFormInputGroup from "./form/LoginForminputGroup";
import FormErrorDisplay from "./FormErrorDisplay";

function SetPasswordComponent() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const emailQuery = searchParams.get("email");
  // Get the email from query param
  const normalizeEmail = useMemo(() => emailQuery?.trim() || "", [emailQuery]);

  // API ERROR
  const [error, setError] = useState<AxiosError<ApiErrorPayload> | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Loading Redirection
  const [redirecting, setRedirecting] = useState(false);

  const form = useForm({
    resolver: zodResolver(firstTimeSetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const setPassword = useSetPassword();

  const { isDirty, isValid, isSubmitting } = form.formState;

  const isDisabled =
    !isDirty || !isValid || isSubmitting || setPassword.isPending;

  const onSubmit = (data: TFirstTimeSetPasswordSchema) => {
    setError(null);
    setFormError(null);

    const formData: TFirstTimeSetPasswordSchema & {
      email: string | undefined;
    } = {
      ...data,
      email: normalizeEmail,
    };

    setPassword.mutate(formData, {
      onSuccess: () => {
        setError(null);
        setRedirecting(true);

        // NOTE: USER NOTIFICATION MESSAGE

        sessionStorage.setItem(
          "post_set_password",
          JSON.stringify({
            email: normalizeEmail,
            at: Date.now(),
          })
        );

        router.replace(`/login`);
      },
      onError: (error: any) => {
        setRedirecting(false);

        const resolved = resolveFormError(error);
        setFormError(resolved.message);

        // field-level (RHF)
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
      {redirecting && <LoginRedirection title="Redirecting to Login Page" />}
      <div className="flex flex-col gap-2 my-4">
        <Card
          className={`border border-blue-200 bg-blue-50/60 rounded-xl py-3 my-3 ${
            !formError && "mb-4"
          } `}
        >
          <CardContent className="flex flex-col gap-1">
            <div className="text-blue-900 text-sm leading-relaxed">
              <p className="font-semibold mb-1">
                Almost there! Set your password
              </p>

              <p>For your security, please choose a password that includes:</p>

              <ul className="list-disc list-inside mt-1">
                <li>8 or more characters</li>
                <li>An uppercase letter</li>
                <li>A number</li>
                <li>A special character</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* SERVER FORM ERROR */}
        {formError && <FormErrorDisplay message={formError} />}

        {/* FORM ELEMENT */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset>
            <FieldSet>
              <FieldGroup className="gap-4">
                {/* PASSWORD */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="new-password"
                        className="text-[16px] font-medium text-slate-700"
                      >
                        Password
                      </FieldLabel>

                      <LoginFormInputGroup
                        id="new-password"
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

                {/* CONFIRM PASSWORD */}

                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="confirm-password"
                        className="text-[16px] font-medium text-slate-700"
                      >
                        Confirm Password
                      </FieldLabel>

                      <LoginFormInputGroup
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm Your Password"
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
          </fieldset>

          {/* Submit Button */}
          <div className="flex mt-6">
            <LoginFormButton
              btnName={
                setPassword.isPending ? "Setting Password..." : "Set Password"
              }
              variant="primary"
              type="submit"
              disabled={isDisabled}
              classname={cn(
                "w-full h-12 rounded-xl font-semibold shadow-sm hover:shadow-md transition",
                isDisabled && "opacity-60 cursor-not-allowed hover:shadow-sm"
              )}
            />
          </div>
        </form>
      </div>
    </>
  );
}
export default SetPasswordComponent;
