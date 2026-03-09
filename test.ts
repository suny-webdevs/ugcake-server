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

function makeRequest(
  url: string,
  method: string = "GET",
  body?: string,
): Promise<{ status: number; statusText: string; data: string }> {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 5555,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
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

  // Comprehensive test cases
  const tests = [
    // Health Check
    {
      endpoint: `${BASE_URL}/`,
      method: "GET",
      name: "Server Health Check",
      category: "System",
      body: undefined,
    },

    // Authentication Endpoints
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

    // Cakes Endpoints
    {
      endpoint: `${API_BASE}/cakes`,
      method: "GET",
      name: "Get All Cakes",
      category: "Cakes",
      body: undefined,
    },
    {
      endpoint: `${API_BASE}/cakes?limit=5&page=1`,
      method: "GET",
      name: "Get Cakes with Pagination",
      category: "Cakes",
      body: undefined,
    },

    // Carts Endpoints
    {
      endpoint: `${API_BASE}/carts`,
      method: "GET",
      name: "Get All Carts",
      category: "Carts",
      body: undefined,
    },

    // Orders Endpoints
    {
      endpoint: `${API_BASE}/orders`,
      method: "GET",
      name: "Get All Orders",
      category: "Orders",
      body: undefined,
    },

    // Users Endpoints
    {
      endpoint: `${API_BASE}/users`,
      method: "GET",
      name: "Get All Users",
      category: "Users",
      body: undefined,
    },

    // Ratings Endpoints
    {
      endpoint: `${API_BASE}/ratings`,
      method: "GET",
      name: "Get All Ratings",
      category: "Ratings",
      body: undefined,
    },

    // Invalid endpoint test
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
      console.log(`Testing: ${test.category} - ${test.name} [${test.method}]`)
      const response = await makeRequest(test.endpoint, test.method, test.body)

      let parsedData: any
      try {
        parsedData = JSON.parse(response.data)
        if (
          parsedData.data &&
          typeof parsedData.data === "object" &&
          parsedData.data.id
        ) {
          registeredUserId = parsedData.data.id
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
  markdown += `- \`GET /api/v1/cakes\` - Get all cakes\n`
  markdown += `  - Query Params: \`limit?\`, \`page?\`\n`
  markdown += `  - Returns: Array of cake objects\n\n`

  markdown += `### Orders\n`
  markdown += `- \`GET /api/v1/orders\` - Get all orders\n`
  markdown += `  - Returns: Array of order objects\n\n`

  markdown += `### Carts\n`
  markdown += `- \`GET /api/v1/carts\` - Get all carts\n`
  markdown += `  - Returns: Array of cart items\n\n`

  markdown += `### Users\n`
  markdown += `- \`GET /api/v1/users\` - Get all users\n`
  markdown += `  - Returns: Array of user objects\n\n`

  markdown += `### Ratings\n`
  markdown += `- \`GET /api/v1/ratings\` - Get all ratings\n`
  markdown += `  - Returns: Array of rating objects\n\n`

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
