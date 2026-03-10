import prisma from "../../lib/prisma"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Request } from "express"

const create_category = async (req: Request) => {
  const body = req.body

  const category = await prisma.category.create({
    data: {
      name: body.name,
      image: body.image ?? null,
      cakes: body.cakes ?? [],
    },
  })

  return category
}

const get_all_categories = async () => {
  const categories = await prisma.category.findMany()
  return categories
}

const get_category = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const category = await prisma.category.findUnique({ where: { id } })
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found")
  }
  return category
}

const get_category_by_name = async (name: string) => {
  const category = await prisma.category.findUnique({ where: { name } })
  return category
}

const update_category = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const { payload } = req.body
  const category = await prisma.category.update({
    where: { id },
    data: payload,
  })
  return category
}

const delete_category = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const category = await prisma.category.delete({ where: { id } })
  return category
}

export const categoryService = {
  create_category,
  get_all_categories,
  get_category,
  get_category_by_name,
  update_category,
  delete_category,
}
