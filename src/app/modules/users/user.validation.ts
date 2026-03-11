import { z } from "zod"

// export const createUserValidationSchema = z.object({
//   body: z.object({
//     email: z
//       .string({ required_error: "Email is required" })
//       .trim()
//       .toLowerCase()
//       .email({ message: "Invalid email address" }),
//     password: z
//       .string({ required_error: "Password is required" })
//       .min(6, { message: "Password must be at least 6 characters" }),
//     role: z
//       .enum(["ADMIN", "USER", "DELIVERY_MAN", "MODERATOR"], {
//         message: "Invalid role",
//       })
//       .optional(),
//   }),
// })

export const updateUserValidationSchema = z.object({
  body: z.object({
    payload: z.object({
      email: z
        .string()
        .trim()
        .toLowerCase()
        .email({ message: "Invalid email address" })
        .optional(),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .optional(),
      role: z
        .enum(["ADMIN", "USER", "DELIVERY_MAN", "MODERATOR"], {
          message: "Invalid role",
        })
        .optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
})

export const getUserByIdValidationSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "User ID is required" }).uuid({
      message: "Invalid user ID format",
    }),
  }),
})
