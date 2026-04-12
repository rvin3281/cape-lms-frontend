"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

type WarningAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  buttonText?: string;
};

export default function WarningAlertDialog({
  open,
  onOpenChange,
  title,
  description,
  buttonText = "Understood",
}: WarningAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[520px] rounded-2xl">
        <AlertDialogHeader>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <AlertDialogTitle className="text-left text-lg font-semibold text-foreground">
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-left text-sm leading-6 text-muted-foreground whitespace-pre-line">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction
            className="
              cursor-pointer rounded-xl
              bg-yellow-500 text-white
              hover:bg-yellow-600
              focus-visible:ring-yellow-500
            "
          >
            {buttonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
