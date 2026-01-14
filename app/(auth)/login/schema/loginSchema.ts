// src/schemas/loginSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .nonempty("Username is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
