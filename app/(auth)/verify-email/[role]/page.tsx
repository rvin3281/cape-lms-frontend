import FirstTimeLoginComponent from "@/components/auth/FirstTimeLoginComponent";
import LoginHeader from "@/components/auth/LoginHeader";
import LoginFormContainer from "../../../../components/auth/LoginFormContainer";
import { notFound } from "next/navigation";

const allowedRoles = ["hybrid", "classroom"] as const;

export type VerifyEmailRole = (typeof allowedRoles)[number];

function isValidRole(role: string): role is VerifyEmailRole {
  return allowedRoles.includes(role as VerifyEmailRole);
}

const verifyEmailPageContent: Record<
  VerifyEmailRole,
  {
    title: string;
    description: string;
  }
> = {
  hybrid: {
    title: "Verify your email",
    description: "Enter your registered email to begin first-time setup.",
  },
  classroom: {
    title: "Verify your classroom email",
    description:
      "Enter your registered classroom email to begin first-time setup.",
  },
};

type FirstLoginPageProps = {
  params: Promise<{
    role: string;
  }>;
};

async function FirstLoginPage({ params }: FirstLoginPageProps) {
  const { role } = await params;

  if (!isValidRole(role)) {
    notFound();
  }

  const content = verifyEmailPageContent[role];

  return (
    <LoginFormContainer>
      <div className="mb-2">
        <div className="flex flex-col gap-5">
          <LoginHeader
            title={content.title}
            description={content.description}
          />
        </div>

        {/* <Suspense fallback={<div className="mt-4">Loading...</div>}> */}
        <FirstTimeLoginComponent role={role} />
        {/* </Suspense> */}
      </div>
    </LoginFormContainer>
  );
}
export default FirstLoginPage;
