import prisma from "../../lib/prisma"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Request } from "express"

const create_cake_features = async (req: Request) => {
  const body = req.body

  const cakeFeatures = await prisma.cakeFeatures.create({
    data: {
      cakeId: body.cakeId,
      specificationLabel: body.specificationsLabel ?? [],
      specificationValue: body.specificationValue ?? [],
      features: body.features ?? [],
      nutritionLabel: body.nutritionLabel ?? [],
      nutritionValue: body.nutritionValue ?? [],
    },
  })

  return cakeFeatures
}

const get_all_cake_features = async () => {
  const cakeFeatures = await prisma.cakeFeatures.findMany({
    include: { cake: true },
  })
  return cakeFeatures
}

const get_cake_features = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const cakeFeatures = await prisma.cakeFeatures.findUnique({
    where: { id },
    include: { cake: true },
  })
  if (!cakeFeatures) {
    throw new AppError(httpStatus.NOT_FOUND, "Cake features not found")
  }
  return cakeFeatures
}

const get_cake_features_by_cake = async (cakeId: string) => {
  const cakeFeatures = await prisma.cakeFeatures.findUnique({
    where: { cakeId },
    include: { cake: true },
  })
  return cakeFeatures
}

const update_cake_features = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const { payload } = req.body
  const cakeFeatures = await prisma.cakeFeatures.update({
    where: { id },
    data: payload,
    include: { cake: true },
  })
  return cakeFeatures
}

const delete_cake_features = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const cakeFeatures = await prisma.cakeFeatures.delete({ where: { id } })
  return cakeFeatures
}

export const cakeFeaturesService = {
  create_cake_features,
  get_all_cake_features,
  get_cake_features,
  get_cake_features_by_cake,
  update_cake_features,
  delete_cake_features,
}
