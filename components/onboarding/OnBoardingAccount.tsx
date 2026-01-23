"use client";

import { useCompleteOnBoarding } from "@/app/queries/useCompleteOnBoarding";
import {
  ApiErrorItem,
  ApiErrorPayload,
  ApiValidationErrorItem,
  ApiValidationErrorPayload,
} from "@/lib/interface/APIErrorResponse";
import { selectOnBoardingUserData } from "@/lib/redux/feature/auth/authSelectors";
import { useAppSelector } from "@/lib/redux/hooks";
import {
  OnboardingAccountInformationSchema,
  TOnboardingAccountInformationSchema,
} from "@/lib/validation/zodValidationSchema";
import { ServerFormError } from "@/utils/ServerFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Alert, AlertDescription } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import OnBoardingAddSkills from "./OnBoardingAddSkills";

type OnBoardingAccountProps = {
  nextBtnClick: () => void;
};

const STORAGE_KEY = "onboarding.careerGoals.skills";

function OnBoardingAccount({ nextBtnClick }: OnBoardingAccountProps) {
  // const [skills, setSkills] = useLocalStorageState<string[]>(STORAGE_KEY, []);

  // const addSkill = (skill: string) => {
  //   const next = Array.from(new Set([...(skills ?? []), skill]));
  //   form.setValue("skills", next, { shouldDirty: true, shouldValidate: true });
  // };

  // const removeSkill = (skill: string) => {
  //   setSkills((prev) => prev.filter((s) => s !== skill));
  // };

  // const clearSkills = () => {
  //   setSkills([]);
  // };

  const router = useRouter();

  const [dtoError, setDtoError] = useState<ApiValidationErrorItem[]>([]);
  const [onBoardingError, setOnBoardingError] = useState<ApiErrorItem[]>([]);
  const [serverErrorCode, setServerErrorCode] = useState<string | undefined>();

  const [isRedirecting, setIsRedirecting] = useState(false);

  const form = useForm<TOnboardingAccountInformationSchema>({
    resolver: zodResolver(OnboardingAccountInformationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      organization: "",
      jobTitle: "",
      currentRole: "",
      targetRole: "",
      industry: "",
      careerGoals: "",
      skills: [],
    },
    mode: "onChange",
  });

  const skills = form.watch("skills") ?? [];

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
    const next = current.filter((s) => s !== skill);

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

  const onBoardingUserData = useAppSelector(selectOnBoardingUserData);

  // Watch the value of careerGoals
  const careerGoalsValue = form.watch("careerGoals") || "";
  const minChars = 10;
  const maxChars = 250;

  useEffect(() => {
    if (!onBoardingUserData?.email) return;
    if (form.formState.isDirty) return;

    form.reset({
      firstName: onBoardingUserData.firstName ?? "",
      lastName: onBoardingUserData.lastName ?? "",
      email: onBoardingUserData.email ?? "",
      phoneNumber: "",
      organization: onBoardingUserData.company ?? "",
      jobTitle: "",
      currentRole: "",
      targetRole: "",
      industry: "",
      careerGoals: "",
      skills: skills.length > 0 ? skills : [],
    });
  }, [onBoardingUserData?.email]);

  const { isValid, isSubmitting, isDirty } = form.formState;

  const onBoardingSubmit = useCompleteOnBoarding();

  // For Loading
  const isPending = onBoardingSubmit.isPending;

  // This isBusy used to overcome the issue on loading during repacling to /dashbaord page
  const isBusy = isPending || isRedirecting;

  const onSubmit = (values: TOnboardingAccountInformationSchema) => {
    setDtoError([]);
    setOnBoardingError([]);
    setServerErrorCode(undefined);

    onBoardingSubmit.mutate(values, {
      onSuccess: () => {
        setDtoError([]);
        setOnBoardingError([]);
        setServerErrorCode(undefined);

        setIsRedirecting(true);

        toast.success("Profile setup completed.");
        router.replace("/dashboard");
      },
      onError: (error: any) => {
        const data = error?.response?.data;

        if (!data) {
          toast.error("Something went wrong. Please try again.");
          setDtoError([]);
          setServerErrorCode("BACKEND_SERVER_ERROR");
          return;
        }

        // DTO ERROR FROM SERVER
        if (error?.response?.data || error?.response?.data !== "") {
          const customError = error?.response?.data;

          if (customError.code === "VALIDATION_ERROR") {
            setServerErrorCode(customError.code);
            const validationError = customError as ApiValidationErrorPayload;

            // set field errors properly (with message)
            validationError.items?.forEach((item) => {
              form.setError(item.field as any, {
                type: "server",
                message: item.messages?.[0] ?? "Invalid value",
              });
            });

            setDtoError(validationError.items ?? []);
            toast.error(ServerFormError("VALIDATION_ERROR"));
            return;
          }

          if (
            customError.code === "ONBOARDING_ERROR" ||
            customError.code === "LW_ERROR"
          ) {
            setServerErrorCode(customError.code);

            const customOnBoardingError = customError as ApiErrorPayload;

            customOnBoardingError.items?.forEach((item) => {
              if (item.meta?.field != "" || !item.meta?.field) {
                form.setError(item?.meta?.field as any, {
                  type: "server",
                });
              }
            });

            setOnBoardingError(customOnBoardingError.items ?? []);
            toast.error("Failed to submit the form");
            return;
          }
        }

        toast.error("Something went wrong. Please try again.");
      },
    });
  };

  const hasDtoErrors =
    dtoError.length > 0 && dtoError.some((e) => e.messages?.length > 0);

  const hasOnboardingError = onBoardingError.length > 0;

  // Clear when user edit a field again
  useEffect(() => {
    if (!hasDtoErrors && !hasOnboardingError) return;

    const subscription = form.watch(() => {
      setDtoError([]);
      setOnBoardingError([]);
      setServerErrorCode(undefined);

      // optional: also clear RHF server errors so red borders go away
      form.clearErrors();
    });

    return () => subscription.unsubscribe();
  }, [hasDtoErrors, hasOnboardingError, form]);

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isBusy} className={isBusy ? "opacity-70" : ""}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Set Up Your Profile</FieldLegend>

              {hasDtoErrors && (
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertDescription>
                    <div className="font-medium">
                      {ServerFormError(serverErrorCode)} {/* <-- title text */}
                    </div>

                    <ul className="flex flex-col gap-1 text-xs text-red-500">
                      {dtoError.flatMap((item, idx) =>
                        (item.messages ?? []).map((msg, j) => (
                          <li key={`${idx}-${j}`} className="flex gap-1">
                            <span>*</span>
                            <p className="line-clamp-none">{msg}</p>
                          </li>
                        )),
                      )}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {hasOnboardingError && (
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertDescription>
                    <div className="font-medium">
                      {ServerFormError(serverErrorCode)} {/* <-- title text */}
                    </div>

                    <ul className="flex flex-col gap-1 text-xs text-red-500">
                      {onBoardingError.flatMap((item, idx) => (
                        <li key={`${idx}}`} className="flex gap-1">
                          <span>*</span>
                          <p className="line-clamp-none">
                            {ServerFormError(item.code)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <FieldGroup className="gap-3">
                <div className="grid md:grid-cols-2 gap-2 md:gap-4">
                  <Controller
                    name="firstName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field className="gap-1">
                        <FieldLabel className="mb-1 gap-1" htmlFor="">
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
                        <FieldLabel className="mb-1 gap-1" htmlFor="">
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
                </div>
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
                        className="cursor-not-allowed bg-muted text-muted-foreground border-muted"
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
                        className="cursor-not-allowed bg-muted text-muted-foreground border-muted"
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

                <div className="grid md:grid-cols-2 gap-2 md:gap-4">
                  <Controller
                    name="currentRole"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field className="gap-1">
                        <FieldLabel
                          className="mb-1 gap-1"
                          htmlFor="current-role"
                        >
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
                        <FieldLabel
                          className="mb-1 gap-1"
                          htmlFor="target-role"
                        >
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
                </div>

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

                      {/* {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )} */}
                    </Field>
                  )}
                />

                {/* <Field>
                <FieldLabel>Skills You Want to Build</FieldLabel>

                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(item)}
                          className="ml-2 inline-flex items-center opacity-70 hover:opacity-100"
                          aria-label={`Remove ${item}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="mt-3 flex items-center gap-2">
                  <OnBoardingAddSkills skills={skills} onAdd={addSkill} />

                  {skills.length > 0 && (
                    <Button type="button" variant="ghost" onClick={clearSkills}>
                      Clear
                    </Button>
                  )}
                </div>
              </Field> */}

                <Controller
                  name="skills"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="gap-1">
                      <FieldLabel className="gap-1 mb-1">
                        Skills You Want to Build{" "}
                        <span className="text-red-500">*</span>
                      </FieldLabel>

                      {/* Display badges */}
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
                                className="ml-2 inline-flex items-center opacity-70 hover:opacity-100"
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
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </fieldset>

        <div className="flex mt-4 items-end justify-end gap-3">
          <Button variant="destructive" type="button" disabled={isPending}>
            Logout
          </Button>
          <Button disabled={!isDirty || !isValid || isBusy} type="submit">
            {isBusy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isRedirecting
              ? "Redirecting..."
              : isPending
                ? "Saving..."
                : "Complete"}
          </Button>
        </div>
      </form>
    </div>
  );
}
export default OnBoardingAccount;
