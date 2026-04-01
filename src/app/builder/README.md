# QueryBuilder Documentation

## Overview

The `QueryBuilder` class is a powerful utility for building Prisma queries from HTTP request query parameters. It provides a fluent API for search, filtering, sorting, pagination, and field selection.

## ✅ Compatibility with Your Project

**YES, the QueryBuilder works perfectly with your project!** It has been tested with your Prisma models:

- ✅ Cake
- ✅ Category
- ✅ User
- ✅ Order
- ✅ Rating
- ✅ Profile

## Features

### 1. **Search** 🔍

Search across multiple fields with case-insensitive matching using OR conditions.

```typescript
const queryBuilder = new QueryBuilder(req.query)
const queryArgs = queryBuilder.search(["title", "description", "sku"]).build()

// Query: ?searchTerm=chocolate
// Result: WHERE (title ILIKE '%chocolate%' OR description ILIKE '%chocolate%' OR sku ILIKE '%chocolate%')
```

### 2. **Filter** 🎯

Automatically filter by any field in the query parameters (excludes reserved fields).

```typescript
const queryBuilder = new QueryBuilder(req.query)
const queryArgs = queryBuilder.filter().build()

// Query: ?categoryId=xxx&customizable=true&type=CAKE
// Result: WHERE categoryId = 'xxx' AND customizable = true AND type = 'CAKE'
```

Reserved fields (automatically excluded):

- `searchTerm`
- `sort`
- `limit`
- `page`
- `fields`

### 3. **Sort** 📊

Sort by one or multiple fields in ascending or descending order.

```typescript
const queryBuilder = new QueryBuilder(req.query)
const queryArgs = queryBuilder
  .sort("createdAt") // Default sort
  .build()

// Query: ?sort=-price,title
// Result: ORDER BY price DESC, title ASC

// Query: ?sort=soldAmount
// Result: ORDER BY soldAmount ASC

// No sort param: Uses default (createdAt DESC)
```

### 4. **Pagination** 📄

Paginate results with page and limit parameters.

```typescript
const queryBuilder = new QueryBuilder(req.query)
const queryArgs = queryBuilder.paginate().build()

// Query: ?page=2&limit=20
// Result: SKIP 20 TAKE 20

// Defaults: page=1, limit=10
```

### 5. **Field Selection** 🎨

Select specific fields to return (reduces data transfer).

```typescript
const queryBuilder = new QueryBuilder(req.query)
const queryArgs = queryBuilder.fields().build()

// Query: ?fields=id,title,price,images
// Result: SELECT id, title, price, images
```

### 6. **Count Total** 🔢

Get pagination metadata including total count and pages.

```typescript
const queryBuilder = new QueryBuilder(req.query)
const meta = await queryBuilder.countTotal(prisma.cake as any)

// Returns:
// {
//   page: 1,
//   limit: 10,
//   total: 45,
//   totalPage: 5
// }
```

## Usage Examples

### Example 1: Basic Cake Search

```typescript
import QueryBuilder from "../../builder/QueryBuilder"
import prisma from "../../lib/prisma"

const get_all_cake = async (req: Request) => {
  const searchableFields = ["title", "description", "sku"]

  const queryBuilder = new QueryBuilder(req.query)
  const queryArgs = queryBuilder
    .search(searchableFields)
    .filter()
    .sort("createdAt")
    .paginate()
    .build()

  const cakes = await prisma.cake.findMany({
    ...queryArgs,
    where: {
      ...queryArgs.where,
      isDeleted: false,
    },
    include: {
      category: true,
      cakeFeatures: true,
    },
  })

  const meta = await queryBuilder.countTotal(prisma.cake as any)

  return { data: cakes, meta }
}
```

**API Call:**

```
GET /api/cakes?searchTerm=chocolate&categoryId=xxx&sort=-price&page=1&limit=10
```

### Example 2: Category Listing

```typescript
const get_all_categories = async (req: Request) => {
  const searchableFields = ["name"]

  const queryBuilder = new QueryBuilder(req.query)
  const queryArgs = queryBuilder
    .search(searchableFields)
    .sort("name")
    .paginate()
    .build()

  const categories = await prisma.category.findMany({
    ...queryArgs,
    include: {
      cakes: {
        where: { isDeleted: false },
      },
    },
  })

  const meta = await queryBuilder.countTotal(prisma.category as any)

  return { data: categories, meta }
}
```

**API Call:**

```
GET /api/categories?searchTerm=birthday&sort=name&page=1&limit=5
```

### Example 3: Order Management

```typescript
const get_all_orders = async (req: Request) => {
  const queryBuilder = new QueryBuilder(req.query)
  const queryArgs = queryBuilder.filter().sort("-createdAt").paginate().build()

  const orders = await prisma.order.findMany({
    ...queryArgs,
    include: {
      user: {
        include: {
          profile: true,
        },
      },
      cake: true,
      cakeDetails: true,
    },
  })

  const meta = await queryBuilder.countTotal(prisma.order as any)

  return { data: orders, meta }
}
```

**API Call:**

```
GET /api/orders?status=PENDING&userId=xxx&sort=-createdAt&page=1&limit=10
```

### Example 4: Advanced Filtering

```typescript
const getAdvancedCakeSearch = async (req: Request) => {
  const searchableFields = ["title", "description"]
  const { minPrice, maxPrice, ...restQuery } = req.query

  const queryBuilder = new QueryBuilder(restQuery)
  const queryArgs = queryBuilder
    .search(searchableFields)
    .filter()
    .sort("-soldAmount")
    .paginate()
    .build()

  // Add custom price range
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

  return { data: cakes, meta }
}
```

