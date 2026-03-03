import PageHeader from "@/components/layout/PageHeader";
import ProfileLearningStats from "@/components/profile/ProfileLearningStats";
import ProfileOverview from "@/components/profile/ProfileOverview";
import ProfileTabs from "@/components/profile/ProfileTabs";

export const metadata = {
  title: "My Profile | CAPE-LMS",
  description:
    "View and manage your CAPE-LMS account information, learning statistics, and enrolled program details.",
  // robots: {
  //   index: true,
  //   follow: true,
  // },
  // alternates: {
  //   canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_CONTACT_US}`,
  // },
};

function ProfilePage() {
  return (
    <>
      <PageHeader
        title={`My Profile`}
        description="Manage your account and track your learning progress"
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 px-4 h-full mb-5">
        <div className="">
          <div className="flex gap-4 flex-col">
            {/* Profie Picture & Name - Component 1 */}
            <div className="">
              <ProfileOverview />
            </div>

            {/* Learning Stats - Component 2 */}
            <div className="">
              <ProfileLearningStats />
            </div>

            {/* Next Goal - Component 3 */}
            {/* <div className="">Component 1</div> */}
          </div>
        </div>
        <div className="xl:col-span-2 w-full">
          <ProfileTabs />
        </div>
      </div>
    </>
  );
}
export default ProfilePage;
