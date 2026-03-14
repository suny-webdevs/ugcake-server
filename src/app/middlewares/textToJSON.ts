import { NextFunction, Request, Response } from "express"

const text_to_json = () => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (req.body?.data && typeof req.body.data === "string") {
      const parsed = JSON.parse(req.body.data)
      req.body = { ...parsed }
    }
    next()
  }
}

export default text_to_json
