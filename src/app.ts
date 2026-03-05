import express, { Application, Request, Response } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import globalErrorHandler from "./app/middlewares/globalErrorHandler"
import notFound from "./app/middlewares/notFound"
import router from "./app/routes"
import { inject } from "@vercel/analytics"

const app: Application = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
)

app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to RESTful API Server of UG Cake!",
  })
})

app.use(globalErrorHandler)
app.use(notFound)
inject()

export default app
