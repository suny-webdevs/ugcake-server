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
      rating: body.rating ?? 0,
      maxRating: body.maxRating ?? 5,
      review: body.review,
    },
  })

  return rating
}

const get_all_rating = async () => {
  const ratings = await prisma.rating.findMany()
  return ratings
}

const get_rating = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const rating = await prisma.rating.findUnique({ where: { id } })
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
