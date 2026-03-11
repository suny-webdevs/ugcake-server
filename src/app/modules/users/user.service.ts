import prisma from "../../lib/prisma"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Request } from "express"

// const create_user = async (req: Request) => {
//   const { email, password, role } = req.body

//   // Check if email already exists
//   const existingUser = await prisma.user.findUnique({
//     where: { email },
//   })

//   if (existingUser) {
//     throw new AppError(
//       httpStatus.CONFLICT,
//       "User with this email already exists",
//     )
//   }

//   const user = await prisma.user.create({
//     data: {
//       email,
//       password,
//       role: role ?? "USER",
//     },
//     include: {
//       profile: true,
//     },
//   })

//   return user
// }

const get_all_user = async () => {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
    },
  })
  return users
}

const get_user = async (req: Request) => {
  const id = req.params.id as string

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      profile: true,
    },
  })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }
  return user
}

const update_user = async (req: Request) => {
  const id = req.params.id as string
  const payload = req.body.payload

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id },
  })
  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  // Check if new email is already taken (if email is being updated)
  if (payload.email && payload.email !== existingUser.email) {
    const emailExists = await prisma.user.findUnique({
      where: { email: payload.email },
    })
    if (emailExists) {
      throw new AppError(
        httpStatus.CONFLICT,
        "User with this email already exists",
      )
    }
  }

  // Filter out undefined values
  const updateData = Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  )

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    include: {
      profile: true,
    },
  })
  return user
}

const delete_user = async (req: Request) => {
  const id = req.params.id as string

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id },
  })
  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  // Soft delete: set isDeleted to true
  const user = await prisma.user.update({
    where: { id },
    data: { isDeleted: true },
    include: {
      profile: true,
    },
  })
  return user
}

export const userService = {
  // create_user,
  get_all_user,
  get_user,
  update_user,
  delete_user,
}
