import type { Metadata } from "next";
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
    metadataTitle: string;
    metadataDescription: string;
  }
> = {
  hybrid: {
    title: "Verify your email",
    description: "Enter your registered email to begin first-time setup.",
    metadataTitle: "Verify Email | Hybrid Learner | CAPE-LMS",
    metadataDescription:
      "Verify your registered email to begin first-time account setup for your hybrid learning access in CAPE-LMS.",
  },
  classroom: {
    title: "Verify your classroom email",
    description:
      "Enter your registered classroom email to begin first-time setup.",
    metadataTitle: "Verify Email | Classroom Learner | CAPE-LMS",
    metadataDescription:
      "Verify your registered classroom email to begin first-time account setup and access your classroom learning portal in CAPE-LMS.",
  },
};

type FirstLoginPageProps = {
  params: Promise<{
    role: string;
  }>;
};

export async function generateMetadata({
  params,
}: FirstLoginPageProps): Promise<Metadata> {
  const { role } = await params;

  if (!isValidRole(role)) {
    return {
      title: "Verify Email | CAPE-LMS",
      description:
        "Verify your email to begin your first-time account setup in CAPE-LMS.",
    };
  }

  const content = verifyEmailPageContent[role];

  return {
    title: content.metadataTitle,
    description: content.metadataDescription,
  };
}

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

        <FirstTimeLoginComponent role={role} />
      </div>
    </LoginFormContainer>
  );
}
export default FirstLoginPage;
