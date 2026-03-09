import http from "http"
import { promises as fs } from "fs"
import path from "path"

const BASE_URL = "http://localhost:5555"
const API_BASE = `${BASE_URL}/api/v1`
const RESULTS_FILE = path.join(process.cwd(), "TEST_RESULTS.md")

interface TestResult {
  endpoint: string
  method: string
  status: number
  statusText: string
  success: boolean
  response?: string
  error?: string
  timestamp: string
}

const testResults: TestResult[] = []

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
  console.log("🚀 Starting API Tests...")
  console.log(`⏰ ${new Date().toISOString()}\n`)

  // Generate unique email for register test
  const uniqueEmail = `test${Date.now()}@example.com`

  // Test cases
  const tests = [
    { endpoint: `${BASE_URL}/`, method: "GET", name: "Health Check" },
    {
      endpoint: `${API_BASE}/auth/register`,
      method: "POST",
      name: "Auth Register",
      body: JSON.stringify({
        email: uniqueEmail,
        password: "test123",
        name: "Test",
      }),
    },
    { endpoint: `${API_BASE}/cakes`, method: "GET", name: "Get All Cakes" },
    { endpoint: `${API_BASE}/carts`, method: "GET", name: "Get Carts" },
    { endpoint: `${API_BASE}/orders`, method: "GET", name: "Get Orders" },
    { endpoint: `${API_BASE}/users`, method: "GET", name: "Get Users" },
    { endpoint: `${API_BASE}/ratings`, method: "GET", name: "Get Ratings" },
  ]

  for (const test of tests) {
    try {
      console.log(`Testing: ${test.name} - ${test.method} ${test.endpoint}`)
      const response = await makeRequest(test.endpoint, test.method, test.body)

      const result: TestResult = {
        endpoint: test.endpoint,
        method: test.method,
        status: response.status,
        statusText: response.statusText,
        success: response.status >= 200 && response.status < 300,
        response: response.data.substring(0, 500), // Keep first 500 chars
        timestamp: new Date().toISOString(),
      }

      testResults.push(result)
      console.log(`✅ Status: ${response.status} ${response.statusText}\n`)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.log(`❌ Error: ${errorMessage}\n`)

      const result: TestResult = {
        endpoint: test.endpoint,
        method: test.method,
        status: 0,
        statusText: "Connection Error",
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString(),
      }

      testResults.push(result)
    }
  }

  // Generate markdown report
  let markdown = `# API Test Results\n\n`
  markdown += `**Test Date:** ${new Date().toISOString()}\n\n`
  markdown += `**Total Tests:** ${testResults.length}\n`
  markdown += `**Passed:** ${testResults.filter((r) => r.success).length}\n`
  markdown += `**Failed:** ${testResults.filter((r) => !r.success).length}\n\n`

  markdown += `## Test Details\n\n`

  testResults.forEach((result, index) => {
    markdown += `### Test ${index + 1}: ${result.method} ${result.endpoint}\n\n`
    markdown += `- **Status:** ${result.status} ${result.statusText}\n`
    markdown += `- **Success:** ${result.success ? "✅ Yes" : "❌ No"}\n`
    markdown += `- **Timestamp:** ${result.timestamp}\n`

    if (result.error) {
      markdown += `- **Error:** ${result.error}\n`
    } else if (result.response) {
      markdown += `- **Response (first 500 chars):**\n\`\`\`json\n${result.response}\n\`\`\`\n`
    }

    markdown += "\n---\n\n"
  })

  // Save to file
  try {
    await fs.writeFile(RESULTS_FILE, markdown)
    console.log(`\n✅ Test results saved to: ${RESULTS_FILE}`)
  } catch (error) {
    console.error(`❌ Error saving results: ${error}`)
  }

  // Print summary
  console.log("\n📊 Summary:")
  console.log(`Total: ${testResults.length}`)
  console.log(`Passed: ${testResults.filter((r) => r.success).length}`)
  console.log(`Failed: ${testResults.filter((r) => !r.success).length}`)
}

// Wait for server to be ready
setTimeout(() => {
  runTests().catch(console.error)
}, 2000)
