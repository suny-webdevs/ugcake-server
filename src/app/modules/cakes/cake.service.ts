import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Request } from "express"
import prisma from "../../lib/prisma"
import { uploadMultipleBuffersToCloudinary } from "../../utils/uploadPhoto"
import { Category, Prisma } from "@prisma/client"
import { ICake } from "../../interface/cake"
import { skuGenerator } from "../../utils/skuGenerator"
import QueryBuilder from "../../builder/QueryBuilder"

const create_cake = async (req: Request) => {
  const body = req.body as ICake
  const files = (req.files as Express.Multer.File[]) || []

  // Check if category exists
  const category = (await prisma.category.findUnique({
    where: { id: body.category },
  })) as Category

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, `Category not found`)
  }

  const totalCakes = await prisma.cake.count()
  const sku = skuGenerator(category.name, body.title, totalCakes)

  // Initialize imageUrls - ensure it's always an array
  let imageUrls: string[] = Array.isArray(body.images) ? body.images : []
  if (files.length > 0) {
    const uploadedImages = await uploadMultipleBuffersToCloudinary(
      files,
      "cakes",
    )
    imageUrls = uploadedImages
      .filter((img) => img?.secure_url)
      .map((img) => img!.secure_url)
  }

  const res = await prisma.$transaction(async (tx) => {
    // Create the cake
    const cake = await tx.cake.create({
      data: {
        sku: sku,
        slug: `${body.title.toLowerCase().replace(/\s+/g, "-")}`,
        title: body.title,
        description: body.description,
        images: imageUrls,
        price: new Prisma.Decimal(body.price),
        categoryId: body.category,
        type: body.cakeType.toUpperCase() as any,
        customizable: body.customizable ?? false,
        stock: Number(body.stock) ?? 0,
        size: body.weight ?? null,
        flavour: body.flavors ?? null,
        soldAmount: 0,
        isBestSeller: false,
        isDeleted: false,
      },
      include: {
        category: true,
        cakeFeatures: true,
      },
    })

    // Build CakeFeatures data, only including defined fields and ensuring arrays
    const cakeFeaturesData: any = {
      cakeId: cake.id,
    }

    // Helper function to convert string or array to array, skip if empty
    const toArray = (value: any): string[] | undefined => {
      if (Array.isArray(value) && value.length > 0) return value
      if (typeof value === "string" && value.trim()) {
        return value.split(/\s*,\s*/).filter(Boolean)
      }
      return undefined
    }

    const specLabel = toArray(body.specificationLabel)
    if (specLabel) cakeFeaturesData.specificationLabel = specLabel

    const specValue = toArray(body.specificationValue)
    if (specValue) cakeFeaturesData.specificationValue = specValue

    const features = toArray(body.features)
    if (features) cakeFeaturesData.features = features

    const nutritionLabel = toArray(body.nutritionLabel)
    if (nutritionLabel) cakeFeaturesData.nutritionLabel = nutritionLabel

    const nutritionValue = toArray(body.nutritionValue)
    if (nutritionValue) cakeFeaturesData.nutritionValue = nutritionValue

    cakeFeaturesData.cakeId = cake.id

    await tx.cakeFeatures.create({
      data: cakeFeaturesData,
    })

    return cake
  })

  return res
}

const get_all_cake = async (req: Request) => {
  const searchableFields = ["title", "sku"]

  // Extract custom filters that need special handling
  const { minPrice, maxPrice, ...restQuery } = req.query

  // Build the query
  const queryBuilder = new QueryBuilder(restQuery)
  const queryArgs = queryBuilder
    .search(searchableFields)
    .filter() // This will handle categoryId, type, customizable, isBestSeller, etc.
    .sort("createdAt") // Default sort by createdAt
    .paginate()
    .fields() // Optional field selection
    .build()

  // Build price filter if provided
  const priceFilter: any = {}
  if (minPrice) priceFilter.gte = new Prisma.Decimal(minPrice as string)
  if (maxPrice) priceFilter.lte = new Prisma.Decimal(maxPrice as string)

  // Execute the query
  const cakes = await prisma.cake.findMany({
    ...queryArgs,
    where: {
      ...queryArgs.where,
      isDeleted: false, // Always exclude deleted cakes
      ...(Object.keys(priceFilter).length > 0 && { price: priceFilter }),
    },
    include: {
      category: true,
      cakeFeatures: true,
    },
  })

  // Get pagination metadata
  const meta = await queryBuilder.countTotal(prisma.cake as any)

  return {
    data: cakes,
    meta,
  }
}

const get_cake = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const cake = await prisma.cake.findUnique({
    where: { id },
    include: {
      category: true,
      cakeFeatures: true,
    },
  })
  if (!cake) {
    throw new AppError(httpStatus.NOT_FOUND, "Cake not found")
  }
  return cake
}

