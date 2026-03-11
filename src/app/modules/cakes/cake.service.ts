import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Request } from "express"
import prisma from "../../lib/prisma"

const create_cake = async (req: Request) => {
  const body = req.body

  // Check if category exists
  const category = await prisma.category.findUnique({
    where: { name: body.category },
  })

  if (!category) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Category "${body.category}" not found`,
    )
  }

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

  // Add cake ID to category's cakes array
  await prisma.category.update({
    where: { name: body.category },
    data: {
      cakes: {
        push: cake.id,
      },
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

  // Get current cake to check if category is being changed
  const currentCake = await prisma.cake.findUnique({
    where: { id },
  })

  if (!currentCake) {
    throw new AppError(httpStatus.NOT_FOUND, "Cake not found")
  }

  // If category is being changed, handle the category array updates
  if (payload.category && payload.category !== currentCake.category) {
    // Verify new category exists
    const newCategory = await prisma.category.findUnique({
      where: { name: payload.category },
    })

    if (!newCategory) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Category "${payload.category}" not found`,
      )
    }

    // Remove cake ID from old category
    const oldCategory = await prisma.category.findUnique({
      where: { name: currentCake.category },
    })

    if (oldCategory) {
      await prisma.category.update({
        where: { name: currentCake.category },
        data: {
          cakes: {
            set: oldCategory.cakes.filter((cakeId: string) => cakeId !== id),
          },
        },
      })
    }

    // Add cake ID to new category
    await prisma.category.update({
      where: { name: payload.category },
      data: {
        cakes: {
          push: id,
        },
      },
    })
  }

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

  // Get cake to find its category
  const cake = await prisma.cake.findUnique({
    where: { id },
  })

  if (!cake) {
    throw new AppError(httpStatus.NOT_FOUND, "Cake not found")
  }

  // Remove cake ID from category's cakes array
  const category = await prisma.category.findUnique({
    where: { name: cake.category },
  })

  if (category) {
    await prisma.category.update({
      where: { name: cake.category },
      data: {
        cakes: {
          set: category.cakes.filter((cakeId: string) => cakeId !== id),
        },
      },
    })
  }

  // Delete the cake
  const deletedCake = await prisma.cake.delete({ where: { id } })
  return deletedCake
}

export const cakeService = {
  create_cake,
  get_all_cake,
  get_cake,
  update_cake,
  delete_cake,
}
