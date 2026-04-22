/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUpdateProfileAccount } from "@/app/queries/useUpdateProfileAccount";
import { IUserAccount } from "@/lib/interface/profile/user-profile.interface";
import {
  TUpdateUserProfileAccountSchema,
  UpdateUserProfileAccountSchema,
} from "@/lib/validation/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import ProfileTabLayout from "./ProfileTabLayout";

function ProfileAccount({
  userEmail,
  title,
  data,
}: {
  userEmail: string;
  title: string;
  data: IUserAccount;
}) {
  const firstName = (data as any)?.firstName ?? (data as any)?.firstNam ?? "";
  const lastName = data?.lastName ?? "";
  const email = data?.email ?? "";
  const organization =
    (data as any)?.organization ?? (data as any)?.company ?? "";
  const phoneNumber = (data as any)?.phoneNumber ?? (data as any)?.phone ?? "";
  const jobTitle = (data as any)?.jobTitle ?? "";

  const originalValues = useMemo<TUpdateUserProfileAccountSchema>(() => {
    return {
      firstName,
      lastName,
      email,
      organization,
      phoneNumber,
      jobTitle,
    };
  }, [firstName, lastName, email, organization, phoneNumber, jobTitle]);

  const form = useForm<TUpdateUserProfileAccountSchema>({
    resolver: zodResolver(UpdateUserProfileAccountSchema),
    defaultValues: originalValues,
    mode: "onChange",
  });

  useEffect(() => {
    form.reset(originalValues);
  }, [originalValues, form]);

  const { isDirty, isValid } = form.formState;

  const onReset = () => {
    form.reset(originalValues);
  };

  const updateAccount = useUpdateProfileAccount(userEmail);

  const onSubmit = (values: TUpdateUserProfileAccountSchema) => {
    updateAccount.mutate(values, {
      onSuccess: (response: any) => {
        toast.success("Profile updated successfully.");

        const updatedUser = response?.data?.userData || response?.data;

        form.reset({
          firstName: updatedUser?.firstName ?? values.firstName,
          lastName: updatedUser?.lastName ?? values.lastName,
          email: updatedUser?.email ?? values.email,
          organization:
            updatedUser?.profile?.organization ??
            updatedUser?.organization ??
            values.organization,
          phoneNumber:
            updatedUser?.profile?.phoneNumber ??
            updatedUser?.phoneNumber ??
            values.phoneNumber,
          jobTitle:
            updatedUser?.profile?.jobTitle ??
            updatedUser?.jobTitle ??
            values.jobTitle,
        });
      },
      onError: () => {
        toast.error(
          "Failed to update profile. Please contact technical administrator.",
        );
      },
    });
  };

  const isSubmitting = updateAccount.isPending;

  return (
    <ProfileTabLayout title={title}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isSubmitting}>
          <FieldGroup>
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel className="mb-1 gap-1">
                    First Name <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="first-name"
                    placeholder="Your First Name"
                    type="text"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel className="mb-1 gap-1">
                    Last Name <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="last-name"
                    placeholder="Your Last Name"
                    type="text"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel className="mb-1 gap-1" htmlFor="your-email">
                    Email <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="your-email"
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
                    readOnly
                    {...field}
                    className="cursor-not-allowed border-muted bg-muted text-muted-foreground"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="organization"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel
                    className="mb-1 gap-1"
                    htmlFor="your-organization"
                  >
                    Organization <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="your-organization"
                    placeholder="Your Company"
                    type="text"
                    readOnly
                    {...field}
                    className="cursor-not-allowed border-muted bg-muted text-muted-foreground"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel className="mb-1 gap-1" htmlFor="phone-number">
                    Phone Number <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="phone-number"
                    placeholder="+60129999999"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    className="tabular-nums"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="jobTitle"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel className="mb-1 gap-1" htmlFor="job-title">
                    Job Title <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="job-title"
                    placeholder="e.g. Software Engineer"
                    type="text"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </fieldset>

        <div className="mt-6 flex items-start justify-start gap-2">
          <Button
            className="cursor-pointer"
            variant="destructive"
            type="button"
            disabled={!isDirty || isSubmitting}
            onClick={onReset}
          >
            Reset
          </Button>

          <Button
            disabled={!isDirty || !isValid || isSubmitting}
            className="cursor-pointer"
            type="submit"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </ProfileTabLayout>
  );
}

export default ProfileAccount;
