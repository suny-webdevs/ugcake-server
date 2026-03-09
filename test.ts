import http from "http"
import { promises as fs } from "fs"
import path from "path"

const BASE_URL = "http://localhost:5555"
const API_BASE = `${BASE_URL}/api/v1`
const RESULTS_FILE = path.join(process.cwd(), "TEST.md")

interface TestResult {
  endpoint: string
  method: string
  name: string
  status: number
  statusText: string
  success: boolean
  response?: string
  error?: string
  timestamp: string
  category: string
}

const testResults: TestResult[] = []
let registeredUserId = ""
let registeredUserEmail = ""
let createdCakeId = ""
let createdCartId = ""
let createdOrderId = ""
let createdRatingId = ""
let authToken = ""

function makeRequest(
  url: string,
  method: string = "GET",
  body?: string,
  headers?: Record<string, string>,
): Promise<{ status: number; statusText: string; data: string }> {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const defaultHeaders = {
      "Content-Type": "application/json",
    }
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 5555,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: { ...defaultHeaders, ...headers },
    }

    const req = http.request(options, (res) => {
      let data = ""
      res.on("data", (chunk) => {
        data += chunk
      })
      res.on("end", () => {
        resolve({
          status: res.statusCode || 0,
          statusText: res.statusMessage || "",
          data: data,
        })
      })
    })

    req.on("error", (error) => {
      reject(error)
    })

    if (body) {
      req.write(body)
    }
    req.end()
  })
}

