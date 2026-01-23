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

function FirstTimeLoginComponent() {
  // API ERROR
  const [error, setError] = useState<AxiosError<ApiErrorPayload> | null>(null);

  // Form Error
  const [formError, setFormError] = useState<string | null | undefined>(null);

  // Loading Redirection
  const [redirecting, setRedirecting] = useState(false);

  const router = useRouter();

  const searchParams = useSearchParams();

  // Normalize only (no validation here; zod will handle it)
  const emailParam = useMemo(() => {
    return (searchParams.get("email") ?? "").trim();
  }, [searchParams]);

  // React Form Integration
  const form = useForm({
    resolver: zodResolver(firstTimeLoginEmailSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const email = form.watch("email");

  // ✅ If email exists in query param, append into RHF input value
  useEffect(() => {
    if (!emailParam) return;

    const current = form.getValues("email");
    const userAlreadyTyped = !!current && current !== emailParam;

    if (userAlreadyTyped) return;

    // inject query param into the field
    form.setValue("email", emailParam, {
      shouldValidate: true, // ✅ validate immediately
      shouldDirty: false, // ✅ optional: don't mark as user-typed
      shouldTouch: false,
    });

    // Optional: validate immediately so error shows if param is invalid
    // void form.trigger("email");
  }, [emailParam, form]);

  useEffect(() => {
    if (!formError) return;

    setFormError(null);
  }, [email]);

  // First Time Login UseMutation
  const firstTimeLogin = useFirstLogin();

  const { isValid, isSubmitting } = form.formState;
  const isDisabled = !isValid || isSubmitting || firstTimeLogin.isPending;

  // Form Submission Handler
  const onSubmit = (data: TFirstTimeLoginEmailSchema) => {
    setError(null);
    firstTimeLogin.mutate(data, {
      onSuccess: (data: any) => {
        setError(null);
        setRedirecting(true);

        router.push(
          `/first-login/set-password?email=${encodeURIComponent(
            data.data.email
          )}&token=${data.data.token}`
        );
      },
      onError: (error: any) => {
        setRedirecting(false);

        const resolved = resolveFormError(error);

        if (resolved.rawCode === "USER_EXIST_ACTIVE") {
          SetSessionStorageUserLogin(form.getValues("email"));

          toast.success(
            "Your account already activated! Please login using your email and password"
          );
          router.replace("/login");
          return;
        }

        setFormError(resolved.message);

        if (resolved.fieldErrors) {
          // field-level (RHF)
          Object.entries(resolved.fieldErrors).forEach(([field, message]) => {
            form.setError(field as any, { type: "server", message });
          });

          const firstField = Object.keys(resolved.fieldErrors)[0];
          if (firstField) form.setFocus(firstField as any);
        }

        toast.error("Failed to validate your email");
      },
    });
  };

  return (
    <>
      {redirecting && <LoginRedirection title="Validating with Learnworlds" />}
      <div className="flex flex-col gap-4 my-4">
        <Card className="border border-blue-200 bg-blue-50/60 rounded-xl py-3 my-3">
          <CardContent className="flex flex-col gap-1">
            <p className="text-blue-900 text-sm leading-relaxed">
              <span className="font-semibold">Verify your email</span> to
              continue. We’ll check your email and send you to the next step to
              create your password.
            </p>
            <p className="text-blue-800/80 text-xs leading-relaxed">
              Tip: Use the same (company/personal) email you used to register in
              CAPE.
            </p>
          </CardContent>
        </Card>

        {/* SERVER FORM ERROR */}
        {formError && <FormErrorDisplay message={formError} />}

        {/* FORM ELEMENT */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={firstTimeLogin.isPending}>
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
          </fieldset>

          {/* Submit Button */}
          <div className="flex mt-6">
            <LoginFormButton
              btnName={
                firstTimeLogin.isPending ? "Validating..." : "Validate Email"
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
export default FirstTimeLoginComponent;
