import { z } from "zod";

import { usernameSchema } from "@/lib/validations/username";

export const loginSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    userName: usernameSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterForm = z.infer<typeof registerSchema>;
