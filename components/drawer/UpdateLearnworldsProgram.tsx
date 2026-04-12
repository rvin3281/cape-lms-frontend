/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from "../ui/drawer";
import CustomDrawerHeader from "./CustomDrawerHeader";
import { useUpdateLearnworldsProgram } from "@/app/queries/useUpdateLearnworldsProgram";
import { Controller, useForm } from "react-hook-form";
import {
  TUpdateLearnworldsProgramFormInput,
  TUpdateLearnworldsProgramSchema,
  UpdateLearnworldsProgramSchema,
} from "@/lib/validation/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { BookOpen, FileText, Link2, Loader2 } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ConfirmActionAlert from "../alert/ConfirmActionAlert";

type UpdateLearnworldsProgramProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  learnworldsProgram: any | null;
  showError: boolean;
  setShowError: Dispatch<SetStateAction<boolean>>;
};

function UpdateLearnworldsProgram({
  open,
  onOpenChange,
  learnworldsProgram,
  showError,
  setShowError,
}: UpdateLearnworldsProgramProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const updateLearnworldsProgramAPI = useUpdateLearnworldsProgram();
  const isPending = updateLearnworldsProgramAPI.isPending;

  const form = useForm<
    TUpdateLearnworldsProgramFormInput,
    any,
    TUpdateLearnworldsProgramSchema
  >({
    resolver: zodResolver(UpdateLearnworldsProgramSchema),
    defaultValues: {
      productTitle: "",
      productDescription: "",
      productUrl: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { isDirty, isValid, isSubmitting } = form.formState;

  const handleDrawerOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setConfirmOpen(false);
    }

    onOpenChange(nextOpen);
  };

  useEffect(() => {
    if (!open || !learnworldsProgram) return;

    setShowError(false);
    setConfirmOpen(false);

    form.reset({
      productTitle: learnworldsProgram?.productTitle?.trim?.() || "",
      productDescription:
        learnworldsProgram?.productDescription?.trim?.() || "",
      productUrl: learnworldsProgram?.productUrl?.trim?.() || "",
    });
  }, [open, learnworldsProgram, setShowError, form]);

  const handleConfirmedSubmit = () => {
    const values = form.getValues();

    setShowError(false);

    const payload = {
      productId: learnworldsProgram?.productId,
      productTitle: values.productTitle,
      productDescription: values.productDescription,
      productUrl: values.productUrl,
    };

    updateLearnworldsProgramAPI.mutate(payload, {
      onSuccess: (data: any) => {
        toast.success(
          data?.message || "LearnWorlds program updated successfully",
        );

        setConfirmOpen(false);
        onOpenChange(false);
        form.reset();
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
          case "PRODUCT_ID_REQUIRED":
            setShowError(true);
            toast.error("Program id is missing.");
            break;

          case "NO_UPDATE_PAYLOAD":
            setShowError(true);
            toast.error("No update data was provided.");
            break;

          case "LEARNWORLDS_PROGRAM_NOT_FOUND":
            setShowError(true);
            toast.error("The selected LearnWorlds program no longer exists.");
            break;

          default:
            setShowError(true);
            toast.error(
              errorData?.message || "Failed to update LearnWorlds program.",
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
              errorMessage="Failed to prepare LearnWorlds program update form. Please contact the system administrator for assistance."
              showError={showError}
              title="Update LearnWorlds Program"
              description="Review and update the selected LearnWorlds program details. Changes made here only update CAPE LMS records, so make sure the same changes are reflected in LearnWorlds if needed."
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
                        <BookOpen className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold tracking-tight">
                          Program Information
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Update the main LearnWorlds program details stored in
                          the CAPE LMS database.
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="rounded-md">
                        Program ID: {learnworldsProgram?.productId || "-"}
                      </Badge>

                      {learnworldsProgram?.productType ? (
                        <Badge variant="outline" className="rounded-md">
                          Type: {learnworldsProgram.productType}
                        </Badge>
                      ) : null}
                    </div>

                    <Controller
                      name="productTitle"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field className="gap-1">
                          <FieldLabel className="mb-1 gap-1">
                            Program Title{" "}
                            <span className="text-red-500">*</span>
                          </FieldLabel>
                          <Input
                            id="productTitle"
                            placeholder="Enter program title"
                            type="text"
                            {...field}
                            aria-invalid={fieldState.invalid}
                            onChange={(e) => {
                              field.onChange(e);
                              form.clearErrors("productTitle");
                            }}
                          />
                          <p className="text-xs text-muted-foreground">
                            This title is used to identify the LearnWorlds
                            program inside CAPE LMS.
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
                      name="productDescription"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field className="gap-1">
                          <FieldLabel className="mb-1 gap-1">
                            Program Description{" "}
                            <span className="text-red-500">*</span>
                          </FieldLabel>
                          <div className="relative">
                            <Textarea
                              id="productDescription"
                              placeholder="Enter program description"
                              className="min-h-[180px] resize-y"
                              {...field}
                              aria-invalid={fieldState.invalid}
                              onChange={(e) => {
                                field.onChange(e);
                                form.clearErrors("productDescription");
                              }}
                            />
                            <div className="mt-2 flex items-center justify-between">
                              <p className="text-xs text-muted-foreground">
                                Provide a clear and readable description for
                                admin reference.
                              </p>
                              <span className="text-xs text-muted-foreground">
                                {field.value?.length ?? 0}/2000
                              </span>
                            </div>
                          </div>
                          {fieldState.error?.message ? (
                            <p className="text-xs text-red-500">
                              {fieldState.error.message}
                            </p>
                          ) : null}
                        </Field>
                      )}
                    />

                    <Controller
                      name="productUrl"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field className="gap-1">
                          <FieldLabel className="mb-1 gap-1">
                            Public URL <span className="text-red-500">*</span>
                          </FieldLabel>
                          <Input
                            id="productUrl"
                            placeholder="https://cape.learnworlds.com/..."
                            type="text"
                            {...field}
                            aria-invalid={fieldState.invalid}
                            onChange={(e) => {
                              field.onChange(e);
                              form.clearErrors("productUrl");
                            }}
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter the public LearnWorlds URL linked to this
                            program.
                          </p>
                          {fieldState.error?.message ? (
                            <p className="text-xs text-red-500">
                              {fieldState.error.message}
                            </p>
                          ) : null}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="rounded-2xl border bg-background p-5 shadow-sm">
                    <div className="mb-4 flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <FileText className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold tracking-tight">
                          Update Summary
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Review the editable fields before saving changes.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 rounded-2xl border bg-muted/20 p-4">
                      <div className="grid gap-1">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Program ID
                        </p>
                        <p className="text-sm font-medium break-all">
                          {learnworldsProgram?.productId || "-"}
                        </p>
                      </div>

                      <div className="grid gap-1">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Program Type
                        </p>
                        <p className="text-sm font-medium">
                          {learnworldsProgram?.productType || "-"}
                        </p>
                      </div>

                      <div className="grid gap-1">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Total Learner Enrollments
                        </p>
                        <p className="text-sm font-medium">
                          {learnworldsProgram?.totalLearnersEnrollment ?? 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border bg-amber-50/60 p-4 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Link2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Important</p>
                        <p className="mt-1 leading-6">
                          Updating this record only changes the LearnWorlds
                          program data stored inside CAPE LMS. If the same
                          program information is also changed directly in
                          LearnWorlds, keep both systems aligned to avoid data
                          mismatch.
                        </p>
                      </div>
                    </div>
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
                  !learnworldsProgram ||
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
        title="Confirm program update?"
        description="Please review the updated LearnWorlds program details carefully. Once confirmed, the selected program information in CAPE LMS will be updated immediately."
        confirmText="Confirm Update"
        cancelText="Cancel"
        isLoading={isPending}
        onConfirm={handleConfirmedSubmit}
      />
    </>
  );
}
export default UpdateLearnworldsProgram;
