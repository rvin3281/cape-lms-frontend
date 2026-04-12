"use client";

import { PencilLine } from "lucide-react";

import FormAlertError from "../error-ui/FormAlertError";
import { DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer";

function CustomDrawerHeader({
  title,
  description,
  showError,
  errorTitle,
  errorMessage,
}: {
  title?: string;
  description?: string;
  showError: boolean;
  errorTitle?: string;
  errorMessage?: string;
}) {
  return (
    <>
      <DrawerHeader className="border-b bg-muted/30 px-6 pt-5 pb-3">
        <div className="space-y-4 mb-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-2xl border bg-background shadow-sm">
                    <PencilLine className="h-4 w-4 text-foreground" />
                  </div>
                  <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground shadow-sm">
                    Edit Learner Details
                  </div>
                </div>

                <DrawerTitle className="text-2xl font-semibold tracking-tight text-foreground">
                  {title ?? "Update CAPE Learner"}
                </DrawerTitle>

                <DrawerDescription className="max-w-md text-sm leading-6 text-muted-foreground">
                  {description ??
                    "Review and update the selected learner’s information. Make sure the details are accurate before saving changes."}
                </DrawerDescription>
              </div>
            </div>
          </div>
        </div>
        {showError && (
          <div>
            <FormAlertError title={errorTitle} message={errorMessage} />
          </div>
        )}
      </DrawerHeader>
    </>
  );
}
export default CustomDrawerHeader;
