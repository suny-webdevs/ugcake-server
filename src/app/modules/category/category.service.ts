import prisma from "../../lib/prisma"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Request } from "express"
import { uploadBufferToCloudinary } from "../../utils/uploadPhoto"
import { ICloudinaryResponse } from "../../interface/file"
import { Category } from "@prisma/client"

const create_category = async (req: Request) => {
  const { name, description } = req.body

  if (!name) {
    throw new Error("Category name is required")
  }

  let imageUrl: string | null = null

  if (req.file) {
    const uploaded = (await uploadBufferToCloudinary(
      req.file,
      "categories",
    )) as ICloudinaryResponse
    imageUrl = uploaded.secure_url
  }

  // Check if category with the same name already exists
  const category = (await prisma.category.create({
    data: {
      slug: `${name.toLowerCase().replace(/\s+/g, "-")}`,
      name: name,
      image: imageUrl,
      description: description === "" ? "" : description,
    },
    include: {
      cakes: true,
    },
  })) as Category

  return category
}

const get_all_categories = async () => {
  const categories = await prisma.category.findMany({
    include: {
      cakes: true,
    },
  })
  return categories
}

const get_category = async (req: Request) => {
  const id = req.params.id as string
  const category = (await prisma.category.findUnique({
    where: { id },
    include: { cakes: true },
  })) as Category

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found")
  }

  return category
}

const get_category_by_slug = async (req: Request) => {
  const slug = req.params.slug as string
  const category = (await prisma.category.findUnique({
    where: { slug },
    include: { cakes: true },
  })) as Category

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found")
  }

  return category
}

const update_category = async (req: Request) => {
  const id = req.params.id as string
  const { payload } = req.body
  const category = await prisma.category.update({
    where: { id },
    data: payload,
    include: {
      cakes: true,
    },
  })
  return category
}

const delete_category = async (req: Request) => {
  const id = req.params.id as string
  const category = await prisma.category.delete({
    where: { id },
    include: { cakes: true },
  })
  return category
}

export const categoryService = {
  create_category,
  get_all_categories,
  get_category,
  get_category_by_slug,
  update_category,
  delete_category,
}