**API Call:**

```
GET /api/cakes/search?searchTerm=chocolate&minPrice=100&maxPrice=500&customizable=true&sort=-soldAmount
```

## Query Parameter Reference

| Parameter    | Type   | Description                          | Example                          |
| ------------ | ------ | ------------------------------------ | -------------------------------- |
| `searchTerm` | string | Search across specified fields       | `?searchTerm=chocolate`          |
| `sort`       | string | Sort by fields (prefix `-` for DESC) | `?sort=-price,title`             |
| `page`       | number | Page number (default: 1)             | `?page=2`                        |
| `limit`      | number | Items per page (default: 10)         | `?limit=20`                      |
| `fields`     | string | Select specific fields               | `?fields=id,title,price`         |
| Any other    | any    | Direct filter on that field          | `?categoryId=xxx&status=PENDING` |

## Integration Guide

### Step 1: Update Your Service

Replace your existing `get_all_*` functions:

**Before:**

```typescript
const get_all_cake = async () => {
  const cakes = await prisma.cake.findMany({
    include: {
      category: true,
      cakeFeatures: true,
    },
  })
  return cakes
}
```

**After:**

```typescript
const get_all_cake = async (req: Request) => {
  const searchableFields = ["title", "description", "sku"]

  const queryBuilder = new QueryBuilder(req.query)
  const queryArgs = queryBuilder
    .search(searchableFields)
    .filter()
    .sort("createdAt")
    .paginate()
    .build()

  const cakes = await prisma.cake.findMany({
    ...queryArgs,
    where: {
      ...queryArgs.where,
      isDeleted: false,
    },
    include: {
      category: true,
      cakeFeatures: true,
    },
  })

  const meta = await queryBuilder.countTotal(prisma.cake as any)

  return { data: cakes, meta }
}
```

### Step 2: Update Your Controller

Update the controller to pass the request and handle the new response format:

**Before:**

```typescript
const getAllCakes = catchAsync(async (req: Request, res: Response) => {
  const result = await cakeService.get_all_cake()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cakes retrieved successfully",
    data: result,
  })
})
```

**After:**

```typescript
const getAllCakes = catchAsync(async (req: Request, res: Response) => {
  const result = await cakeService.get_all_cake(req)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cakes retrieved successfully",
    data: result.data,
    meta: result.meta,
  })
})
```

### Step 3: Update Response Type (Optional)

Update your `sendResponse` utility to support meta:

```typescript
type TResponse<T> = {
  statusCode: number
  success: boolean
  message?: string
  data: T
  meta?: {
    page: number
    limit: number
    total: number
    totalPage: number
  }
}
```

## Testing

Run the test suite to verify QueryBuilder works with your project:

```bash
npx tsx src/app/builder/QueryBuilder.test.ts
```

The test suite covers:

- ✅ Basic query building
- ✅ Cake model integration
- ✅ Category model integration
- ✅ User model integration
- ✅ Order model integration
- ✅ Field selection
- ✅ Complex sorting
- ✅ Empty query (default behavior)

## API Response Format

With QueryBuilder, your API responses will include pagination metadata:

```json
{
  "success": true,
  "message": "Cakes retrieved successfully",
  "data": [
    {
      "id": "xxx",
      "title": "Chocolate Cake",
      "price": 299.99,
      "category": { ... },
      "cakeFeatures": { ... }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPage": 5
  }
}
```

## Benefits

1. **Consistent API**: All your endpoints will have the same query parameter structure
2. **Less Code**: No need to manually handle search, filter, sort, and pagination
3. **Type-Safe**: Works seamlessly with Prisma's type system
4. **Flexible**: Easy to add custom filters and conditions
5. **Performance**: Supports field selection to reduce data transfer
6. **User-Friendly**: Intuitive query parameters for frontend developers

## Common Use Cases

### 1. E-commerce Product Listing

```
GET /api/cakes?searchTerm=birthday&categoryId=xxx&minPrice=100&maxPrice=500&sort=-soldAmount&page=1&limit=12
```

### 2. Admin Dashboard - Order Management

```
GET /api/orders?status=PENDING&sort=-createdAt&page=1&limit=20
```

### 3. User Management

```
GET /api/users?searchTerm=john&role=USER&sort=createdAt&page=1&limit=10
```

### 4. Category Browse

```
GET /api/categories?sort=name&limit=50
```

### 5. Best Sellers

```
GET /api/cakes?isBestSeller=true&sort=-soldAmount&limit=10
```

## Troubleshooting

### Issue: TypeScript error with countTotal

**Solution:** Cast the Prisma model to `any`:

```typescript
const meta = await queryBuilder.countTotal(prisma.cake as any)
```

### Issue: Custom filters not working

**Solution:** Merge custom filters with queryArgs.where:

```typescript
const cakes = await prisma.cake.findMany({
  ...queryArgs,
  where: {
    ...queryArgs.where,
    isDeleted: false, // Your custom filter
  },
})
```

### Issue: Field selection not working with relations

**Solution:** Field selection only works on the main model. Use `include` or `select` for relations:

```typescript
const cakes = await prisma.cake.findMany({
  ...queryArgs,
  include: {
    category: true, // Relations are not affected by field selection
  },
})
```

## Conclusion

The QueryBuilder is fully compatible with your project and ready to use! It will significantly improve your API's flexibility and reduce boilerplate code. Start by integrating it into one service (like cakes) and gradually roll it out to other services.

For more examples, see [`QueryBuilder.example.ts`](./QueryBuilder.example.ts).
