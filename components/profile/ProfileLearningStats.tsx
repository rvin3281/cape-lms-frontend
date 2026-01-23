"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

function ProfileLearningStats() {
  return (
    <Card className="mx-auto w-full rounded-xl border">
      <CardHeader className="px-10 pt-8 pb-4">
        <CardTitle className="flex items-center gap-2 text-[16px] font-semibold">
          <Award className="h-4 w-4" />
          Learning Stats
        </CardTitle>
      </CardHeader>

      <CardContent className="px-10 pb-8">
        <div className="space-y-3 text-[14px]">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Courses Enrolled</span>
            <span className="font-semibold text-foreground">5</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Courses Completed</span>
            <span className="font-semibold text-foreground">2</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Certificates Earned</span>
            <span className="font-semibold text-foreground">2</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Badges Unlocked</span>
            <span className="font-semibold text-foreground">8/15</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Hours</span>
            <span className="font-semibold text-foreground">47.5 hrs</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileLearningStats;