const get_cake_by_slug = async (req: Request) => {
  const slug = req.params.slug ?? req.body?.slug
  const cake = await prisma.cake.findUnique({
    where: { slug },
    include: {
      category: true,
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
  const body = req.body as ICake
  const files = (req.files as Express.Multer.File[]) || []

  // Check if cake exists
  const existingCake = await prisma.cake.findUnique({
    where: { id },
  })

  if (!existingCake) {
    throw new AppError(httpStatus.NOT_FOUND, "Cake not found")
  }

  // Check if category exists
  const category = (await prisma.category.findUnique({
    where: { id: body.category },
  })) as Category

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, `Category not found`)
  }

  let imageUrls: string[] = Array.isArray(body.images) ? body.images : []
  if (files.length > 0) {
    const uploadedImages = await uploadMultipleBuffersToCloudinary(
      files,
      "cakes",
    )
    imageUrls = uploadedImages
      .filter((img) => img?.secure_url)
      .map((img) => img!.secure_url)
  }

  const res = await prisma.$transaction(async (tx) => {
    // Update the cake
    const cake = await tx.cake.update({
      where: { id },
      data: {
        slug: `${body.title.toLowerCase().replace(/\s+/g, "-")}`,
        title: body.title,
        description: body.description,
        images: imageUrls,
        price: new Prisma.Decimal(body.price),
        categoryId: body.category,
        type: body.cakeType.toUpperCase() as any,
        customizable: body.customizable ?? false,
        stock: Number(body.stock) ?? 0,
        size: body.weight ?? null,
        flavour: body.flavors ?? null,
      },
      include: {
        category: true,
        cakeFeatures: true,
      },
    })

    // Helper function to convert string or array to array, skip if empty
    const toArray = (value: any): string[] | undefined => {
      if (Array.isArray(value) && value.length > 0) return value
      if (typeof value === "string" && value.trim()) {
        return value.split(/\s*,\s*/).filter(Boolean)
      }
      return undefined
    }

    // Build CakeFeatures data, only including defined fields
    const cakeFeaturesData: any = {}

    const specLabel = toArray(body.specificationLabel)
    if (specLabel) cakeFeaturesData.specificationLabel = specLabel

    const specValue = toArray(body.specificationValue)
    if (specValue) cakeFeaturesData.specificationValue = specValue

    const features = toArray(body.features)
    if (features) cakeFeaturesData.features = features

    const nutritionLabel = toArray(body.nutritionLabel)
    if (nutritionLabel) cakeFeaturesData.nutritionLabel = nutritionLabel

    const nutritionValue = toArray(body.nutritionValue)
    if (nutritionValue) cakeFeaturesData.nutritionValue = nutritionValue

    // Update or create cake features
    if (Object.keys(cakeFeaturesData).length > 0) {
      await tx.cakeFeatures.upsert({
        where: { cakeId: id },
        update: cakeFeaturesData,
        create: {
          cakeId: id,
          ...cakeFeaturesData,
        },
      })
    }

    return cake
  })

  return res
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

  // Delete the cake
  const deletedCake = await prisma.cake.update({
    where: { id },
    data: { isDeleted: true },
  })
  return deletedCake
}

const get_best_sellers = async (req: Request) => {
  const queryBuilder = new QueryBuilder(req.query)
  const queryArgs = queryBuilder
    .filter() // Allow filtering by categoryId, type, etc.
    .sort("-soldAmount") // Sort by most sold
    .paginate()
    .build()

  const cakes = await prisma.cake.findMany({
    ...queryArgs,
    where: {
      ...queryArgs.where,
      isDeleted: false,
      isBestSeller: true,
    },
    include: {
      category: true,
      cakeFeatures: true,
    },
  })

  return cakes
}

/**
 * Enhanced: Get cakes by category with pagination
 *
 * Example API calls:
 * GET /api/cakes/category/xxx?sort=-price&page=1&limit=12
 */
const get_cakes_by_category = async (req: Request) => {
  const categoryId = req.params.id as string

  const searchableFields = ["title", "description"]
  const queryBuilder = new QueryBuilder(req.query)
  const queryArgs = queryBuilder
    .search(searchableFields)
    .sort("-createdAt")
    .paginate()
    .build()

  const cakes = await prisma.cake.findMany({
    ...queryArgs,
    where: {
      ...queryArgs.where,
      categoryId,
      isDeleted: false,
    },
    include: {
      category: true,
      cakeFeatures: true,
    },
  })

  const meta = await queryBuilder.countTotal(prisma.cake as any)

  return {
    data: cakes,
    meta,
  }
}

/**
 * Enhanced: Search cakes with advanced filters
 *
 * Example API calls:
 * GET /api/cakes/search?searchTerm=birthday&type=CAKE&customizable=true&minPrice=200&maxPrice=1000&sort=-soldAmount
 */
const search_cakes = async (req: Request) => {
  const searchableFields = ["title", "description", "sku"]
  const { minPrice, maxPrice, ...restQuery } = req.query

  const queryBuilder = new QueryBuilder(restQuery)
  const queryArgs = queryBuilder
    .search(searchableFields)
    .filter()
    .sort("-soldAmount")
    .paginate()
    .build()

  // Build price filter
  const priceFilter: any = {}
  if (minPrice) priceFilter.gte = new Prisma.Decimal(minPrice as string)
  if (maxPrice) priceFilter.lte = new Prisma.Decimal(maxPrice as string)

  const cakes = await prisma.cake.findMany({
    ...queryArgs,
    where: {
      ...queryArgs.where,
      isDeleted: false,
      ...(Object.keys(priceFilter).length > 0 && { price: priceFilter }),
    },
    include: {
      category: true,
      cakeFeatures: true,
      _count: {
        select: {
          ratings: true,
        },
      },
    },
  })

  const meta = await queryBuilder.countTotal(prisma.cake as any)

  return {
    data: cakes,
    meta,
  }
}

export const cakeService = {
  create_cake,
  get_all_cake,
  get_cake,
  get_cake_by_slug,
  update_cake,
  delete_cake,
}
