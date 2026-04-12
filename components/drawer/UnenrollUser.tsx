/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from "../ui/drawer";
import {
  CalendarDays,
  Check,
  GraduationCap,
  Layers3,
  Loader2,
  UserRound,
} from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomDrawerHeader from "./CustomDrawerHeader";
import { useGetAllProgramByUser } from "@/app/queries/useGetAllProgramByUser";
import {
  TUnenrollUserSchema,
  UnenrollUserSchema,
} from "@/lib/validation/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { useUnenrollUser } from "@/app/queries/useUnenrollUser";
import ConfirmActionAlert from "../alert/ConfirmActionAlert";
import WarningAlertDialog from "../alert/WarningAlertDialog";

type UpdateCapeUserProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  capeUser: any | null;
  showError: boolean;
  setShowError: Dispatch<SetStateAction<boolean>>;
};

type ProgramItem = {
  programId: string;
  programName: string;
  displayName?: string;
  source: "CLASSROOM" | "HYBRID" | string;
  status?: string | null;
  enrollmentId?: string | null;
  programDate?: string | null;
  programCohort?: string | null;
  isReviewFeedbackCompleted?: boolean | null;
  enrolledAt?: string | null;
};

type SelectedProgramItem = {
  programId: string;
  enrollmentId?: string | null;
  source: "CLASSROOM" | "HYBRID";
};

function formatSource(source?: string) {
  if (!source) return "Unknown";
  if (source.toUpperCase() === "CLASSROOM") return "Classroom";
  if (source.toUpperCase() === "HYBRID") return "Hybrid";
  return source;
}

