import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Request } from "express"
import prisma from "../../lib/prisma"

const create_cake = async (req: Request) => {
  const body = req.body

  const cake = await prisma.cake.create({
    data: {
      sku: body.sku,
      title: body.title,
      description: body.description,
      images: body.images ?? [],
      price: body.price,
      category: body.category,
      type: body.type,
      customizable: body.customizable ?? false,
      stock: body.stock ?? 0,
      size: body.size ?? null,
      flavour: body.flavour ?? null,
      soldAmount: body.soldAmount ?? 0,
      isBestSeller: body.isBestSeller ?? false,
      isDeleted: body.isDeleted ?? false,
    },
    include: {
      cakeFeatures: true,
    },
  })

  return cake
}

const get_all_cake = async () => {
  const cakes = await prisma.cake.findMany({
    include: {
      cakeFeatures: true,
    },
  })
  return cakes
}

const get_cake = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const cake = await prisma.cake.findUnique({
    where: { id },
    include: {
      cakeFeatures: true,
    },
  })
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
    include: {
      cakeFeatures: true,
    },
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
