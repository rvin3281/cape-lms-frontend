"use client";

import { IUserCareerAspiration } from "@/lib/interface/profile/user-profile.interface";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
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
  const currentRole = data?.currentRole ?? "";
  const targetRole = data?.targetRole ?? "";
  const industry = data?.industry ?? "";
  const careerGoals = data?.careerGoals ?? "";
  const skills = data?.skills ?? "";

  return (
    <ProfileTabLayout title={title}>
      <form>
        <fieldset>
          <FieldGroup>
            <Field className="gap-1">
              <FieldLabel className="mb-1 gap-1" htmlFor="current-role">
                Current Role <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                id="current-role"
                placeholder="e.g. Junior Developer"
                type="text"
                defaultValue={currentRole}
                // {...field}
                // aria-invalid={fieldState.invalid}
              />
              {/* {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )} */}
            </Field>

            <Field className="gap-1">
              <FieldLabel className="mb-1 gap-1" htmlFor="target-role">
                Target Role <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                id="target-role"
                placeholder="e.g. Senior Engineer"
                type="text"
                defaultValue={targetRole}
                // {...field}
                // aria-invalid={fieldState.invalid}
              />
              {/* {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )} */}
            </Field>

            <Field className="gap-1">
              <FieldLabel className="mb-1 gap-1" htmlFor="industry">
                Industry <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                id="industry"
                placeholder="e.g. Fintech, Healthcare, E-commerce"
                type="text"
                defaultValue={industry}
                // {...field}
                // aria-invalid={fieldState.invalid}
              />
              {/* {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )} */}
            </Field>

            <Field className="gap-1">
              <FieldLabel className="mb-1 gap-1" htmlFor="career-goals">
                Career Goals <span className="text-red-500">*</span>
              </FieldLabel>

              <Textarea
                id="career-goals"
                rows={5}
                placeholder="Describe your career goals..."
                defaultValue={careerGoals}
                // {...field}
                // aria-invalid={fieldState.invalid}
              />

              <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                {/* Show error if invalid */}
                {/* {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )} */}

                {/* Show live min/max info */}
                <span>
                  {/* {careerGoalsValue.length} / {maxChars} characters */}
                </span>
              </div>
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
export default ProfileCareer;
