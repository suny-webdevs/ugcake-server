import app from "./app"
import config from "./app/config"
import { Server } from "http"

let server: Server

async function main() {
  try {
    server = app.listen(config.port, () => {
      console.log(`Server is live on port ${config.port}`)
    })

    process.on("unhandledRejection", () => {
      if (server) server.close(() => process.exit(1))
      process.exit(1)
    })

    process.on("uncaughtException", () => process.exit(1))
  } catch (error) {
    console.log(error)
  }
}

main()
