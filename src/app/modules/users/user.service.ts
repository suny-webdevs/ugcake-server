import prisma from "../../lib/prisma"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Request } from "express"

const create_user = async (req: Request) => {
  const body = req.body

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      role: body.role ?? "USER",
    },
    include: {
      profile: true,
    },
  })

  return user
}

const get_all_user = async () => {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
    },
  })
  return users
}

const get_user = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
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
  const id = req.params.id ?? req.body?.id
  const { payload } = req.body
  const user = await prisma.user.update({
    where: { id },
    data: payload,
    include: {
      profile: true,
    },
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
