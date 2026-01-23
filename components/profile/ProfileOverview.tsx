"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { selectAuthUser } from "@/lib/redux/feature/auth/authSelectors";
import { useAppSelector } from "@/lib/redux/hooks";
import { Flame, Star } from "lucide-react";

function ProfileOverview() {
  const user = useAppSelector(selectAuthUser);

  const initials = user?.email?.slice(0, 2)?.toUpperCase() ?? "NA";

  return (
    <div className="w-full">
      <div className="mx-auto  rounded-xl border bg-background px-10 py-9">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <Avatar className="h-24 w-24">
            <AvatarFallback className="bg-gradient-to-br from-slate-700 via-slate-600 to-amber-500 text-3xl font-medium text-white">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Name */}
          <h2 className="mt-6 text-[22px] font-semibold text-foreground">
            {user?.name}
          </h2>

          {/* Email */}
          <p className="mt-2 text-sm text-muted-foreground">{user?.email}</p>

          {/* Badges */}
          <div className="mt-6 flex gap-3">
            <Badge variant="secondary" className="gap-2 rounded-full">
              <Star className="h-4 w-4 text-amber-500" />
              Pro Member
            </Badge>

            <Badge variant="outline" className="gap-2 rounded-full">
              <Flame className="h-4 w-4 text-orange-500" />7 Day Streak
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileOverview;
