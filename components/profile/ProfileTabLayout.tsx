"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function ProfileTabLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Card className="w-full rounded-2xl border gap-1">
      <CardHeader className="px-8 pt-4 pb-4">
        <CardTitle className="flex items-center gap-2 text-[18px] font-semibold">
          {/* <Briefcase className="h-5 w-5 text-muted-foreground" /> */}
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        {/* Placeholder for future form */}
        <div className="text-sm ">{children}</div>
      </CardContent>
    </Card>
  );
}
export default ProfileTabLayout;
