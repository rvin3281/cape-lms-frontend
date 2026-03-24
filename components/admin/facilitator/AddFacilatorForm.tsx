/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAddNewFacilitator } from "@/app/queries/useAddNewFacilitator";
import FormAlertError from "@/components/error-ui/FormAlertError";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  clearDashboardLoading,
  setDashboardLoading,
} from "@/lib/redux/feature/dashboardLoader/dashboardLoaderSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  FacilatorSchema,
  TFacilatorSchema,
} from "@/lib/validation/zodValidationSchema";
import { resolveFormError } from "@/utils/formErrorResponseHandler";
import { capitalizeWords } from "@/utils/stringFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

function AddFacilatorForm() {
  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<TFacilatorSchema>({
    resolver: zodResolver(FacilatorSchema),
    defaultValues: {
      facilitatorName: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const addNewFacilitatorApi = useAddNewFacilitator();

  // Form Submission
  const { isDirty, isValid, isSubmitting } = form.formState;
  // API Submit
  const isPending = addNewFacilitatorApi.isPending;

  const onSubmit = (values: TFacilatorSchema) => {
    if (addNewFacilitatorApi.isPending) return;

    dispatch(setDashboardLoading());

    // Capitalize Name before submitting
    const payload = {
      ...values,
      facilitatorName: capitalizeWords(values.facilitatorName),
    };

    addNewFacilitatorApi.mutate(payload, {
      onSuccess: () => {
        setFormError(false);
        setErrorMessage("");
        toast.success("Facilitator Name Successfully Added!");

        form.reset({
          facilitatorName: "",
        });

        router.push("/admin/facilitator");
      },
      onError: (error: any) => {
        setFormError(true);
        const resolved = resolveFormError(error);

        if (resolved.rawCode) {
          setErrorMessage(resolved.message);
          form.setError("facilitatorName", {
            type: "server",
            message: resolved.message,
          });
        }
      },
      onSettled: () => {
        dispatch(clearDashboardLoading());
      },
    });
  };

  return (
    <div className="max-w-[500px]">
      {formError && (
        <div>
          <FormAlertError errors={[errorMessage]} />
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset>
          <FieldGroup>
            {/* 1. Program Name */}
            <Controller
              name="facilitatorName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel className="mb-1 gap-1" htmlFor="">
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

                      setFormError(false);
                      setErrorMessage("");
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

        <div className="flex mt-6 items-start justify-start gap-2">
          <Button
            className="cursor-pointer"
            variant="destructive"
            type="button"
            disabled={isPending}
            onClick={() => {
              form.reset();
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

export default AddFacilatorForm;
