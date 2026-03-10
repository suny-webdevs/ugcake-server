import prisma from "../../lib/prisma"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Request } from "express"

const create_profile = async (req: Request) => {
  const body = req.body

  const profile = await prisma.profile.create({
    data: {
      userId: body.userId,
      name: body.name,
      image: body.image ?? null,
      phone: body.phone ?? null,
      address: body.address ?? null,
    },
  })

  return profile
}

const get_all_profiles = async () => {
  const profiles = await prisma.profile.findMany({
    include: { user: true },
  })
  return profiles
}

const get_profile = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const profile = await prisma.profile.findUnique({
    where: { id },
    include: { user: true },
  })
  if (!profile) {
    throw new AppError(httpStatus.NOT_FOUND, "Profile not found")
  }
  return profile
}

const get_profile_by_user = async (userId: string) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: { user: true },
  })
  return profile
}

const update_profile = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const { payload } = req.body
  const profile = await prisma.profile.update({
    where: { id },
    data: payload,
    include: { user: true },
  })
  return profile
}

const delete_profile = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const profile = await prisma.profile.delete({ where: { id } })
  return profile
}

export const profileService = {
  create_profile,
  get_all_profiles,
  get_profile,
  get_profile_by_user,
  update_profile,
  delete_profile,
}
