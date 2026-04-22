/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUpdateProfileCareer } from "@/app/queries/useUpdateProfileCareer";
import { IUserCareerAspiration } from "@/lib/interface/profile/user-profile.interface";
import {
  TUpdateUserProfileCareerSchema,
  UpdateUserProfileCareerSchema,
} from "@/lib/validation/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import OnBoardingAddSkills from "../onboarding/OnBoardingAddSkills";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import ProfileTabLayout from "./ProfileTabLayout";

function ProfileCareer({
  userEmail,
  title,
  data,
}: {
  userEmail: string;
  title: string;
  data: IUserCareerAspiration;
}) {
  const originalValues = useMemo<TUpdateUserProfileCareerSchema>(() => {
    const skills: string[] = Array.isArray(data?.skills) ? data.skills : [];

    return {
      currentRole: data?.currentRole ?? "",
      targetRole: data?.targetRole ?? "",
      industry: data?.industry ?? "",
      careerGoals: data?.careerGoals ?? "",
      skills,
      isAlumni: data?.isAlumni ?? false,
    };
  }, [
    data?.currentRole,
    data?.targetRole,
    data?.industry,
    data?.careerGoals,
    data?.skills,
    data?.isAlumni,
  ]);

  const form = useForm<TUpdateUserProfileCareerSchema>({
    resolver: zodResolver(UpdateUserProfileCareerSchema),
    defaultValues: originalValues,
    mode: "onChange",
  });

  useEffect(() => {
    form.reset(originalValues);
  }, [originalValues, form]);

  const { isDirty, isValid } = form.formState;

  const addSkill = (skill: string) => {
    const cleaned = (skill ?? "").trim();
    if (!cleaned) return;

    const current = form.getValues("skills") ?? [];
    const next = Array.from(new Set([...current, cleaned]));

    form.setValue("skills", next, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const removeSkill = (skill: string) => {
    const current = form.getValues("skills") ?? [];
    const next = current.filter((s: string) => s !== skill);

    form.setValue("skills", next, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const clearSkills = () => {
    form.setValue("skills", [], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const careerGoalsValue = form.watch("careerGoals") || "";
  const maxChars = 250;

  const onReset = () => {
    form.reset(originalValues);
  };

  const updateCareer = useUpdateProfileCareer(userEmail);

  const onSubmit = (values: TUpdateUserProfileCareerSchema) => {
    updateCareer.mutate(values, {
      onSuccess: (response: any) => {
        toast.success("Career profile updated successfully.");

        const updatedUser = response?.data;
        const updatedProfile = updatedUser?.profile ?? updatedUser;

        form.reset({
          currentRole: updatedProfile?.currentRole ?? values.currentRole,
          targetRole: updatedProfile?.targetRole ?? values.targetRole,
          industry: updatedProfile?.industry ?? values.industry,
          careerGoals: updatedProfile?.careerGoals ?? values.careerGoals,
          skills: updatedProfile?.skills ?? values.skills,
          isAlumni: updatedProfile?.isAlumni ?? values.isAlumni,
        });
      },
      onError: () => {
        toast.error(
          "Failed to update profile. Please contact technical administrator.",
        );
      },
    });
  };

  const isSubmitting = updateCareer.isPending;

  return (
    <ProfileTabLayout title={title}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isSubmitting}>
          <FieldGroup>
            <Controller
              name="currentRole"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel className="mb-1 gap-1" htmlFor="current-role">
                    Current Role <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="current-role"
                    placeholder="e.g. Junior Developer"
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
              name="targetRole"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel className="mb-1 gap-1" htmlFor="target-role">
                    Target Role <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="target-role"
                    placeholder="e.g. Senior Engineer"
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
              name="industry"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel className="mb-1 gap-1" htmlFor="industry">
                    Industry <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="industry"
                    placeholder="e.g. Fintech, Healthcare, E-commerce"
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
              name="careerGoals"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel className="mb-1 gap-1" htmlFor="career-goals">
                    Career Goals <span className="text-red-500">*</span>
                  </FieldLabel>

                  <Textarea
                    id="career-goals"
                    rows={5}
                    placeholder="Describe your career goals..."
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />

                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}

                    <span>
                      {careerGoalsValue.length} / {maxChars} characters
                    </span>
                  </div>
                </Field>
              )}
            />

            <Controller
              name="skills"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel className="mb-1 gap-1">
                    Skills You Want to Build{" "}
                    <span className="text-red-500">*</span>
                  </FieldLabel>

                  {field.value && field.value.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {field.value.map((item: string) => (
                        <Badge
                          key={item}
                          variant="secondary"
                          className="px-3 py-1"
                        >
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() => removeSkill(item)}
                            className="ml-2 inline-flex cursor-pointer items-center opacity-70 hover:opacity-100"
                            aria-label={`Remove ${item}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 flex items-center gap-2">
                    <OnBoardingAddSkills
                      skills={field.value || []}
                      onAdd={addSkill}
                    />

                    {field.value && field.value.length > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={clearSkills}
                      >
                        Clear
                      </Button>
                    )}
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="isAlumni"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-2">
                  <div
                    className={`group relative overflow-hidden rounded-2xl border bg-background px-5 py-4 shadow-sm transition-all duration-200 ${
                      fieldState.invalid
                        ? "ring-1 ring-destructive/20 border-destructive/60"
                        : "border-border/80 hover:border-primary/30 hover:shadow-md"
                    }`}
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    <div className="flex items-center justify-between gap-5">
                      <div className="min-w-0 pr-2">
                        <FieldLabel className="mb-1 flex items-center gap-1 text-[15px] font-semibold leading-none text-foreground">
                          Are you a UTP Alumni?{" "}
                          <span className="text-red-500">*</span>
                        </FieldLabel>

                        <p className="text-sm leading-relaxed text-muted-foreground">
                          Turn this on if you graduated from UTP
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-4">
                        <span
                          className={`inline-flex min-w-[52px] justify-center rounded-full border px-3 py-1.5 text-sm font-semibold transition-all duration-200 ${
                            field.value
                              ? "border-primary/20 bg-primary/10 text-primary shadow-sm"
                              : "border-border bg-muted/50 text-muted-foreground"
                          }`}
                        >
                          {field.value ? "Yes" : "No"}
                        </span>

                        <div className="flex items-center justify-center rounded-full px-2 py-1">
                          <Switch
                            size="default"
                            checked={Boolean(field.value)}
                            onCheckedChange={field.onChange}
                            aria-label="Are you a UTP Alumni?"
                            className="scale-125 data-[state=unchecked]:bg-muted-foreground/30"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

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

export default ProfileCareer;
