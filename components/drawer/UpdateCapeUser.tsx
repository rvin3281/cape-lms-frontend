"use client";

import {
  TUpdateCapeUserSchema,
  UpdateCapeUserSchema,
} from "@/lib/validation/zodValidationSchema";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from "../ui/drawer";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useUpdateCapeUser } from "@/app/queries/useUpdateCapeUser";
import { toast } from "sonner";
import CustomDrawerHeader from "./CustomDrawerHeader";
import ConfirmActionAlert from "../alert/ConfirmActionAlert";
import WarningAlertDialog from "../alert/WarningAlertDialog";

/* eslint-disable @typescript-eslint/no-explicit-any */
type UpdateCapeUserProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  capeUser: any | null;
  showError: boolean;
  setShowError: Dispatch<SetStateAction<boolean>>;
};

function UpdateCapeUser({
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

  const form = useForm<TUpdateCapeUserSchema>({
    resolver: zodResolver(UpdateCapeUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      cfCompany: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { isDirty, isValid, isSubmitting } = form.formState;

  const handleDrawerOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setConfirmOpen(false);
      setWarningOpen(false);
    }

    onOpenChange(nextOpen);
  };

  useEffect(() => {
    if (open && capeUser) {
      setShowError(false);
      setConfirmOpen(false);
      setWarningOpen(false);
      setWarningTitle("");
      setWarningDescription("");

      form.reset({
        firstName: capeUser.firstName?.trim() || "",
        lastName: capeUser.lastName?.trim() || "",
        userName: capeUser.userName?.trim() || "",
        cfCompany: capeUser?.profile?.cfCompany?.trim() || "N/A",
      });
    }
  }, [open, capeUser, form, setShowError]);

  const updateCapeUserApi = useUpdateCapeUser();
  const { isPending } = updateCapeUserApi;

  const handleConfirmedSubmit = () => {
    if (isPending || !capeUser?.userId) return;

    const values = form.getValues();

    setShowError(false);

    const payload = {
      dto: values,
      id: capeUser.userId as string,
    };

    updateCapeUserApi.mutate(payload, {
      onSuccess: (data: any) => {
        const warnings: string[] = data?.data?.warnings ?? [];

        if (warnings.length > 0) {
          setWarningTitle("Update CAPE Learner completed with warning");
          setWarningDescription(warnings.join("\n\n"));
          setWarningOpen(true);
        }

        setConfirmOpen(false);
        setShowError(false);
        onOpenChange(false);
        toast.success("CAPE learner updated successfully");
      },
      onError: () => {
        setConfirmOpen(false);
        setShowError(true);
        toast.error("Failed to update CAPE learner");
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
        <DrawerContent className="ml-auto mb-4 flex h-full w-full max-w-xl flex-col border-l bg-background">
          {/* Header */}
          <CustomDrawerHeader
            errorTitle="Error"
            errorMessage="Failed to update cape user. Please contact the system administrator for assistance."
            showError={showError}
            title="Update CAPE Learner"
            description=" Review and update the selected learner’s information. Make
                    sure the details are accurate before saving changes."
          />

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex h-full flex-col"
          >
            <div className="flex-1 overflow-y-auto px-4 pb-4 mt-3">
              <fieldset className="mb-4">
                <FieldGroup className="gap-5">
                  <Controller
                    name="firstName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel className="gap-1" htmlFor="">
                          First Name <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                          id="firstName"
                          placeholder="First Name"
                          type="text"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          onChange={(e) => {
                            field.onChange(e);
                            form.clearErrors("firstName");
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
                    name="lastName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel className="gap-1" htmlFor="">
                          Last Name <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                          id="lastName"
                          placeholder="Last Name"
                          type="text"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          onChange={(e) => {
                            field.onChange(e);
                            form.clearErrors("lastName");
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
                    name="userName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel className="gap-1" htmlFor="">
                          Username <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                          id="userName"
                          placeholder="User Name"
                          type="text"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          onChange={(e) => {
                            field.onChange(e);
                            form.clearErrors("userName");
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
                    name="cfCompany"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel className="gap-1" htmlFor="">
                          Company/Organization{" "}
                          <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                          id="cfCompany"
                          placeholder="Company/Organization"
                          type="text"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          onChange={(e) => {
                            field.onChange(e);
                            form.clearErrors("cfCompany");
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
                </FieldGroup>
              </fieldset>
            </div>

            <DrawerFooter>
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={
                  !capeUser || !isDirty || !isValid || isPending || isSubmitting
                }
                onClick={handleRequestSubmit}
              >
                {isSubmitting || isPending ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" />
                    Updating...
                  </span>
                ) : (
                  "Update"
                )}
              </Button>
              <DrawerClose asChild>
                <Button className="cursor-pointer" variant="outline">
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
        title="Confirm learner information update?"
        description="Please review the learner details carefully. Once confirmed, the selected learner information will be updated in CAPE LMS. For learners linked to LearnWorlds, supported fields such as first name, last name, username, and company or organization will also be synced to LearnWorlds. For classroom learners not linked to LearnWorlds, the changes will apply only in CAPE LMS."
        confirmText="Confirm Update"
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

export default UpdateCapeUser;
