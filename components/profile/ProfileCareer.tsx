/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IUserCareerAspiration } from "@/lib/interface/profile/user-profile.interface";
import {
  TUpdateUserProfileCareerSchema,
  UpdateUserProfileCareerSchema,
} from "@/lib/validation/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import OnBoardingAddSkills from "../onboarding/OnBoardingAddSkills";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ProfileTabLayout from "./ProfileTabLayout";

function ProfileCareer({
  title,
  data,
}: {
  title: string;
  data: IUserCareerAspiration;
}) {
  // ✅ 1) Build "original values" snapshot from API data
  const originalValues = useMemo<TUpdateUserProfileCareerSchema>(() => {
    const skills: string[] = Array.isArray(data?.skills) ? data.skills : [];

    return {
      currentRole: data?.currentRole ?? "",
      targetRole: data?.targetRole ?? "",
      industry: data?.industry ?? "",
      careerGoals: data?.careerGoals ?? "",
      skills,
    };
  }, [data]);

  const form = useForm<TUpdateUserProfileCareerSchema>({
    resolver: zodResolver(UpdateUserProfileCareerSchema),
    defaultValues: originalValues,
    mode: "onChange",
  });

  // ✅ 2) When API data changes, update RHF baseline (so isDirty resets)
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
    const next = current.filter((s: any) => s !== skill);
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

  // Watch the value of careerGoals
  const careerGoalsValue = form.watch("careerGoals") || "";
  const maxChars = 250;

  // ✅ 3) Reset back to original API data
  const onReset = () => {
    form.reset(originalValues);
  };

  const onSubmit = (values: TUpdateUserProfileCareerSchema) => {
    // Handle form submission logic here
    console.log("Form submitted with values:", values);
  };

  return (
    <ProfileTabLayout title={title}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset>
          <FieldGroup>
            {/* CURRENT ROLE */}
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

            {/* TARGET ROLE */}
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
                    // defaultValue={targetRole}
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* INDUSTRY */}
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
                    // defaultValue={industry}
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* CAREER GOALS */}
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
                    // defaultValue={careerGoals}
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />

                  <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                    {/* Show error if invalid */}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}

                    {/* Show live min/max info */}
                    <span>
                      {careerGoalsValue.length} / {maxChars} characters
                    </span>
                  </div>
                </Field>
              )}
            />

            {/* SKILLS */}
            <Controller
              name="skills"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel className="gap-1 mb-1">
                    Skills You Want to Build{" "}
                    <span className="text-red-500">*</span>
                  </FieldLabel>

                  {field.value && field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
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
                            className="ml-2 inline-flex items-center cursor-pointer opacity-70 hover:opacity-100"
                            aria-label={`Remove ${item}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 flex items-center gap-2">
                    {/* Custom component to add skill */}
                    <OnBoardingAddSkills
                      skills={field.value || []}
                      onAdd={addSkill}
                    />

                    <Button type="button" variant="ghost" onClick={clearSkills}>
                      Clear
                    </Button>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </fieldset>

        <div className="flex mt-6 items-start justify-start gap-2">
          <Button
            className="cursor-pointer"
            variant="destructive"
            type="button"
            disabled={!isDirty}
            onClick={onReset}
          >
            Reset
          </Button>
          {/* <Button disabled={!isDirty || !isValid || isBusy} type="submit"> */}
          <Button
            disabled={!isDirty || !isValid}
            className="cursor-pointer"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </ProfileTabLayout>
  );
}
export default ProfileCareer;
