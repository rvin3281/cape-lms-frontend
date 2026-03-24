/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  FacilatorSchema,
  TFacilatorSchema,
} from "@/lib/validation/zodValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useUpdateFacilitator } from "@/app/queries/useUpdateFacilitator";
import { toast } from "sonner";
import FormAlertError from "../error-ui/FormAlertError";

type UpdateDialog = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  facilitator?: any;

  closeDialog?: () => void;
  isLoading?: boolean;
  showError: boolean;
  setShowError: Dispatch<SetStateAction<boolean>>;
};

function UpdateFacilitatorDialog({
  open,
  onOpenChange,
  title,
  description,
  facilitator,

  closeDialog,
  showError,
  setShowError,
}: UpdateDialog) {
  const form = useForm<TFacilatorSchema>({
    resolver: zodResolver(FacilatorSchema),
    defaultValues: {
      facilitatorName: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { isDirty, isValid } = form.formState;

  useEffect(() => {
    if (open && facilitator) {
      form.reset({
        facilitatorName: facilitator.facilitatorName,
      });
    }
  }, [open, facilitator, form]);

  const updateFacilitatorApi = useUpdateFacilitator();

  const { isPending } = updateFacilitatorApi;

  console.log("IS PENDING", isPending);

  const onSubmit = (values: TFacilatorSchema) => {
    if (isPending) return null;

    setShowError(false);

    const payload = {
      dto: values,
      id: facilitator.facilitatorId as string,
    };
    updateFacilitatorApi.mutate(payload, {
      onSuccess: () => {
        closeDialog?.();
        toast.success("Facilitator updated successfully");
      },
      onError: (error: any) => {
        setShowError(true);
        toast.error("Failed to update facilitator");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {showError && (
          <div>
            <FormAlertError
              title="Error"
              message="Failed to update facilitator. Please contact the system administrator for assistance."
            />
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="mb-4">
            <FieldGroup>
              <Controller
                name="facilitatorName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="gap-1" htmlFor="">
                      Facilitator Name <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id="facilitatorName"
                      placeholder="Facilitator Name"
                      type="text"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => {
                        field.onChange(e);

                        form.clearErrors("facilitatorName");
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
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={closeDialog} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={!isDirty || !isValid || isPending}
              className="cursor-pointer"
              type="submit"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" />
                  Updating...
                </span>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default UpdateFacilitatorDialog;