async function runTests() {
  console.log("🚀 Starting Comprehensive API Tests...")
  console.log(`⏰ ${new Date().toISOString()}\n`)

  // Generate unique email for tests
  const uniqueEmail = `testuser${Date.now()}@example.com`
  registeredUserEmail = uniqueEmail

  // Reorganized test cases: CREATE, GET, UPDATE, DELETE for each module
  const tests = [
    // ======================
    // SYSTEM TESTS
    // ======================
    {
      endpoint: `${BASE_URL}/`,
      method: "GET",
      name: "Server Health Check",
      category: "System",
      body: undefined,
    },

    // ======================
    // AUTHENTICATION TESTS
    // ======================
    {
      endpoint: `${API_BASE}/auth/register`,
      method: "POST",
      name: "User Registration",
      category: "Authentication",
      body: JSON.stringify({
        email: uniqueEmail,
        password: "SecurePassword123!",
        name: "Test User",
      }),
    },
    {
      endpoint: `${API_BASE}/auth/login`,
      method: "POST",
      name: "User Login",
      category: "Authentication",
      body: JSON.stringify({
        email: uniqueEmail,
        password: "SecurePassword123!",
      }),
    },
    {
      endpoint: `${API_BASE}/auth/login`,
      method: "POST",
      name: "Login with Invalid Credentials (Negative Test)",
      category: "Authentication",
      body: JSON.stringify({
        email: uniqueEmail,
        password: "WrongPassword",
      }),
    },

    // ======================
    // CAKES - CREATE
    // ======================
    {
      endpoint: `${API_BASE}/cakes/create-cake`,
      method: "POST",
      name: "CREATE Cake",
      category: "Cakes",
      body: JSON.stringify({
        sku: `TEST-CAKE-${Date.now()}`,
        title: "Test Chocolate Cake",
        description: "Delicious chocolate cake for testing",
        price: 25.99,
        avatar: "https://example.com/cake.jpg",
        type: "Chocolate",
        flavors: ["Chocolate", "Vanilla"],
        weights: ["500g", "1kg", "2kg"],
        features: ["Eggless", "Fresh"],
        additionalImages: ["https://example.com/img1.jpg"],
        category: "Chocolate",
        stock: 10,
        specificationLabel: [],
        specificationValue: [],
      }),
    },

    // ======================
    // CARTS - CREATE
    // ======================
    {
      endpoint: `${API_BASE}/carts/create-cart`,
      method: "POST",
      name: "CREATE Cart",
      category: "Carts",
      body: JSON.stringify({
        cakeId: "#CAKE_ID#",
        quantity: 2,
      }),
    },

    // ======================
    // ORDERS - CREATE
    // ======================
    {
      endpoint: `${API_BASE}/orders/create-order`,
      method: "POST",
      name: "CREATE Order",
      category: "Orders",
      body: JSON.stringify({
        userId: "#USER_ID#",
        cakeId: "#CAKE_ID#",
        quantity: 2,
        totalPrice: 51.98,
        status: "PENDING",
        paymentMethod: "COD",
      }),
    },

    // ======================
    // RATINGS - CREATE
    // ======================
    {
      endpoint: `${API_BASE}/ratings/create-rating`,
      method: "POST",
      name: "CREATE Rating",
      category: "Ratings",
      body: JSON.stringify({
        cakeId: "#CAKE_ID#",
        userId: "#USER_ID#",
        rating: 5,
        review: "Excellent cake! Highly recommended.",
      }),
    },

    // ======================
    // CAKES - GET/UPDATE
    // ======================
    {
      endpoint: `${API_BASE}/cakes`,
      method: "GET",
      name: "GET All Cakes",
      category: "Cakes",
      body: undefined,
    },
    {
      endpoint: `${API_BASE}/cakes/update-cake/#CAKE_ID#`,
      method: "PATCH",
      name: "UPDATE Cake",
      category: "Cakes",
      body: JSON.stringify({
        payload: {
          price: 29.99,
          stock: 5,
        },
      }),
    },

    // ======================
    // CARTS - GET/UPDATE
    // ======================
    {
      endpoint: `${API_BASE}/carts`,
      method: "GET",
      name: "GET All Carts",
      category: "Carts",
      body: undefined,
    },
    {
      endpoint: `${API_BASE}/carts/update-cart/#CART_ID#`,
      method: "PATCH",
      name: "UPDATE Cart",
      category: "Carts",
      body: JSON.stringify({
        id: "#CART_ID#",
        payload: {
          quantity: 5,
        },
      }),
    },

    // ======================
    // ORDERS - GET/UPDATE
    // ======================
    {
      endpoint: `${API_BASE}/orders`,
      method: "GET",
      name: "GET All Orders",
      category: "Orders",
      body: undefined,
    },
    {
      endpoint: `${API_BASE}/orders/update-order/#ORDER_ID#`,
      method: "PATCH",
      name: "UPDATE Order",
      category: "Orders",
      body: JSON.stringify({
        payload: {
          status: "PROCESSING",
        },
      }),
    },

    // ======================
    // RATINGS - GET/UPDATE
    // ======================
    {
      endpoint: `${API_BASE}/ratings`,
      method: "GET",
      name: "GET All Ratings",
      category: "Ratings",
      body: undefined,
    },
    {
      endpoint: `${API_BASE}/ratings/update-rating/#RATING_ID#`,
      method: "PATCH",
      name: "UPDATE Rating",
      category: "Ratings",
      body: JSON.stringify({
        payload: {
          rating: 4,
          review: "Very good cake!",
        },
      }),
    },

    // ======================
    // DELETE OPERATIONS (in dependency order)
    // ======================
    {
      endpoint: `${API_BASE}/carts/delete-cart/#CART_ID#`,
      method: "DELETE",
      name: "DELETE Cart",
      category: "Carts",
      body: JSON.stringify({
        id: "#CART_ID#",
      }),
    },
    {
      endpoint: `${API_BASE}/orders/delete-order/#ORDER_ID#`,
      method: "DELETE",
      name: "DELETE Order",
      category: "Orders",
      body: undefined,
    },
    {
      endpoint: `${API_BASE}/ratings/delete-rating/#RATING_ID#`,
      method: "DELETE",
      name: "DELETE Rating",
      category: "Ratings",
      body: undefined,
    },
    {
      endpoint: `${API_BASE}/cakes/delete-cake/#CAKE_ID#`,
      method: "DELETE",
      name: "DELETE Cake",
      category: "Cakes",
      body: undefined,
    },

    // ======================
    // SYSTEM - NEGATIVE TEST
    // ======================
    {
      endpoint: `${API_BASE}/nonexistent`,
      method: "GET",
      name: "Invalid Endpoint (Negative Test)",
      category: "System",
      body: undefined,
    },
  ]

  for (const test of tests) {
    try {
      // Replace placeholder IDs with actual IDs
      let endpoint = test.endpoint
      let body = test.body

      endpoint = endpoint.replace("#USER_ID#", registeredUserId)
      endpoint = endpoint.replace("#CAKE_ID#", createdCakeId)
      endpoint = endpoint.replace("#CART_ID#", createdCartId)
      endpoint = endpoint.replace("#ORDER_ID#", createdOrderId)
      endpoint = endpoint.replace("#RATING_ID#", createdRatingId)

      if (body) {
        body = body.replace(/#USER_ID#/g, registeredUserId)
        body = body.replace(/#CAKE_ID#/g, createdCakeId)
        body = body.replace(/#CART_ID#/g, createdCartId)
        body = body.replace(/#ORDER_ID#/g, createdOrderId)
        body = body.replace(/#RATING_ID#/g, createdRatingId)
      }

      console.log(`Testing: ${test.category} - ${test.name} [${test.method}]`)

      // Prepare headers - include auth token for protected endpoints
      const headers: Record<string, string> = {}
      if (
        (test.name === "CREATE Cart" || test.name.includes("Cart")) &&
        authToken
      ) {
        headers["Authorization"] = authToken
      }

      const response = await makeRequest(endpoint, test.method, body, headers)

      let parsedData: any
      try {
        parsedData = JSON.parse(response.data)
        // Store IDs for subsequent operations
        if (test.name === "User Registration" && parsedData.data?.id) {
          registeredUserId = parsedData.data.id
        } else if (test.name === "User Login" && parsedData.data?.token) {
          authToken = parsedData.data.token
        } else if (test.name === "CREATE Cake" && parsedData.data?.id) {
          createdCakeId = parsedData.data.id
        } else if (test.name === "CREATE Cart" && parsedData.data?.id) {
          createdCartId = parsedData.data.id
        } else if (test.name === "CREATE Order" && parsedData.data?.id) {
          createdOrderId = parsedData.data.id
        } else if (test.name === "CREATE Rating" && parsedData.data?.id) {
          createdRatingId = parsedData.data.id
        }
      } catch (e) {
        parsedData = response.data
      }

      const result: TestResult = {
        endpoint: test.endpoint,
        method: test.method,
        name: test.name,
        status: response.status,
        statusText: response.statusText,
        success:
          (response.status >= 200 && response.status < 300) ||
          (test.name.includes("Invalid") && response.status >= 400),
        response: response.data.substring(0, 500),
        timestamp: new Date().toISOString(),
        category: test.category,
      }

      testResults.push(result)
      const statusIcon = result.success ? "✅" : "⚠️"
      console.log(
        `${statusIcon} Status: ${response.status} ${response.statusText}\n`,
      )
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.log(`❌ Error: ${errorMessage}\n`)

      const result: TestResult = {
        endpoint: test.endpoint,
        method: test.method,
        name: test.name,
        status: 0,
        statusText: "Connection Error",
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString(),
        category: test.category,
      }

      testResults.push(result)
    }
  }

  // Generate comprehensive markdown report
  let markdown = `# API Test Results & Documentation\n\n`
  markdown += `**Generated:** ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}  \n`
  markdown += `**Status:** ${testResults.every((r) => r.success) ? "✅ ALL TESTS PASSED (100%)" : "⚠️ SOME TESTS FAILED"}\n\n`
  markdown += `---\n\n`

  markdown += `## Test Summary\n\n`
  markdown += `| Metric           | Result |\n`
  markdown += `| ---------------- | ------ |\n`
  markdown += `| **Total Tests**  | ${testResults.length}     |\n`
  markdown += `| **Passed**       | ${testResults.filter((r) => r.success).length} ✅  |\n`
  markdown += `| **Failed**       | ${testResults.filter((r) => !r.success).length}      |\n`
  markdown += `| **Success Rate** | ${((testResults.filter((r) => r.success).length / testResults.length) * 100).toFixed(2)}%   |\n\n`

  markdown += `---\n\n`

  // Group results by category
  const categories = [...new Set(testResults.map((r) => r.category))]

  for (const category of categories) {
    const categoryTests = testResults.filter((r) => r.category === category)
    const categoryPassed = categoryTests.filter((r) => r.success).length

    markdown += `## ${category} Tests (${categoryPassed}/${categoryTests.length} Passed) ${categoryPassed === categoryTests.length ? "✅" : "⚠️"}\n\n`

    categoryTests.forEach((result, index) => {
      const statusIcon = result.success ? "✅" : "❌"
      markdown += `### ${statusIcon} ${result.name}\n\n`
      markdown += `- **Endpoint:** \`${result.method} ${result.endpoint}\`\n`
      markdown += `- **Status Code:** ${result.status} ${result.statusText}\n`
      markdown += `- **Response:**\n\n`
      markdown += `\`\`\`json\n${result.response || result.error || "No response"}\n\`\`\`\n\n`
    })
  }

  markdown += `---\n\n`
  markdown += `## API Endpoints Reference\n\n`
  markdown += `### System\n`
  markdown += `- \`GET /\` - Server health check endpoint\n\n`

  markdown += `### Authentication\n`
  markdown += `- \`POST /api/v1/auth/register\` - Register a new user\n`
  markdown += `  - Body: \`{ email, password, name? }\`\n`
  markdown += `  - Returns: User token\n\n`
  markdown += `- \`POST /api/v1/auth/login\` - Login user\n`
  markdown += `  - Body: \`{ email, password }\`\n`
  markdown += `  - Returns: Access token and refresh token\n\n`
  markdown += `- \`POST /api/v1/auth/change-password\` - Change user password\n`
  markdown += `  - Auth: Required\n`
  markdown += `  - Body: \`{ oldPassword, newPassword }\`\n\n`
  markdown += `- \`POST /api/v1/auth/refresh-token\` - Refresh access token\n`
  markdown += `  - Body: Cookie \`refreshToken\`\n\n`

  markdown += `### Cakes\n`
  markdown += `- \`POST /api/v1/cakes\` - Create a new cake\n`
  markdown += `  - Body: \`{ name, description, price, image, category, inStock }\`\n`
  markdown += `  - Returns: Created cake object\n\n`
  markdown += `- \`GET /api/v1/cakes\` - Get all cakes\n`
  markdown += `  - Query Params: \`limit?\`, \`page?\`\n`
  markdown += `  - Returns: Array of cake objects\n\n`
  markdown += `- \`PATCH /api/v1/cakes/:id\` - Update a cake\n`
  markdown += `  - Params: Cake ID\n`
  markdown += `  - Body: Fields to update\n`
  markdown += `  - Returns: Updated cake object\n\n`
  markdown += `- \`DELETE /api/v1/cakes/:id\` - Delete a cake\n`
  markdown += `  - Params: Cake ID\n`
  markdown += `  - Returns: Success message\n\n`

  markdown += `### Carts\n`
  markdown += `- \`POST /api/v1/carts\` - Create cart item\n`
  markdown += `  - Body: \`{ userId, cakeId, quantity }\`\n`
  markdown += `  - Returns: Created cart item\n\n`
  markdown += `- \`GET /api/v1/carts\` - Get all cart items\n`
  markdown += `  - Returns: Array of cart items\n\n`
  markdown += `- \`PATCH /api/v1/carts/:id\` - Update cart item\n`
  markdown += `  - Params: Cart ID\n`
  markdown += `  - Body: Fields to update\n`
  markdown += `  - Returns: Updated cart item\n\n`
  markdown += `- \`DELETE /api/v1/carts/:id\` - Delete cart item\n`
  markdown += `  - Params: Cart ID\n`
  markdown += `  - Returns: Success message\n\n`

  markdown += `### Orders\n`
  markdown += `- \`POST /api/v1/orders\` - Create an order\n`
  markdown += `  - Body: \`{ userId, totalPrice, paymentMethod, orderStatus, items }\`\n`
  markdown += `  - Returns: Created order object\n\n`
  markdown += `- \`GET /api/v1/orders\` - Get all orders\n`
  markdown += `  - Returns: Array of order objects\n\n`
  markdown += `- \`PATCH /api/v1/orders/:id\` - Update an order\n`
  markdown += `  - Params: Order ID\n`
  markdown += `  - Body: Fields to update\n`
  markdown += `  - Returns: Updated order object\n\n`
  markdown += `- \`DELETE /api/v1/orders/:id\` - Delete an order\n`
  markdown += `  - Params: Order ID\n`
  markdown += `  - Returns: Success message\n\n`

  markdown += `### Ratings\n`
  markdown += `- \`POST /api/v1/ratings\` - Create a rating\n`
  markdown += `  - Body: \`{ cakeId, userId, rating, review }\`\n`
  markdown += `  - Returns: Created rating object\n\n`
  markdown += `- \`GET /api/v1/ratings\` - Get all ratings\n`
  markdown += `  - Returns: Array of rating objects\n\n`
  markdown += `- \`PATCH /api/v1/ratings/:id\` - Update a rating\n`
  markdown += `  - Params: Rating ID\n`
  markdown += `  - Body: Fields to update\n`
  markdown += `  - Returns: Updated rating object\n\n`
  markdown += `- \`DELETE /api/v1/ratings/:id\` - Delete a rating\n`
  markdown += `  - Params: Rating ID\n`
  markdown += `  - Returns: Success message\n\n`

  // Save to file
  try {
    await fs.writeFile(RESULTS_FILE, markdown)
    console.log(`\n✅ Test report saved to: ${RESULTS_FILE}`)
  } catch (error) {
    console.error(`❌ Error saving report: ${error}`)
  }

  // Print summary
  console.log("\n📊 Final Summary:")
  console.log(`Total: ${testResults.length}`)
  console.log(`Passed: ${testResults.filter((r) => r.success).length}`)
  console.log(`Failed: ${testResults.filter((r) => !r.success).length}`)
  console.log(
    `Success Rate: ${((testResults.filter((r) => r.success).length / testResults.length) * 100).toFixed(2)}%`,
  )

  const allPassed = testResults.every((r) => r.success)
  return allPassed
}

runTests().then((allPassed) => {
  if (allPassed) {
    console.log("\n✅ All tests passed!")
    process.exit(0)
  } else {
    console.log("\n⚠️ Some tests failed. Check the report for details.")
    process.exit(1)
  }
})
