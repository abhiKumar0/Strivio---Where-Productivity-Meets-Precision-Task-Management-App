import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

//   password: z.string()
//   .min(8, "Password must be at least 8 characters")
//   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//   .regex(/[0-9]/, "Password must contain at least one number")
//   .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
