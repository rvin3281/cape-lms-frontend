/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetOnboardingUserData } from "@/app/queries/useGetOnboardingUserData";

import {
  IGetUserOnBoardingProfile,
  IUserAccount,
  IUserCareerAspiration,
} from "@/lib/interface/profile/user-profile.interface";
import { selectAuthUser } from "@/lib/redux/feature/auth/authSelectors";
import { useAppSelector } from "@/lib/redux/hooks";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProfileAccount from "./ProfileAccount";
import ProfileCareer from "./ProfileCareer";
import ProfileTabsSkeleton from "./ProfileTabSkeleton";

function ProfileTabs() {
  const user = useAppSelector(selectAuthUser);
  const email = user?.email;

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetOnboardingUserData(user?.email);

  // 0) Auth not ready (email not available yet)
  if (!email) {
    return (
      <div className="rounded-xl border bg-background p-6 text-sm text-muted-foreground">
        Preparing your profile…
      </div>
    );
  }

  // ✅ first load (no data yet)
  if (isLoading) {
    return <ProfileTabsSkeleton />;
  }

  // 2) Error state (network/server/unauthorized)
  if (isError) {
    const message =
      (error as any)?.response?.data?.message ||
      (error as any)?.message ||
      "Something went wrong while loading your profile.";

    return (
      <div className="w-full">
        <Alert variant="destructive" className="rounded-xl">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Unable to load profile</AlertTitle>
          <AlertDescription className="mt-1">{message}</AlertDescription>

          <div className="mt-4 flex gap-2">
            <Button size="sm" onClick={() => refetch()}>
              Try again
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Reload page
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  // 3) Empty state (API ok but returns no onboarding data)
  // Adjust this condition based on your API shape.
  // Examples:
  // - data === null
  // - data?.payload is empty
  // - data?.success true but data?.data null
  const isEmpty =
    !data || (typeof data === "object" && Object.keys(data).length === 0);

  if (isEmpty) {
    return (
      <div className="mx-auto w-full max-w-130 rounded-xl border bg-background p-8">
        <div className="text-base font-semibold text-foreground">
          No profile data yet
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn’t find onboarding details for your account. You can refresh,
          or continue setting up your profile.
        </p>
      </div>
    );
  }

  const userData: IGetUserOnBoardingProfile = data.data.userData;

  const accountData: IUserAccount = {
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    learnworldId: userData.learnworldId,
    organization: userData.profile.organization,
    phoneNumber: userData.profile.phoneNumber,
    userId: userData.userId,
    userName: userData.userName,
    jobTitle: userData.profile.jobTitle,
  };

  const careerData: IUserCareerAspiration = {
    careerGoals: userData.profile.careerGoals,
    currentRole: userData.profile.currentRole,
    industry: userData.profile.industry,
    targetRole: userData.profile.targetRole,
    skills: userData.profile.skills,
  };

  return (
    <div className="relative">
      {/* ✅ subtle refresh indicator (doesn't block UI) */}
      {isFetching && (
        <div className="absolute right-0 top-0 flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Refreshing…
        </div>
      )}

      {/* ✅ keep UI interactive; optionally soften while fetching */}
      <div className={isFetching ? "opacity-80 transition-opacity" : ""}>
        <Tabs defaultValue="account">
          <TabsList className="mb-5">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="career">Career Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <ProfileAccount title="Personal Information" data={accountData} />
          </TabsContent>

          <TabsContent value="career">
            <ProfileCareer title="Career Aspiration" data={careerData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
export default ProfileTabs;
