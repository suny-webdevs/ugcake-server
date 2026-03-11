import { z } from "zod"

export const registerValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .toLowerCase()
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    role: z
      .enum(["ADMIN", "USER", "DELIVERY_MAN", "MODERATOR"], {
        message: "Invalid role",
      })
      .optional(),
  }),
})

export const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .toLowerCase()
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
  }),
})

export const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z
      .string({ required_error: "Old password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
  }),
})

export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "Refresh token is required" }),
  }),
})
