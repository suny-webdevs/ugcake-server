import prisma from "../../lib/prisma"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Request } from "express"

const create_cake = async (req: Request) => {
  const body = req.body

  const cake = await prisma.cake.create({
    data: {
      title: body.title,
      description: body.description,
      price: body.price,
      image: body.image,
      type: body.type,
      flavors: body.flavors ?? [],
      weights: body.weights ?? [],
      category: body.category,
      stock: body.stock ?? 0,
      isActive: body.isActive ?? true,
      isCustomizable: body.isCustomizable ?? false,
      isNew: body.isNew ?? false,
      isBestSeller: body.isBestSeller ?? false,
      isSale: body.isSale ?? false,
      isTrending: body.isTrending ?? false,
      isSpecial: body.isSpecial ?? false,
    },
  })

  return cake
}

const get_all_cake = async () => {
  const cakes = await prisma.cake.findMany()
  return cakes
}

const get_cake = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const cake = await prisma.cake.findUnique({ where: { id } })
  if (!cake) {
    throw new AppError(httpStatus.NOT_FOUND, "Cake not found")
  }
  return cake
}

const update_cake = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const { payload } = req.body
  const cake = await prisma.cake.update({
    where: { id },
    data: payload,
  })
  return cake
}

const delete_cake = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const cake = await prisma.cake.delete({ where: { id } })
  return cake
}

export const cakeService = {
  create_cake,
  get_all_cake,
  get_cake,
  update_cake,
  delete_cake,
}
