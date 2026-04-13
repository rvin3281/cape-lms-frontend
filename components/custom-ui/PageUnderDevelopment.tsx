import { ReactNode } from "react";
import PageInProgress from "./PageInProgress";

type AccentVariant = "amber" | "blue" | "purple" | "green" | "slate";

type PageUnderDevelopmentProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  badgeText?: string;
  note?: string;
  variant?: AccentVariant;
  enabledInProduction?: boolean;
};

export default function PageUnderDevelopment({
  children,
  title,
  description,
  imageSrc,
  imageAlt,
  badgeText,
  note,
  variant = "amber",
  enabledInProduction = false,
}: PageUnderDevelopmentProps) {
  const isDevelopment = process.env.NODE_ENV === "development";

  console.log(
    `PageUnderDevelopment: isDevelopment=${isDevelopment}, enabledInProduction=${enabledInProduction}`,
  );

  if (isDevelopment || enabledInProduction) {
    return children;
  }

  return (
    <PageInProgress
      title={title}
      description={description}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      badgeText={badgeText}
      note={note}
      variant={variant}
      priority
    />
  );
}
