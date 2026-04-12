/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  TUpdateClassroomProgramFormInput,
  TUpdateClassroomProgramSchema,
  UpdateClassroomProgramSchema,
} from "@/lib/validation/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  FileSpreadsheet,
  GraduationCap,
  Loader2,
  Plus,
  Trash2,
  Users,
} from "lucide-react";

import { useGetAllFacilitatorsForSelect } from "@/app/queries/useGetAllFacilitatorsForSelect";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from "../ui/drawer";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import CustomDrawerHeader from "./CustomDrawerHeader";
import { useUpdateClassroomProgram } from "@/app/queries/useUpdateClassroomProgram";
import ConfirmActionAlert from "../alert/ConfirmActionAlert";

type UpdateClassroomProgramProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classroomProgram: any | null;
  showError: boolean;
  setShowError: Dispatch<SetStateAction<boolean>>;
};

type FacilitatorOption = {
  label: string;
  value: string;
};

function parseProgramDate(value?: string | Date | null) {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function UpdateClassroomProgram({
  open,
  onOpenChange,
  classroomProgram,
  showError,
  setShowError,
}: UpdateClassroomProgramProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  const [fileKey, setFileKey] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const updateClassroomProgramAPI = useUpdateClassroomProgram();
  const isPending = updateClassroomProgramAPI.isPending;

  const {
    data: facilitatorResponse,
    isLoading: isFacilitatorLoading,
    isError: isFacilitatorError,
  } = useGetAllFacilitatorsForSelect({});

  const facilitatorOptions: FacilitatorOption[] =
    facilitatorResponse?.data?.map((facilitator: any) => ({
      label: String(facilitator.facilitatorName),
      value: String(facilitator.facilitatorId),
    })) ?? [];

  const facilitatorMap = useMemo<Map<string, string>>(() => {
    return new Map<string, string>(
      facilitatorOptions.map((item) => [item.value, item.label]),
    );
  }, [facilitatorOptions]);

  const form = useForm<
    TUpdateClassroomProgramFormInput,
    any,
    TUpdateClassroomProgramSchema
  >({
    resolver: zodResolver(UpdateClassroomProgramSchema),
    defaultValues: {
      programName: "",
      programCohort: "",
      programDate: undefined as unknown as Date,
      learnerFile: undefined,
      facilitators: [{ facilitatorId: "" }],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "facilitators",
  });

  const { isDirty, isValid, isSubmitting } = form.formState;

  const handleDrawerOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setConfirmOpen(false);
    }

    onOpenChange(nextOpen);
  };

  const resetLearnerFile = () => {
    form.setValue("learnerFile", undefined, {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setFileKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (!open || !classroomProgram) return;

    setConfirmOpen(false);
    setShowError(false);

    const facilitatorRows =
      Array.isArray(classroomProgram?.facilitators) &&
      classroomProgram.facilitators.length > 0
        ? classroomProgram.facilitators.map(
            (item: { facilitatorId?: string; facilitatorName?: string }) => ({
              facilitatorId: item?.facilitatorId ?? "",
            }),
          )
        : [{ facilitatorId: "" }];

    form.reset({
      programName: classroomProgram?.programName?.trim?.() || "",
      programCohort: classroomProgram?.programCohort?.trim?.() || "",
      programDate: parseProgramDate(classroomProgram?.programDate) as Date,
      learnerFile: undefined,
      facilitators: facilitatorRows,
    });

    replace(facilitatorRows);
    resetLearnerFile();
  }, [open, classroomProgram]);

  const selectedFacilitators = form.watch("facilitators") ?? [];

  const handleAddFacilitator = async () => {
    append({ facilitatorId: "" });

    const facilitatorFieldNames = [
      ...fields.map((_, i) => `facilitators.${i}.facilitatorId` as const),
      `facilitators.${fields.length}.facilitatorId` as const,
    ];

    await form.trigger(facilitatorFieldNames);
  };

  const handleRemoveFacilitator = async (index: number) => {
    if (fields.length <= 1) return;

    remove(index);

    const nextLength = fields.length - 1;

    const facilitatorFieldNames = Array.from(
      { length: nextLength },
      (_, i) => `facilitators.${i}.facilitatorId` as const,
    );

    await form.trigger(facilitatorFieldNames);
  };

  const handleConfirmedSubmit = () => {
    const values = form.getValues();

    setShowError(false);

    const payload = {
      ...values,
      programId: classroomProgram?.programId,
      totalFacilitators: values.facilitators.length,
    };

    console.log("payload", payload);

    updateClassroomProgramAPI.mutate(payload, {
      onSuccess: (data: any) => {
        toast.success(
          data?.message || "Classroom program updated successfully",
        );

        setConfirmOpen(false);
        resetLearnerFile();
        onOpenChange(false);
        form.reset();
        replace([{ facilitatorId: "" }]);
      },
      onError: (e: any) => {
        const response = e?.response;
        const errorData = response?.data;
        const errorCode = errorData?.code;

        setConfirmOpen(false);

        if (!response) {
          setShowError(true);
          toast.error("We could not connect to the server. Please try again.");
          return;
        }

        switch (errorCode) {
          case "PROGRAM_NOT_FOUND":
            setShowError(true);
            toast.error("The selected program no longer exists.");
            break;

          case "DUPLICATE_PROGRAM_NAME":
            setShowError(true);
            toast.error(
              "Another classroom program already exists with this name.",
            );
            break;

          case "ROW_ERROR_FOUND":
            setShowError(true);
            toast.error(
              "Errors were found in the uploaded learner Excel file.",
            );
            break;

          case "DUPLICATE_EMAIL_FOUND_ON_THE_EXCEL":
            setShowError(true);
            toast.error(
              "Duplicate learner emails were found in the uploaded Excel file.",
            );
            break;

          case "INVALID_EXCEL_TEMPLATE":
            setShowError(true);
            toast.error(
              "The uploaded file does not match the required Excel template.",
            );
            break;

          case "NO_ROLE_FOUND":
            setShowError(true);
            toast.error(
              "System role configuration is missing. Please contact support.",
            );
            break;

          case "INVALID_EXISTING_USER_ROLE":
            setShowError(true);
            toast.error(
              errorData?.message ||
                "Some users cannot be onboarded into this classroom program.",
            );
            break;

          default:
            setShowError(true);
            toast.error(
              errorData?.message || "Failed to update classroom program.",
            );
            break;
        }
      },
    });
  };

  const handleRequestSubmit = async () => {
    const valid = await form.trigger();

    if (!valid) {
      return;
    }

    setConfirmOpen(true);
  };

  return (
    <>
      <Drawer
        direction="right"
        open={open}
        onOpenChange={handleDrawerOpenChange}
      >
        <DrawerContent
          className="
          ml-auto flex h-dvh flex-col overflow-hidden border-l bg-background
          w-[96vw] max-w-[96vw]
          sm:w-[94vw] sm:max-w-[94vw]
          lg:w-[768px] lg:max-w-[768px]
          xl:w-[768px] xl:max-w-[768px]
          2xl:w-[1100px] 2xl:max-w-[1100px]
          data-[vaul-drawer-direction=right]:w-[96vw]
          data-[vaul-drawer-direction=right]:max-w-[96vw]
          sm:data-[vaul-drawer-direction=right]:w-[94vw]
          sm:data-[vaul-drawer-direction=right]:max-w-[94vw]
          lg:data-[vaul-drawer-direction=right]:w-[768px]
          lg:data-[vaul-drawer-direction=right]:max-w-[768px]
          xl:data-[vaul-drawer-direction=right]:w-[768px]
          xl:data-[vaul-drawer-direction=right]:max-w-[768px]
          2xl:data-[vaul-drawer-direction=right]:w-[1100px]
          2xl:data-[vaul-drawer-direction=right]:max-w-[1100px]
        "
        >
          <div className="shrink-0">
            <CustomDrawerHeader
              errorTitle="Error"
              errorMessage="Failed to prepare classroom program update form. Please contact the system administrator for assistance."
              showError={showError}
              title="Update Classroom Program"
              description="Review and update the selected classroom program details, assigned facilitators, and optionally upload a learner Excel file to add more learners into this program."
            />
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="mt-3 min-h-0 flex-1 overflow-y-auto px-4 pb-4">
              <fieldset disabled={isPending}>
                <FieldGroup className="gap-5">
                  <div className="rounded-2xl border bg-muted/20 p-5 shadow-sm">
                    <div className="mb-4 flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <GraduationCap className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold tracking-tight">
                          Program Information
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Update the core details of the selected classroom
                          program.
                        </p>
                      </div>
                    </div>

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
                            onChange={(e) => {
                              field.onChange(e);
                              form.clearErrors("programName");
                            }}
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
                      name="programCohort"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field className="gap-1">
                          <FieldLabel className="mb-1 gap-1">
                            Program Cohort{" "}
                            <span className="text-red-500">*</span>
                          </FieldLabel>
                          <Input
                            id="programCohort"
                            placeholder="Program Cohort"
                            type="text"
                            {...field}
                            aria-invalid={fieldState.invalid}
                            onChange={(e) => {
                              field.onChange(e);
                              form.clearErrors("programCohort");
                            }}
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
                            <FieldLabel
                              className="mb-1 gap-1"
                              htmlFor="programDate"
                            >
                              Program Date{" "}
                              <span className="text-red-500">*</span>
                            </FieldLabel>

                            <Popover
                              open={datePopoverOpen}
                              onOpenChange={setDatePopoverOpen}
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  id="programDate"
                                  className="justify-start font-normal"
                                  aria-invalid={fieldState.invalid}
                                >
                                  {selectedDate
                                    ? format(selectedDate, "PPP")
                                    : "Pick a date"}
                                </Button>
                              </PopoverTrigger>

                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={(date) => {
                                    field.onChange(date);
                                    field.onBlur();
                                    form.clearErrors("programDate");
                                    setDatePopoverOpen(false);
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
                  </div>

                  <div className="rounded-2xl border bg-background p-5 shadow-sm">
                    <div className="mb-4 flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Users className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold tracking-tight">
                          Assigned Facilitators
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Review the facilitators currently assigned to this
                          program. You can remove existing facilitators or add
                          new ones.
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="rounded-md">
                        Total Facilitators: {fields.length}
                      </Badge>

                      {classroomProgram?.facilitators?.length ? (
                        <Badge variant="outline" className="rounded-md">
                          Current Program Facilitators:{" "}
                          {classroomProgram.facilitators.length}
                        </Badge>
                      ) : null}
                    </div>

                    <div className="space-y-4">
                      {fields.map((item, index) => {
                        const currentSelectedValue =
                          selectedFacilitators?.[index]?.facilitatorId ?? "";

                        return (
                          <div
                            key={item.id}
                            className="rounded-2xl border bg-muted/20 p-4"
                          >
                            <div className="mb-3 flex items-center justify-between gap-3">
                              <div>
                                <p className="text-sm font-medium">
                                  Facilitator {index + 1}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  This facilitator is currently linked to the
                                  program and can be updated or removed.
                                </p>
                              </div>

                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer text-destructive hover:text-destructive"
                                disabled={fields.length <= 1}
                                onClick={() => handleRemoveFacilitator(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <Controller
                              name={`facilitators.${index}.facilitatorId`}
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field className="gap-1">
                                  <FieldLabel className="mb-1 gap-1">
                                    Facilitator{" "}
                                    <span className="text-red-500">*</span>
                                  </FieldLabel>

                                  <Select
                                    value={field.value ?? ""}
                                    disabled={
                                      isFacilitatorLoading || isFacilitatorError
                                    }
                                    onValueChange={async (value) => {
                                      field.onChange(value);
                                      field.onBlur();

                                      const facilitatorFieldNames = fields.map(
                                        (_, i) =>
                                          `facilitators.${i}.facilitatorId` as const,
                                      );

                                      await form.trigger(facilitatorFieldNames);
                                    }}
                                  >
                                    <SelectTrigger
                                      aria-invalid={fieldState.invalid}
                                    >
                                      <SelectValue
                                        placeholder={
                                          isFacilitatorLoading
                                            ? "Loading facilitators..."
                                            : isFacilitatorError
                                              ? "Failed to load facilitators"
                                              : `Select facilitator ${index + 1}`
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
                                      ) : facilitatorOptions.length === 0 ? (
                                        <SelectItem value="empty" disabled>
                                          No facilitators found
                                        </SelectItem>
                                      ) : (
                                        facilitatorOptions.map((option) => {
                                          const duplicatedElsewhere =
                                            selectedFacilitators.some(
                                              (selected, selectedIndex) =>
                                                selectedIndex !== index &&
                                                selected?.facilitatorId ===
                                                  option.value,
                                            );

                                          return (
                                            <SelectItem
                                              key={option.value}
                                              value={option.value}
                                              disabled={duplicatedElsewhere}
                                            >
                                              {option.label}
                                            </SelectItem>
                                          );
                                        })
                                      )}
                                    </SelectContent>
                                  </Select>

                                  {currentSelectedValue ? (
                                    <p className="text-xs text-muted-foreground">
                                      Selected:{" "}
                                      {String(
                                        facilitatorMap.get(
                                          currentSelectedValue,
                                        ) ?? "Unknown Facilitator",
                                      )}
                                    </p>
                                  ) : null}

                                  {fieldState.error?.message ? (
                                    <p className="text-xs text-red-500">
                                      {fieldState.error.message}
                                    </p>
                                  ) : null}
                                </Field>
                              )}
                            />
                          </div>
                        );
                      })}

                      <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={handleAddFacilitator}
                        disabled={isFacilitatorLoading || isFacilitatorError}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Facilitator
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border bg-background p-5 shadow-sm">
                    <div className="mb-4 flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <FileSpreadsheet className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold tracking-tight">
                          Add Learners via Excel
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Upload a learner Excel file only if you want to add
                          more learners into this existing classroom program.
                        </p>
                      </div>
                    </div>

                    <Controller
                      name="learnerFile"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field className="gap-1">
                          <FieldLabel
                            className="mb-1 gap-1"
                            htmlFor="learnerFile"
                          >
                            Upload Learner List (Optional)
                          </FieldLabel>

                          <Input
                            ref={fileInputRef}
                            key={fileKey}
                            id="learnerFile"
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
                            Upload the same learner Excel template only when you
                            want to add additional learners. Max 10MB.
                          </p>

                          {field.value ? (
                            <div className="mt-2 flex items-center justify-between rounded-xl border bg-muted/20 px-3 py-2">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium">
                                  {field.value.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {(field.value.size / 1024 / 1024).toFixed(2)}{" "}
                                  MB
                                </p>
                              </div>

                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="cursor-pointer"
                                onClick={resetLearnerFile}
                              >
                                Remove
                              </Button>
                            </div>
                          ) : null}

                          {fieldState.error?.message ? (
                            <p className="text-xs text-red-500">
                              {fieldState.error.message}
                            </p>
                          ) : null}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="rounded-2xl border bg-amber-50/60 p-4 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
                    <p className="font-medium">Important</p>
                    <p className="mt-1 leading-6">
                      Removing a facilitator from this list means that
                      facilitator will no longer be assigned to this classroom
                      program after the update is saved.
                    </p>
                  </div>

                  <Separator />
                </FieldGroup>
              </fieldset>
            </div>

            <DrawerFooter className="shrink-0 border-t bg-background">
              <Button
                type="button"
                className="cursor-pointer"
                disabled={
                  !classroomProgram ||
                  !isDirty ||
                  !isValid ||
                  isSubmitting ||
                  isPending
                }
                onClick={handleRequestSubmit}
              >
                {isSubmitting || isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </span>
                ) : (
                  "Update"
                )}
              </Button>

              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>

      <ConfirmActionAlert
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Confirm classroom program update?"
        description="Please review the updated classroom program details carefully. Once confirmed, the selected program information will be updated in the CAPE LMS database. This action does not update any data in LearnWorlds."
        confirmText="Confirm Update"
        cancelText="Cancel"
        isLoading={isPending}
        onConfirm={handleConfirmedSubmit}
      />
    </>
  );
}

export default UpdateClassroomProgram;
