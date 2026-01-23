"use client";

import { useProgramSSOAuth } from "@/app/queries/useProgramSSOAuth";
import { Bookmark, Clock, Star, Users } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Progress } from "../ui/progress";

type ProgramCardProps = {
  title?: string;
  description?: string;
  productId?: string;
  url?: string;
  userEmail?: string;

  level?: string;
  skills?: string[];
  duration?: string;
  mode?: string;
  price?: string;
  rating?: string;
  progress?: number;
};

function ProgramCard({
  title,
  description,
  productId,
  url,
  userEmail,
  level = "Intermediate",
  skills = ["Strategic Planning", "Team Leadership", "Decision Making"],
  duration = "8 weeks",
  mode = "Hybrid",
  price = "$2499",
  rating = "4.8/5",
  progress = 0,
}: ProgramCardProps) {
  const ssoAuthUserProgram = useProgramSSOAuth();

  const redirectUserToCoursePlayer = (
    userEmail?: string,
    productId?: string
  ) => {
    if (!productId || !userEmail) {
      toast.error("Unable to launch program. Missing information.");
      return;
    }

    const redirectUrl = `https://cape-dev-test.learnworlds.com/program-player?program=${productId}`;

    const toastId = toast.loading("Preparing your learning experience...");

    ssoAuthUserProgram.mutate(
      { email: userEmail, redirectUrl },
      {
        onSuccess: (data) => {
          const ssoUrl: string | undefined = data?.data?.ssoUrl;

          if (!ssoUrl) {
            toast.error("Failed to generate secure access link.", {
              id: toastId,
            });
            return;
          }

          toast.success("Redirecting you to your program 🎓", {
            id: toastId,
            description: "Your program will open in a new tab.",
            duration: 3000,
          });

          // 🔐 Open in new tab (secure)
          window.open(ssoUrl, "_blank", "noopener,noreferrer");
        },
        onError: (error: any) => {
          console.error("SSO Error:", error);

          let message = "Unable to access the program at the moment.";

          if (error?.response?.status === 401) {
            message = "Your session has expired. Please log in again.";
          } else if (error?.response?.status === 403) {
            message = "You are not authorized to access this program.";
          } else if (error?.response?.status >= 500) {
            message =
              "Service temporarily unavailable. Please try again later.";
          }

          toast.error(message, {
            id: toastId,
          });
        },
      }
    );
  };

  return (
    <Card className="h-full rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all hover:shadow-md hover:border-slate-300 flex flex-col">
      <CardContent className="p-5 flex flex-col gap-4 flex-1">
        {/* Level */}
        <Badge variant="secondary" className="w-fit text-xs font-medium">
          {level}
        </Badge>

        {/* Title */}
        <h3 className="text-[18px] font-semibold leading-snug text-slate-900">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">
          {description}
        </p>

        {/* Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="text-xs font-normal"
            >
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{skills.length - 3}
            </Badge>
          )}
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-y-2 text-xs text-slate-600 mt-2">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {mode}
          </div>
          <div className="flex items-center gap-1 font-medium">{price}</div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-500" />
            {rating}
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-5 pt-0 mt-auto flex items-center gap-3">
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            redirectUserToCoursePlayer(userEmail, productId);
          }}
          className="flex-1 rounded-xl cursor-pointer"
          disabled={ssoAuthUserProgram.isPending}
        >
          {ssoAuthUserProgram.isPending ? "Launching..." : "Enroll Now"}
        </Button>

        <Button
          size="icon"
          variant="outline"
          className="rounded-xl cursor-pointer"
          aria-label="Save program"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
export default ProgramCard;
