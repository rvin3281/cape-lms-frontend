/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetAllFacilitatorsForSelect } from "@/app/queries/useGetAllFacilitatorsForSelect";
import { useUploadProgramOnboarding } from "@/app/queries/useUploadProgramOnboarding";
import FormAlertError from "@/components/error-ui/FormAlertError";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  clearDashboardLoading,
  setDashboardLoading,
} from "@/lib/redux/feature/dashboardLoader/dashboardLoaderSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  ProgramOnboardingSchema,
  TProgramOnboardingFormInput,
  TProgramOnboardingSchema,
} from "@/lib/validation/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

function ProgramOnboardingForm() {
  const [open, setOpen] = useState(false);
  const [fileKey, setFileKey] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorData, setErrorData] = useState<any>();
  const [errorTitle, setErrorTitle] = useState("");

  const dispatch = useAppDispatch();

  const router = useRouter();

  const showErrorAlert = ({
    title,
    message,
    data,
  }: {
    title: string;
    message: string;
    data?: any;
  }) => {
    setErrorDisplay(true);
    setErrorTitle(title);
    setErrorMessage(message);
    setErrorData(data);
  };

  const {
    data: facilitatorResponse,
    isLoading: isFacilitatorLoading,
    isError: isFacilitatorError,
  } = useGetAllFacilitatorsForSelect({});

  const facilitatorOptions =
    facilitatorResponse?.data?.map((facilitator: any) => ({
      label: facilitator.facilitatorName,
      value: facilitator.facilitatorId,
    })) ?? [];

  const hasFacilitators = facilitatorOptions.length > 0;

  const form = useForm<
    TProgramOnboardingFormInput,
    any,
    TProgramOnboardingSchema
  >({
    resolver: zodResolver(ProgramOnboardingSchema),
    defaultValues: {
      programName: "",
      programCohort: "",
      programDate: undefined as unknown as Date,
      learnerFile: undefined as unknown as File,
      totalFacilitators: 0,
      facilitators: [],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const resetLearnerFile = () => {
    form.setValue("learnerFile", undefined as unknown as File, {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetFormState = () => {
    form.reset();
    replace([]);
    resetLearnerFile();
    setOpen(false);
    setFileKey((k) => k + 1);
  };

  const clearErrorAlert = () => {
    setErrorDisplay(false);
    setErrorTitle("");
    setErrorMessage("");
    setErrorData(undefined);
  };

  const { fields, replace } = useFieldArray({
    control: form.control,
    name: "facilitators",
  });

  const userOnboardAPI = useUploadProgramOnboarding();

  const { isDirty, isValid } = form.formState;
  const isPending = userOnboardAPI.isPending;

  const onSubmit = (values: TProgramOnboardingSchema) => {
    dispatch(setDashboardLoading());

    userOnboardAPI.mutate(values, {
      onSuccess: (data: any) => {
        console.log("[ProgramOnboarding] Upload success - raw response:", data);

        try {
          clearErrorAlert();

          toast.success("Program onboarding completed successfully!");

          console.log(
            "[ProgramOnboarding] Resetting form after successful upload.",
          );
          resetFormState();

          router.push("/admin/classroom-programs");
        } catch (unexpectedError) {
          console.log(
            "[ProgramOnboarding] Exception occurred while handling onSuccess:",
            unexpectedError,
          );

          toast.success("Program onboarding completed successfully!");

          resetFormState();
        }
      },
      onError: (e: any) => {
        console.log("[ProgramOnboarding] Upload failed - raw error:", e);

        try {
          const response = e?.response;
          const errorData = response?.data;
          const errorCode = errorData?.code;

          if (!response) {
            console.log(
              "[ProgramOnboarding] No response received. Possible network/server/CORS issue.",
            );

            showErrorAlert({
              title: "Connection Error",
              message:
                "We could not connect to the server. Please check your internet connection or try again in a moment.",
            });

            return;
          }

          if (!errorData) {
            console.log(
              "[ProgramOnboarding] Response received but no error data was returned.",
              response,
            );

            showErrorAlert({
              title: "Unexpected System Error",
              message:
                "We were unable to process your request due to an unexpected technical issue. Please try again later or contact support if the issue continues.",
            });

            return;
          }

          if (!errorCode) {
            console.log(
              "[ProgramOnboarding] Error data received but no error code found.",
              errorData,
            );

            showErrorAlert({
              title: "Unexpected System Error",
              message:
                errorData?.message ||
                "An unexpected technical issue occurred while processing the uploaded file. Please try again later.",
            });

            return;
          }

          console.log(
            "[ProgramOnboarding] Handled backend error code:",
            errorCode,
          );
          console.log("[ProgramOnboarding] Backend error payload:", errorData);

          switch (errorCode) {
            case "ROW_ERROR_FOUND":
              showErrorAlert({
                title: "Errors Found in Uploaded Excel File",
                message:
                  "We found errors in the uploaded Excel file. Please review the highlighted rows and correct the issues before uploading the file again.",
                data: errorData.data,
              });
              break;

            case "DUPLICATE_EMAIL_FOUND_ON_THE_EXCEL":
              showErrorAlert({
                title: "Errors Found in Uploaded Excel File",
                message:
                  "We found duplicate learner email entries in the uploaded Excel file. Please review the highlighted rows, remove the duplicate email records, and upload the corrected file again.",
                data: errorData.data,
              });
              break;

            case "LEARNER_EMAIL_EXIST":
              showErrorAlert({
                title: "Existing Learner Found in Excel File",
                message:
                  "One or more learners in the uploaded Excel file already exist in the system. Please remove the existing learner(s) from the file and upload the corrected Excel file again.",
                data: errorData.data,
              });
              break;

            case "NO_ROLE_FOUND":
              showErrorAlert({
                title: "System Configuration Error",
                message:
                  "We were unable to process the uploaded file due to a system configuration issue. Please contact the system administrator or support team for assistance.",
              });
              break;

            case "INVALID_EXCEL_TEMPLATE":
              showErrorAlert({
                title: "Invalid Excel Template",
                message:
                  "The uploaded file does not match the required Excel template. Please download and use the latest template provided by the system, fill in the required data, and upload it again.",
              });
              break;

            default:
              console.error(
                "[ProgramOnboarding] Unhandled backend error code encountered:",
                errorCode,
              );

              showErrorAlert({
                title: "Unexpected System Error",
                message:
                  errorData?.message ||
                  "An unexpected error occurred while processing the uploaded file. Please try again later or contact support if the issue continues.",
                data: errorData?.data,
              });
              break;
          }
        } catch (unexpectedError) {
          console.log(
            "[ProgramOnboarding] Exception occurred while handling onError:",
            unexpectedError,
          );

          showErrorAlert({
            title: "Unexpected System Error",
            message:
              "An unexpected technical issue occurred while handling the error response. Please try again later.",
          });
        } finally {
          console.log("[ProgramOnboarding] Resetting learner file and form.");
          resetLearnerFile();
          form.reset();
          replace([]);
          setOpen(false);
        }
      },
      onSettled: () => {
        dispatch(clearDashboardLoading());
      },
    });
  };

  return (
    <div className="relative max-w-[500px]">
      {errorDisplay && (
        <FormAlertError
          page="PROGRAM_ONBOARDING"
          errors={errorData}
          title={errorTitle}
          message={errorMessage}
        />
      )}

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={userOnboardAPI.isPending}>
          <FieldGroup>
            <Controller
              name="programName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel className="mb-1 gap-1">
                    Program Name <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="programName"
                    placeholder="Program Name"
                    type="text"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error?.message ? (
                    <p className="text-xs text-red-500">
                      {fieldState.error.message}
                    </p>
                  ) : null}
                </Field>
              )}
            />

            <Controller
              name="programDate"
              control={form.control}
              render={({ field, fieldState }) => {
                const selectedDate = field.value;

                return (
                  <Field className="gap-1">
                    <FieldLabel className="mb-1 gap-1" htmlFor="programDate">
                      Program Date <span className="text-red-500">*</span>
                    </FieldLabel>

                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          id="programDate"
                          className="justify-start font-normal"
                          aria-invalid={fieldState.invalid}
                        >
                          {selectedDate ? (
                            format(selectedDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(d) => {
                            field.onChange(d);
                            field.onBlur();
                            setOpen(false);
                          }}
                          defaultMonth={selectedDate ?? undefined}
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>

                    {fieldState.error?.message ? (
                      <p className="text-xs text-red-500">
                        {fieldState.error.message}
                      </p>
                    ) : null}
                  </Field>
                );
              }}
            />

            <Controller
              name="programCohort"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel className="mb-1 gap-1">
                    Program Cohort <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="cohort"
                    placeholder="Cohort"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.error?.message ? (
                    <p className="text-xs text-red-500">
                      {fieldState.error.message}
                    </p>
                  ) : null}
                </Field>
              )}
            />

            <Controller
              name="learnerFile"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel className="mb-1 gap-1" htmlFor="learner-file">
                    Upload Learner List (Excel)
                    <span className="text-red-500">*</span>
                  </FieldLabel>

                  <Input
                    ref={fileInputRef}
                    key={fileKey}
                    id="learner-file"
                    type="file"
                    accept=".xlsx,.xls"
                    className="h-[40px] cursor-pointer file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-muted file:px-4 file:text-sm file:font-medium hover:file:bg-muted/80"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? undefined;
                      field.onChange(file);
                      field.onBlur();
                    }}
                  />

                  <p className="text-xs text-muted-foreground">
                    Upload the fixed Excel template (.xlsx). Max 10MB.
                  </p>

                  {fieldState.error?.message ? (
                    <p className="text-xs text-red-500">
                      {fieldState.error.message}
                    </p>
                  ) : null}
                </Field>
              )}
            />

            <Controller
              name="totalFacilitators"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel className="mb-1 gap-1">
                    Total Facilitators <span className="text-red-500">*</span>
                  </FieldLabel>

                  <Select
                    value={field.value ? String(field.value) : ""}
                    disabled={
                      userOnboardAPI.isPending ||
                      isFacilitatorLoading ||
                      isFacilitatorError ||
                      !hasFacilitators
                    }
                    onValueChange={(value) => {
                      const count = Number(value);
                      field.onChange(count);

                      replace(
                        Array.from({ length: count }, () => ({
                          facilitatorId: "",
                        })),
                      );
                    }}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue
                        placeholder={
                          isFacilitatorLoading
                            ? "Loading facilitators..."
                            : isFacilitatorError
                              ? "Failed to load facilitators"
                              : !hasFacilitators
                                ? "No Facilitator Found"
                                : "Select total facilitators"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {isFacilitatorLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading facilitators...
                        </SelectItem>
                      ) : isFacilitatorError ? (
                        <SelectItem value="error" disabled>
                          Failed to load facilitators
                        </SelectItem>
                      ) : !hasFacilitators ? (
                        <SelectItem value="empty" disabled>
                          No Facilitator Found
                        </SelectItem>
                      ) : (
                        <>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>

                  {fieldState.error?.message ? (
                    <p className="text-xs text-red-500">
                      {fieldState.error.message}
                    </p>
                  ) : null}
                </Field>
              )}
            />

            {fields.map((item, index) => (
              <Controller
                key={item.id}
                name={`facilitators.${index}.facilitatorId`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-1">
                    <FieldLabel className="mb-1 gap-1">
                      Facilitator {index + 1}
                      <span className="text-red-500">*</span>
                    </FieldLabel>

                    <Select
                      value={field.value ?? ""}
                      onValueChange={async (value) => {
                        field.onChange(value);
                        field.onBlur();

                        const facilitatorFieldNames = fields.map(
                          (_, i) => `facilitators.${i}.facilitatorId` as const,
                        );

                        await form.trigger(facilitatorFieldNames);
                      }}
                    >
                      <SelectTrigger aria-invalid={fieldState.invalid}>
                        <SelectValue
                          placeholder={`Select facilitator ${index + 1}`}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {isFacilitatorLoading ? (
                          <SelectItem value="loading" disabled>
                            Loading facilitators...
                          </SelectItem>
                        ) : isFacilitatorError ? (
                          <SelectItem value="error" disabled>
                            Failed to load facilitators
                          </SelectItem>
                        ) : facilitatorOptions.length === 0 ? (
                          <SelectItem value="empty" disabled>
                            No facilitators found
                          </SelectItem>
                        ) : (
                          facilitatorOptions.map((option: any) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>

                    {fieldState.error?.message ? (
                      <p className="text-xs text-red-500">
                        {fieldState.error.message}
                      </p>
                    ) : null}
                  </Field>
                )}
              />
            ))}
          </FieldGroup>
        </fieldset>

        <div className="mt-6 flex items-start justify-start gap-2">
          <Button
            className="cursor-pointer"
            variant="destructive"
            type="button"
            disabled={isPending}
            onClick={() => {
              form.reset();
              replace([]);
              setFileKey((k) => k + 1);
              setOpen(false);
            }}
          >
            Reset
          </Button>

          <Button
            disabled={!isDirty || !isValid || isPending}
            className="cursor-pointer"
            type="submit"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" />
                Saving...
              </span>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
export default ProgramOnboardingForm;
