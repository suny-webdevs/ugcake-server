import { RequestHandler } from "express"
import hs from "http-status"

const notFound: RequestHandler = (_req, res, _next) => {
  res.status(hs.NOT_FOUND).json({
    success: false,
    message: "API not found",
  })
}

export default notFound
