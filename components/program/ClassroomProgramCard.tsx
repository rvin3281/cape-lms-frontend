"use client";

import { format } from "date-fns";
import {
  CalendarDays,
  BookOpen,
  Users,
  MessageSquareText,
  CheckCircle2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ClassroomProgramDto } from "@/lib/types/classroom-program.types";

type ClassroomProgramCardProps = {
  item: ClassroomProgramDto;
  onReviewClick?: (item: ClassroomProgramDto) => void;
};

function ClassroomProgramCard({
  item,
  onReviewClick,
}: ClassroomProgramCardProps) {
  const formattedDate = item.program.programDate
    ? format(new Date(item.program.programDate), "dd MMM yyyy")
    : "-";

  const hasCompletedReview = item.isReviewFeedbackCompleted;

  return (
    <Card className="h-full rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <CardTitle className="text-lg leading-snug break-words">
              {item.program.programName}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 shrink-0" />
              <span>{item.program.programCohort}</span>
            </CardDescription>
          </div>

          <Badge
            variant={item.status === "ACTIVE" ? "default" : "secondary"}
            className="rounded-full px-3 py-1 text-xs shrink-0"
          >
            {item.status}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 shrink-0" />
          <span>{formattedDate}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Users className="h-4 w-4" />
            <span>Facilitators</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {item.facilitators.length > 0 ? (
              item.facilitators.map((facilitator) => (
                <Badge
                  key={facilitator.facilitatorId}
                  variant="secondary"
                  className="rounded-full px-3 py-1 text-xs"
                >
                  {facilitator.facilitatorName}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                No facilitator assigned
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        {hasCompletedReview ? (
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-xl"
            disabled
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Review Submitted
          </Button>
        ) : (
          <Button
            type="button"
            className="w-full rounded-xl cursor-pointer"
            onClick={() => onReviewClick?.(item)}
          >
            <MessageSquareText className="h-4 w-4 mr-2" />
            Share Your Review
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ClassroomProgramCard;
