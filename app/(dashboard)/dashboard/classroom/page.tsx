import DashboardHomeClassroom from "@/components/layout/DashboardHomeClassroom";

export const metadata = {
  title: "Dashboard | CAPE-LMS",
  description:
    "Secure CAPE-LMS dashboard for learners to track progress and access programs.",
  // robots: {
  //   index: true,
  //   follow: true,
  // },
  // alternates: {
  //   canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_CONTACT_US}`,
  // },
};

function DashboardClassroomPage() {
  return <DashboardHomeClassroom />;
}
export default DashboardClassroomPage;