function getSourceBadgeClass(source?: string) {
  if (source?.toUpperCase() === "CLASSROOM") {
    return "border-sky-200 bg-sky-50 text-sky-700";
  }

  if (source?.toUpperCase() === "HYBRID") {
    return "border-violet-200 bg-violet-50 text-violet-700";
  }

  return "border-muted bg-muted text-muted-foreground";
}
function formatProgramMeta(program: ProgramItem) {
  const parts: string[] = [];

  if (program.programCohort) parts.push(program.programCohort);

  if (program.programDate) {
    const date = new Date(program.programDate);
    if (!Number.isNaN(date.getTime())) {
      parts.push(
        date.toLocaleDateString("en-MY", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      );
    }
  }

  return parts.join(" • ");
}

function getSelectedUserName(capeUser: any) {
  if (!capeUser) return "";
  return (
    capeUser.userName ||
    `${capeUser.firstName ?? ""} ${capeUser.lastName ?? ""}`.trim() ||
    capeUser.email ||
    ""
  );
}

function normalizeProgramSource(
  source?: string,
): "CLASSROOM" | "HYBRID" | null {
  if (!source) return null;

  const normalized = source.toUpperCase();

  if (normalized === "CLASSROOM") return "CLASSROOM";
  if (normalized === "HYBRID") return "HYBRID";

  return null;
}

function UnenrollUser({
  open,
  onOpenChange,
  capeUser,
  showError,
  setShowError,
}: UpdateCapeUserProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningTitle, setWarningTitle] = useState("");
  const [warningDescription, setWarningDescription] = useState("");

  const {
    data,
    isPending: isProgramLoading,
    isError,
    error,
  } = useGetAllProgramByUser(open ? capeUser?.userId : undefined);

  const programData: ProgramItem[] = data?.data || [];
  const selectedUserName = getSelectedUserName(capeUser);

  const form = useForm<TUnenrollUserSchema>({
    resolver: zodResolver(UnenrollUserSchema),
    defaultValues: {
      userId: capeUser?.userId ?? "",
      programs: [],
    },
    mode: "onChange",
  });

  const { isDirty, isValid, isSubmitting } = form.formState;

  const handleDrawerOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setConfirmOpen(false);
      setWarningOpen(false);
    }

    onOpenChange(nextOpen);
  };
  const unenrollUserApi = useUnenrollUser({
    onSuccessWithResponse: (response) => {
      const warnings: string[] = response?.data?.warnings ?? [];

      if (warnings.length > 0) {
        setWarningTitle("Unenrollment completed with warning");
        setWarningDescription(warnings.join("\n\n"));
        setWarningOpen(true);
      }
    },
    onSuccessClose: () => {
      setConfirmOpen(false);
      form.reset({
        userId: capeUser?.userId ?? "",
        programs: [],
      });
      setShowError(false);
      onOpenChange(false);
    },
    onErrorState: () => {
      setConfirmOpen(false);
      setShowError(true);
    },
  });

  const { isPending } = unenrollUserApi;

  useEffect(() => {
    if (!open || !capeUser) return;

    setShowError(false);
    setConfirmOpen(false);
    setWarningOpen(false);
    setWarningTitle("");
    setWarningDescription("");

    form.reset({
      userId: capeUser?.userId ?? "",
      programs: [],
    });
  }, [open, form, setShowError, capeUser]);

  const handleConfirmedSubmit = () => {
    const values = form.getValues();

    setShowError(false);

    unenrollUserApi.mutate(values);
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
              errorMessage="We couldn’t unenroll the learner at the moment. Please try again."
              showError={showError}
              title="Unenroll CAPE Learner"
              description="Selecting 'Unenroll' will remove the learner from the selected program, while keeping the learner account active in CAPE LMS."
            />
          </div>

          <form
            id="unenroll-user-form"
            onSubmit={(e) => e.preventDefault()}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
              <fieldset className="mb-5 mt-3">
                <FieldGroup className="gap-5">
                  <div className="rounded-2xl border bg-muted/30 p-5 shadow-sm">
                    <div className="mb-4 flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <UserRound className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold tracking-tight">
                          Selected User
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          This learner is fixed and cannot be changed for this
                          action.
                        </p>
                      </div>
                    </div>

                    <Controller
                      name="userId"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel className="gap-1">
                            Learner <span className="text-red-500">*</span>
                          </FieldLabel>

                          <input type="hidden" {...field} />

                          <Input
                            id="userId"
                            value={selectedUserName}
                            type="text"
                            disabled
                            aria-invalid={fieldState.invalid}
                            className="h-11 rounded-xl border-muted-foreground/20 bg-background text-sm font-medium text-foreground disabled:opacity-100"
                          />

                          {fieldState.error?.message ? (
                            <p className="text-xs text-red-500">
                              {fieldState.error.message}
                            </p>
                          ) : null}
                        </Field>
                      )}
                    />

                    <div className="mt-3 flex flex-wrap gap-2">
                      {capeUser?.email ? (
                        <Badge variant="outline" className="rounded-md">
                          {capeUser.email}
                        </Badge>
                      ) : null}

                      {capeUser?.userRoles?.[0]?.role?.roleName ? (
                        <Badge variant="secondary" className="rounded-md">
                          {capeUser.userRoles[0].role.roleName}
                        </Badge>
                      ) : null}
                    </div>
                  </div>

                  <Controller
                    name="programs"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      const selectedPrograms: SelectedProgramItem[] =
                        field.value ?? [];

                      const toggleProgram = (
                        checked: boolean,
                        program: ProgramItem,
                      ) => {
                        const normalizedSource = normalizeProgramSource(
                          program.source,
                        );

                        if (!normalizedSource) {
                          return;
                        }

                        const payload: SelectedProgramItem = {
                          programId: program.programId,
                          enrollmentId: program.enrollmentId ?? null,
                          source: normalizedSource,
                        };

                        if (checked) {
                          const alreadyExists = selectedPrograms.some(
                            (item) =>
                              item.programId === payload.programId &&
                              item.source === payload.source,
                          );

                          if (alreadyExists) return;

                          field.onChange([...selectedPrograms, payload]);
                          form.clearErrors("programs");
                          return;
                        }

                        field.onChange(
                          selectedPrograms.filter(
                            (item) =>
                              !(
                                item.programId === payload.programId &&
                                item.source === payload.source
                              ),
                          ),
                        );
                      };

                      return (
                        <Field>
                          <div className="rounded-2xl border bg-background p-5 shadow-sm">
                            <div className="mb-4 flex items-start gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <GraduationCap className="h-5 w-5" />
                              </div>

                              <div className="min-w-0">
                                <h3 className="text-sm font-semibold tracking-tight">
                                  Select Learner Program
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  Select one or more programs to unenroll this
                                  learner from.
                                </p>
                              </div>
                            </div>

                            <FieldLabel className="gap-1">
                              Learner Program{" "}
                              <span className="text-red-500">*</span>
                            </FieldLabel>

                            <div className="mt-3 space-y-3">
                              {isProgramLoading ? (
                                <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-dashed bg-muted/20">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Loading learner programs...
                                  </div>
                                </div>
                              ) : isError ? (
                                <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
                                  <p className="text-sm font-medium text-destructive">
                                    Failed to load learner programs.
                                  </p>
                                  <p className="mt-1 text-sm text-muted-foreground">
                                    {error instanceof Error
                                      ? error.message
                                      : "Something went wrong while fetching learner programs."}
                                  </p>
                                </div>
                              ) : programData.length === 0 ? (
                                <div className="rounded-2xl border border-dashed bg-muted/20 p-6 text-center">
                                  <Layers3 className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                                  <p className="text-sm font-medium">
                                    No enrolled programs found
                                  </p>
                                  <p className="mt-1 text-sm text-muted-foreground">
                                    This learner is currently not attached to
                                    any program.
                                  </p>
                                </div>
                              ) : (
                                <div className="max-h-[52vh] space-y-3 overflow-y-auto pr-1">
                                  {programData.map((program) => {
                                    const normalizedSource =
                                      normalizeProgramSource(program.source);

                                    const isChecked = normalizedSource
                                      ? selectedPrograms.some(
                                          (item) =>
                                            item.programId ===
                                              program.programId &&
                                            item.source === normalizedSource,
                                        )
                                      : false;

                                    const meta = formatProgramMeta(program);

                                    return (
                                      <label
                                        key={`${program.source}-${program.programId}`}
                                        className={`group flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-all ${
                                          isChecked
                                            ? "border-primary bg-primary/5 shadow-sm"
                                            : "border-border bg-background hover:border-primary/30 hover:bg-muted/30"
                                        }`}
                                      >
                                        <Checkbox
                                          checked={isChecked}
                                          onCheckedChange={(checked) =>
                                            toggleProgram(
                                              checked === true,
                                              program,
                                            )
                                          }
                                          className="mt-1 shrink-0"
                                        />

                                        <div className="min-w-0 flex-1">
                                          <div className="mb-2 flex flex-wrap items-center gap-2">
                                            <span
                                              className={`inline-flex rounded-md border px-2.5 py-0.5 text-xs font-medium ${getSourceBadgeClass(
                                                program.source,
                                              )}`}
                                            >
                                              {formatSource(program.source)}
                                            </span>

                                            {program.status ? (
                                              <Badge
                                                variant="outline"
                                                className="rounded-md px-2.5 py-0.5 uppercase"
                                              >
                                                {program.status}
                                              </Badge>
                                            ) : null}

                                            {isChecked ? (
                                              <div className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                                <Check className="h-3.5 w-3.5" />
                                                Selected
                                              </div>
                                            ) : null}
                                          </div>

                                          <div className="break-words text-sm font-semibold leading-6 text-foreground">
                                            {program.programName}
                                          </div>

                                          {meta ? (
                                            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                              <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                                              <span className="break-words">
                                                {meta}
                                              </span>
                                            </div>
                                          ) : null}
                                        </div>
                                      </label>
                                    );
                                  })}
                                </div>
                              )}

                              {fieldState.error?.message ? (
                                <p className="text-xs text-red-500">
                                  {fieldState.error.message}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </Field>
                      );
                    }}
                  />

                  <div className="rounded-2xl border bg-amber-50/60 p-4 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
                    <p className="font-medium">Important</p>
                    <p className="mt-1 leading-6">
                      Only the selected program enrollment(s) will be removed.
                      The learner account will remain active in CAPE LMS.
                    </p>
                  </div>
                </FieldGroup>
              </fieldset>

              <Separator />
            </div>

            <DrawerFooter className="shrink-0 border-t bg-background">
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={
                  !capeUser ||
                  !isValid ||
                  !isDirty ||
                  isPending ||
                  isSubmitting ||
                  isProgramLoading ||
                  programData.length === 0
                }
                onClick={handleRequestSubmit}
              >
                {isPending || isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Unenrolling...
                  </span>
                ) : (
                  "Unenroll"
                )}
              </Button>

              <DrawerClose asChild>
                <Button
                  type="button"
                  className="cursor-pointer"
                  variant="outline"
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
        title="Confirm learner unenrollment?"
        description="Please review this unenrollment action carefully. Once confirmed, the learner will be removed from the selected program in CAPE LMS. For learners linked to LearnWorlds, the corresponding program unenrollment will also be synced to LearnWorlds. For classroom learners not linked to LearnWorlds, the unenrollment will apply only in CAPE LMS. The learner account itself will remain active."
        confirmText="Confirm Unenroll"
        cancelText="Cancel"
        isLoading={isPending}
        onConfirm={handleConfirmedSubmit}
      />

      <WarningAlertDialog
        open={warningOpen}
        onOpenChange={setWarningOpen}
        title={warningTitle}
        description={warningDescription}
        buttonText="Understood"
      />
    </>
  );
}
export default UnenrollUser;
