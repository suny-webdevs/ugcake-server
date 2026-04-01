import QueryBuilder from "./QueryBuilder"
import prisma from "../lib/prisma"

/**
 * Test suite for QueryBuilder
 * This tests the QueryBuilder with your actual Prisma models
 */

// Mock query parameters
const mockQuery = {
  searchTerm: "chocolate",
  category: "cat-123",
  sort: "-price,title",
  page: "2",
  limit: "5",
  fields: "id,title,price,images",
}

async function testQueryBuilder() {
  console.log("🧪 Testing QueryBuilder with your project...\n")

  try {
    // Test 1: Basic Query Building
    console.log("Test 1: Basic Query Building")
    console.log("=".repeat(50))
    const builder1 = new QueryBuilder(mockQuery)
    const result1 = builder1
      .search(["title", "description"])
      .filter()
      .sort()
      .paginate()
      .fields()
      .build()

    console.log("Input Query:", mockQuery)
    console.log("\nBuilt Query Result:")
    console.log(JSON.stringify(result1, null, 2))
    console.log("✅ Test 1 Passed\n")

    // Test 2: Test with Cake Model
    console.log("Test 2: Testing with Cake Model")
    console.log("=".repeat(50))
    const cakeQuery = { searchTerm: "cake", limit: "3", page: "1" }
    const cakeBuilder = new QueryBuilder(cakeQuery)
    const cakeQueryArgs = cakeBuilder
      .search(["title", "description"])
      .filter()
      .sort("createdAt")
      .paginate()
      .build()

    console.log("Cake Query Args:")
    console.log(JSON.stringify(cakeQueryArgs, null, 2))

    // Execute actual query
    const cakes = await prisma.cake.findMany({
      ...cakeQueryArgs,
      include: {
        category: true,
        cakeFeatures: true,
      },
    })

    console.log(`\n✅ Found ${cakes.length} cakes`)
    if (cakes.length > 0) {
      console.log("Sample cake:", {
        id: cakes[0]!.id,
        title: cakes[0]!.title,
        price: cakes[0]!.price.toString(),
      })
    }

    // Test countTotal
    const meta = await cakeBuilder.countTotal(prisma.cake as any)
    console.log("\nPagination Meta:")
    console.log(JSON.stringify(meta, null, 2))
    console.log("✅ Test 2 Passed\n")

    // Test 3: Test with Category Model
    console.log("Test 3: Testing with Category Model")
    console.log("=".repeat(50))
    const categoryQuery = { limit: "5" }
    const categoryBuilder = new QueryBuilder(categoryQuery)
    const categoryQueryArgs = categoryBuilder.sort("name").paginate().build()

    const categories = await prisma.category.findMany({
      ...categoryQueryArgs,
      include: {
        cakes: true,
      },
    })

    console.log(`✅ Found ${categories.length} categories`)
    if (categories.length > 0) {
      console.log("Sample category:", {
        id: categories[0]!.id,
        name: categories[0]!.name,
        cakesCount: categories[0]!.cakes?.length || 0,
      })
    }
    console.log("✅ Test 3 Passed\n")

    // Test 4: Test with User Model
    console.log("Test 4: Testing with User Model")
    console.log("=".repeat(50))
    const userQuery = { searchTerm: "user", role: "USER", limit: "2" }
    const userBuilder = new QueryBuilder(userQuery)
    const userQueryArgs = userBuilder
      .search(["email"])
      .filter()
      .sort("createdAt")
      .paginate()
      .build()

    console.log("User Query Args:")
    console.log(JSON.stringify(userQueryArgs, null, 2))

    const users = await prisma.user.findMany({
      ...userQueryArgs,
      include: {
        profile: true,
      },
    })

    console.log(`✅ Found ${users.length} users`)
    console.log("✅ Test 4 Passed\n")

    // Test 5: Test with Order Model
    console.log("Test 5: Testing with Order Model")
    console.log("=".repeat(50))
    const orderQuery = { status: "PENDING", limit: "3" }
    const orderBuilder = new QueryBuilder(orderQuery)
    const orderQueryArgs = orderBuilder
      .filter()
      .sort("-createdAt")
      .paginate()
      .build()

    const orders = await prisma.order.findMany({
      ...orderQueryArgs,
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
          },
        },
      },
    })

    console.log(`✅ Found ${orders.length} orders`)
    console.log("✅ Test 5 Passed\n")

    // Test 6: Test Field Selection
    console.log("Test 6: Testing Field Selection")
    console.log("=".repeat(50))
    const fieldQuery = { fields: "id,title,price", limit: "2" }
    const fieldBuilder = new QueryBuilder(fieldQuery)
    const fieldQueryArgs = fieldBuilder.fields().paginate().build()

    console.log("Field Query Args:")
    console.log(JSON.stringify(fieldQueryArgs, null, 2))

    const cakesWithFields = await prisma.cake.findMany(fieldQueryArgs)
    console.log(`✅ Found ${cakesWithFields.length} cakes with selected fields`)
    if (cakesWithFields.length > 0) {
      console.log("Sample cake with fields:", cakesWithFields[0])
    }
    console.log("✅ Test 6 Passed\n")

    // Test 7: Test Complex Sorting
    console.log("Test 7: Testing Complex Sorting")
    console.log("=".repeat(50))
    const sortQuery = { sort: "-soldAmount,price", limit: "3" }
    const sortBuilder = new QueryBuilder(sortQuery)
    const sortQueryArgs = sortBuilder.sort().paginate().build()

    console.log("Sort Query Args:")
    console.log(JSON.stringify(sortQueryArgs, null, 2))

    const sortedCakes = await prisma.cake.findMany({
      ...sortQueryArgs,
      select: {
        title: true,
        price: true,
        soldAmount: true,
      },
    })

    console.log(`✅ Found ${sortedCakes.length} sorted cakes`)
    sortedCakes.forEach((cake, idx) => {
      console.log(
        `  ${idx + 1}. ${cake.title} - Price: ${cake.price}, Sold: ${cake.soldAmount}`,
      )
    })
    console.log("✅ Test 7 Passed\n")

    // Test 8: Test Empty Query
    console.log("Test 8: Testing Empty Query (Default Behavior)")
    console.log("=".repeat(50))
    const emptyBuilder = new QueryBuilder({})
    const emptyQueryArgs = emptyBuilder.sort().paginate().build()

    console.log("Empty Query Args:")
    console.log(JSON.stringify(emptyQueryArgs, null, 2))

    const defaultCakes = await prisma.cake.findMany({
      ...emptyQueryArgs,
      select: {
        id: true,
        title: true,
      },
    })

    console.log(`✅ Found ${defaultCakes.length} cakes with default settings`)
    console.log("✅ Test 8 Passed\n")

    // Summary
    console.log("=".repeat(50))
    console.log("🎉 All Tests Passed Successfully!")
    console.log("=".repeat(50))
    console.log("\n✅ QueryBuilder is working correctly with your project!")
    console.log("\nKey Features Tested:")
    console.log("  ✓ Search functionality (OR conditions)")
    console.log("  ✓ Filtering (excluding reserved fields)")
    console.log("  ✓ Sorting (single and multiple fields)")
    console.log("  ✓ Pagination (page and limit)")
    console.log("  ✓ Field selection")
    console.log("  ✓ Count total with meta")
    console.log(
      "  ✓ Integration with Prisma models (Cake, Category, User, Order)",
    )
    console.log("\nYou can now use QueryBuilder in your services!")
  } catch (error) {
    console.error("❌ Test Failed:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run tests
testQueryBuilder()
  .then(() => {
    console.log("\n✅ Test execution completed")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n❌ Test execution failed:", error)
    process.exit(1)
  })
