"use client";

import { IUserAccount } from "@/lib/interface/profile/user-profile.interface";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import ProfileTabLayout from "./ProfileTabLayout";

function ProfileAccount({
  title,
  data,
}: {
  title: string;
  data: IUserAccount;
}) {
  // ✅ safe mapping + fallbacks (presentation-ready)
  const firstName = (data as any)?.firstName ?? (data as any)?.firstNam ?? ""; // handles backend typo
  const lastName = data?.lastName ?? "";
  const email = data?.email ?? "";
  const organization =
    (data as any)?.organization ?? (data as any)?.company ?? "";
  const phoneNumber = (data as any)?.phoneNumber ?? (data as any)?.phone ?? "";
  const jobTitle = (data as any)?.jobTitle ?? "";

  return (
    <ProfileTabLayout title={title}>
      <form>
        <fieldset>
          <FieldGroup>
            <Field className="gap-1">
              <FieldLabel className="mb-1 gap-1" htmlFor="">
                First Name <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                id="first-name"
                placeholder="Your First Name"
                type="text"
                defaultValue={firstName}
                // {...field}
                // aria-invalid={fieldState.invalid}
              />
              {/* {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )} */}
            </Field>

            <Field className="gap-1">
              <FieldLabel className="mb-1 gap-1" htmlFor="">
                Last Name <span className="text-red-500">*</span>
              </FieldLabel>

              <Input
                id="last-name"
                placeholder="Your Last Name"
                type="text"
                defaultValue={lastName}
                // {...field}
                // aria-invalid={fieldState.invalid}
              />
              {/* {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )} */}
            </Field>

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
                value={email}
                // {...field}
                className="cursor-not-allowed bg-muted text-muted-foreground border-muted"
                // aria-invalid={fieldState.invalid}
              />
              {/* {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )} */}
            </Field>

            <Field className="gap-1">
              <FieldLabel className="mb-1 gap-1" htmlFor="your-organization">
                Organization <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                id="your-organization"
                placeholder="Your Company"
                type="text"
                readOnly
                value={organization}
                // {...field}
                className="cursor-not-allowed bg-muted text-muted-foreground border-muted"
                // aria-invalid={fieldState.invalid}
              />
              {/* {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )} */}
            </Field>

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
                // {...field}
                // aria-invalid={fieldState.invalid}
                className="tabular-nums"
                defaultValue={phoneNumber}
              />

              {/* {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                          )} */}
            </Field>

            <Field className="gap-1">
              <FieldLabel className="mb-1 gap-1" htmlFor="job-title">
                Job Title <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                id="job-title"
                placeholder="e.g. Software Engineer"
                type="text"
                // {...field}
                // aria-invalid={fieldState.invalid}
                defaultValue={jobTitle}
              />
              {/* {fieldState.invalid && (
                                                                <FieldError errors={[fieldState.error]} />
                                                              )} */}
            </Field>
          </FieldGroup>
        </fieldset>

        <div className="flex mt-6 items-start justify-start gap-2">
          <Button variant="destructive" type="button">
            Reset
          </Button>
          {/* <Button disabled={!isDirty || !isValid || isBusy} type="submit"> */}
          <Button type="submit">Save</Button>
        </div>
      </form>
    </ProfileTabLayout>
  );
}
export default ProfileAccount;
