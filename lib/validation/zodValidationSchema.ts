import * as z from "zod";

/** ======================================== LOGIN SCHEMA ================================ */

export const loginSchema = z.object({
  roleCode: z
    .string()
    .min(1, { message: "Please select your login type" })
    .refine(
      (v) =>
        ["INDIVIDUAL_LEARNER", "HYBRID_LEARNER", "CLASSROOM_LEARNER"].includes(
          v,
        ),
      {
        message: "Invalid login type",
      },
    ),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

/** ======================================== LOGIN SCHEMA ================================ */

/** ======================================== ADMIN LOGIN SCHEMA =================================== */

export const loginSchemaAdmin = z.object({
  roleCode: z
    .string()
    .min(1, { message: "Please select your login type" })
    .refine((v) => ["HR_FOCAL_ADMIN", "CAPE_ADMIN"].includes(v), {
      message: "Invalid login type",
    }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type TLoginSchemaAdmin = z.infer<typeof loginSchemaAdmin>;

/** ============================================ ADMIN LOGIN SCHEMA ================================= */

/** ============================================ FIRST TIME LOGIN - EMAIL SCHEMA ================================= */

export const firstTimeLoginEmailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type TFirstTimeLoginEmailSchema = z.infer<
  typeof firstTimeLoginEmailSchema
>;

/** ============================================ FIRST TIME LOGIN - EMAIL SCHEMA ================================= */

/** ============================================ FIRST TIME LOGIN - SET PASSWORD ================================= */

export const firstTimeSetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),

  confirmPassword: z.string().min(8, {
    message: "Confirm Password must be at least 8 characters",
  }),
});

export type TFirstTimeSetPasswordSchema = z.infer<
  typeof firstTimeSetPasswordSchema
>;

/** ============================================ FIRST TIME LOGIN - SET PASSWORD ================================= */

/** ============================================ Onboarding - Account Information ================================= */

export const OnboardingAccountInformationSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.email({ message: "Please enter a valid email address" }),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine((value) => /^\+?\d+$/.test(value), {
      message: "Phone number can contain only digits and may start with '+'",
    })
    .refine(
      (value) => {
        const digitsOnly = value.startsWith("+") ? value.slice(1) : value;

        return digitsOnly.length >= 10 && digitsOnly.length <= 13;
      },
      {
        message: "Phone number must be between 10 and 13 digits",
      },
    ),
  organization: z.string(),
  jobTitle: z.string().min(1, "Job title is required"),
  currentRole: z.string().min(1, "Current role is required"),
  targetRole: z.string().min(1, "Target role is required"),
  industry: z.string().min(1, "Industry is required"),
  careerGoals: z
    .string()
    .trim()
    .min(1, "Career goals is required")
    .refine((value) => value.length >= 10, {
      message: "Career goals must be at least 10 characters long",
    })
    .refine((value) => value.length <= 250, {
      message: "Career goals must not exceed 250 characters",
    }),
  skills: z
    .array(z.string().min(1, "Skill cannot be empty")) // each skill must be non-empty
    .min(1, "Please add at least one skill") // at least one skill required
    .max(20, "You can add up to 20 skills only"), // optional max limit
});

export type TOnboardingAccountInformationSchema = z.infer<
  typeof OnboardingAccountInformationSchema
>;

/** ============================================ Onboarding - Account Information ================================= */

export const UpdateUserProfileCareerSchema = z.object({
  currentRole: z.string().min(1, "Current role is required"),
  targetRole: z.string().min(1, "Target role is required"),
  industry: z.string().min(1, "Industry is required"),
  careerGoals: z
    .string()
    .trim()
    .min(1, "Career goals is required")
    .refine((value) => value.length >= 10, {
      message: "Career goals must be at least 10 characters long",
    })
    .refine((value) => value.length <= 250, {
      message: "Career goals must not exceed 250 characters",
    }),
  skills: z
    .array(z.string().min(1, "Skill cannot be empty")) // each skill must be non-empty
    .min(1, "Please add at least one skill") // at least one skill required
    .max(20, "You can add up to 20 skills only"), // optional max limit
});

export type TUpdateUserProfileCareerSchema = z.infer<
  typeof UpdateUserProfileCareerSchema
>;

export const UpdateUserProfileAccountSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.email({ message: "Please enter a valid email address" }),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine((value) => /^\+?\d+$/.test(value), {
      message: "Phone number can contain only digits and may start with '+'",
    })
    .refine(
      (value) => {
        const digitsOnly = value.startsWith("+") ? value.slice(1) : value;

        return digitsOnly.length >= 10 && digitsOnly.length <= 13;
      },
      {
        message: "Phone number must be between 10 and 13 digits",
      },
    ),
  jobTitle: z.string().min(1, "Job title is required"),
  organization: z.string(),
});

export type TUpdateUserProfileAccountSchema = z.infer<
  typeof UpdateUserProfileAccountSchema
>;

/** ============================================ PROGRAM ONBOARDING ================================= */
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_MIME = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.ms-excel", // .xls (older)
];

export const ProgramOnboardingSchema = z.object({
  programName: z.string().min(1, "Program Name is Required"),
  programCohort: z.string().min(1, "Program Cohort is Required"),
  programDate: z.date({
    error: "Program Date is required",
  }),
  learnerFile: z
    .instanceof(File, { message: "Excel File is Required" })
    .refine((file) => ACCEPTED_MIME.includes(file.type), {
      message: "Only Excel Files (.xlsx, .xls) are allowed",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be 10MB or less",
    }),

  totalFacilitators: z.coerce
    .number()
    .min(1, "Please select total facilitators"),

  facilitators: z
    .array(
      z.object({
        facilitatorId: z.string().min(1, "Please select a facilitator"),
      }),
    )
    .min(1, "At least one facilitator is required")
    .superRefine((items, ctx) => {
      const seen = new Map<string, number>();

      items.forEach((item, index) => {
        if (!item.facilitatorId) return;

        const existingIndex = seen.get(item.facilitatorId);

        if (existingIndex !== undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Duplicate facilitators are not allowed",
            path: [existingIndex, "facilitatorId"],
          });

          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Duplicate facilitators are not allowed",
            path: [index, "facilitatorId"],
          });
        } else {
          seen.set(item.facilitatorId, index);
        }
      });
    }),
});

export type TProgramOnboardingFormInput = z.input<
  typeof ProgramOnboardingSchema
>;
export type TProgramOnboardingSchema = z.output<typeof ProgramOnboardingSchema>;

/** ============================================ ADD NEW FACILATOR ================================= */

export const FacilatorSchema = z.object({
  // facilitatorName: z.string().min(1, "Facilator Name is Required"),
  facilitatorName: z.string(),
});

export type TFacilatorSchema = z.infer<typeof FacilatorSchema>;
