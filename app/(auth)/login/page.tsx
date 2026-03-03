import LoginMultiRoleUi from "@/components/auth/LoginMultiRoleUi";

export const metadata = {
  title: "Login | CAPE-LMS – Centre for Advanced & Professional Education",
  description:
    "Secure login portal for CAPE-LMS. Access your courses, dashboard, and learning resources under Centre for Advanced & Professional Education (UTP).",
  // robots: {
  //   index: true,
  //   follow: true,
  // },
  // alternates: {
  //   canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_CONTACT_US}`,
  // },
};

function LoginPage() {
  return (
    <div>
      <LoginMultiRoleUi />
    </div>
  );
}
export default LoginPage;
