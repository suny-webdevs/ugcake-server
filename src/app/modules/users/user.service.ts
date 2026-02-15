import prisma from "../../lib/prisma"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Request } from "express"

const create_user = async (req: Request) => {
  const body = req.body

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role ?? "USER",
      address: body.address,
      phone: body.phone,
      image: body.image ?? "",
      isActive: body.isActive ?? true,
      isVerified: body.isVerified ?? false,
      isDeleted: body.isDeleted ?? false,
      isBlocked: body.isBlocked ?? false,
      isSuspended: body.isSuspended ?? false,
    },
  })

  return user
}

const get_all_user = async () => {
  const users = await prisma.user.findMany()
  return users
}

const get_user = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }
  return user
}

const update_user = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const { payload } = req.body
  const user = await prisma.user.update({
    where: { id },
    data: payload,
  })
  return user
}

const delete_user = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const user = await prisma.user.delete({ where: { id } })
  return user
}

export const userService = {
  create_user,
  get_all_user,
  get_user,
  update_user,
  delete_user,
}
