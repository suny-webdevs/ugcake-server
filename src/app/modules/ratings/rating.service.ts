import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Request } from "express"
import prisma from "../../lib/prisma"

const create_rating = async (req: Request) => {
  const body = req.body

  const rating = await prisma.rating.create({
    data: {
      userId: body.userId,
      cakeId: body.cakeId,
      rating: body.rating,
      review: body.review ?? null,
    },
    include: {
      user: true,
      cake: true,
    },
  })

  return rating
}

const get_all_rating = async () => {
  const ratings = await prisma.rating.findMany({
    include: {
      user: true,
      cake: true,
    },
  })
  return ratings
}

const get_rating = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const rating = await prisma.rating.findUnique({
    where: { id },
    include: {
      user: true,
      cake: true,
    },
  })
  if (!rating) {
    throw new AppError(httpStatus.NOT_FOUND, "Rating not found")
  }
  return rating
}

const update_rating = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const { payload } = req.body
  const rating = await prisma.rating.update({
    where: { id },
    data: payload,
    include: {
      user: true,
      cake: true,
    },
  })
  return rating
}

const delete_rating = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const rating = await prisma.rating.delete({ where: { id } })
  return rating
}

export const ratingService = {
  create_rating,
  get_all_rating,
  get_rating,
  update_rating,
  delete_rating,
}
