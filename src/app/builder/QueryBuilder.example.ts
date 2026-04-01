/**
 * Example: How to use QueryBuilder in your services
 *
 * This file demonstrates how to integrate QueryBuilder
 * into your existing service files for advanced querying.
 */

import { Request } from "express"
import prisma from "../lib/prisma"
import QueryBuilder from "./QueryBuilder"

/**
 * Example 1: Get all cakes with search, filter, sort, and pagination
 *
 * Usage:
 * GET /api/cakes?searchTerm=chocolate&categoryId=xxx&sort=-price&page=1&limit=10
 */
export const getAllCakesWithQueryBuilder = async (req: Request) => {
  // Define searchable fields for the Cake model
  const searchableFields = ["title", "description", "sku"]

  // Build the query
  const queryBuilder = new QueryBuilder(req.query)
  const queryArgs = queryBuilder
    .search(searchableFields)
    .filter() // Automatically filters out searchTerm, sort, limit, page, fields
    .sort("createdAt") // Default sort by createdAt
    .paginate()
    .fields() // Optional: allow field selection
    .build()

  // Execute the query
  const cakes = await prisma.cake.findMany({
    ...queryArgs,
    where: {
      ...queryArgs.where,
      isDeleted: false, // Add additional conditions
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

/**
 * Example 2: Get all categories with pagination
 *
 * Usage:
 * GET /api/categories?searchTerm=birthday&sort=name&page=1&limit=5
 */
export const getAllCategoriesWithQueryBuilder = async (req: Request) => {
  const searchableFields = ["name"]

  const queryBuilder = new QueryBuilder(req.query)
  const queryArgs = queryBuilder
    .search(searchableFields)
    .filter()
    .sort("name")
    .paginate()
    .build()

  const categories = await prisma.category.findMany({
    ...queryArgs,
    include: {
      cakes: {
        where: { isDeleted: false },
        take: 5, // Limit cakes per category
      },
    },
  })

  const meta = await queryBuilder.countTotal(prisma.category as any)

  return {
    data: categories,
    meta,
  }
}

/**
 * Example 3: Get all orders with filters
 *
 * Usage:
 * GET /api/orders?status=PENDING&userId=xxx&sort=-createdAt&page=1&limit=10
 */
export const getAllOrdersWithQueryBuilder = async (req: Request) => {
  const queryBuilder = new QueryBuilder(req.query)
  const queryArgs = queryBuilder
    .filter() // Will include status, userId, etc.
    .sort("-createdAt")
    .paginate()
    .build()

  const orders = await prisma.order.findMany({
    ...queryArgs,
    include: {
      user: {
        include: {
          profile: true,
        },
      },
      cake: {
        select: {
          title: true,
          price: true,
          images: true,
        },
      },
      cakeDetails: true,
    },
  })

  const meta = await queryBuilder.countTotal(prisma.order as any)

  return {
    data: orders,
    meta,
  }
}

/**
 * Example 4: Get all users with search and role filter
 *
 * Usage:
 * GET /api/users?searchTerm=john&role=USER&sort=createdAt&page=1&limit=10
 */
export const getAllUsersWithQueryBuilder = async (req: Request) => {
  const searchableFields = ["email"]

  const queryBuilder = new QueryBuilder(req.query)
  const queryArgs = queryBuilder
    .search(searchableFields)
    .filter()
    .sort("createdAt")
    .paginate()
    .build()

  const users = await prisma.user.findMany({
    ...queryArgs,
    where: {
      ...queryArgs.where,
      isDeleted: false,
    },
    include: {
      profile: true,
      _count: {
        select: {
          orders: true,
          ratings: true,
        },
      },
    },
  })

  const meta = await queryBuilder.countTotal(prisma.user as any)

  return {
    data: users,
    meta,
  }
}

/**
 * Example 5: Get best-selling cakes
 *
 * Usage:
 * GET /api/cakes/best-sellers?limit=10
 */
export const getBestSellingCakes = async (req: Request) => {
  const queryBuilder = new QueryBuilder(req.query)
  const queryArgs = queryBuilder
    .sort("-soldAmount") // Sort by most sold
    .paginate()
    .build()

  const cakes = await prisma.cake.findMany({
    ...queryArgs,
    where: {
      isDeleted: false,
      isBestSeller: true,
    },
    include: {
      category: true,
    },
  })

  return cakes
}

/**
 * Example 6: Advanced filtering with custom conditions
 *
 * Usage:
 * GET /api/cakes?searchTerm=chocolate&minPrice=100&maxPrice=500&customizable=true
 */
export const getAdvancedCakeSearch = async (req: Request) => {
  const searchableFields = ["title", "description"]
  const { minPrice, maxPrice, ...restQuery } = req.query

  const queryBuilder = new QueryBuilder(restQuery)
  const queryArgs = queryBuilder
    .search(searchableFields)
    .filter()
    .sort("-createdAt")
    .paginate()
    .build()

  // Add custom price range filter
  const priceFilter: any = {}
  if (minPrice) priceFilter.gte = Number(minPrice)
  if (maxPrice) priceFilter.lte = Number(maxPrice)

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
    },
  })

  const meta = await queryBuilder.countTotal(prisma.cake as any)

  return {
    data: cakes,
    meta,
  }
}

/**
 * How to integrate into your existing service:
 *
 * 1. Import QueryBuilder:
 *    import QueryBuilder from "../../builder/QueryBuilder"
 *
 * 2. Replace your existing get_all_cake function:
 *    const get_all_cake = async (req: Request) => {
 *      const searchableFields = ["title", "description", "sku"]
 *      const queryBuilder = new QueryBuilder(req.query)
 *      const queryArgs = queryBuilder
 *        .search(searchableFields)
 *        .filter()
 *        .sort("createdAt")
 *        .paginate()
 *        .build()
 *
 *      const cakes = await prisma.cake.findMany({
 *        ...queryArgs,
 *        where: { ...queryArgs.where, isDeleted: false },
 *        include: { category: true, cakeFeatures: true },
 *      })
 *
 *      const meta = await queryBuilder.countTotal(prisma.cake as any)
 *      return { data: cakes, meta }
 *    }
 *
 * 3. Update your controller to handle the new response format:
 *    const result = await cakeService.get_all_cake(req)
 *    sendResponse(res, {
 *      statusCode: httpStatus.OK,
 *      success: true,
 *      message: "Cakes retrieved successfully",
 *      data: result.data,
 *      meta: result.meta,
 *    })
 */

/**
 * Supported Query Parameters:
 *
 * - searchTerm: Search across specified fields (case-insensitive)
 * - sort: Sort by fields (prefix with - for descending)
 *   Examples: sort=price, sort=-price, sort=-soldAmount,price
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 10)
 * - fields: Select specific fields (comma-separated)
 *   Example: fields=id,title,price
 * - Any other field: Direct filter
 *   Examples: categoryId=xxx, status=PENDING, customizable=true
 */
