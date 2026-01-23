"use client";

import { AlertTriangle, RotateCcw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function TryAgain() {
  const router = useRouter();

  const sp = useSearchParams();
  //   console.log("next", sp.get("next"));
  const next = sp.get("next") || "/dashboard";

  const [pending, setPending] = useState(false);

  const tryAgainReload = () => {
    setPending(true);

    // replace prevents back-loop, and triggers (dashboard)/loading.tsx nicely
    router.replace(next);

    // safety: if route change is blocked for any reason, remove loading
    setTimeout(() => setPending(false), 3000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md rounded-2xl border shadow-sm">
        <CardContent className="p-8 text-center">
          {/* ICON */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>

          {/* TITLE */}
          <h1 className="text-xl font-semibold tracking-tight">
            Something Went Wrong
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-2 text-sm text-muted-foreground">
            This is not your fault. Our system is currently unable to process
            your request.
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Please try again, or contact the CAPE team if the issue persists.
          </p>

          {/* ACTIONS */}
          <div className="mt-6 flex flex-col gap-3 ">
            <Button
              disabled={pending}
              className="w-full cursor-pointer"
              onClick={tryAgainReload}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              {pending ? "Trying…" : "Try Again"}
            </Button>

            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() =>
                (window.location.href =
                  "mailto:cape.support@utp.edu.my?subject=CAPE System Issue")
              }
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact CAPE Support
            </Button>
          </div>

          {/* FOOTNOTE */}
          <p className="mt-6 text-xs text-muted-foreground">
            If this problem continues, please report it to the CAPE technical
            team.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
