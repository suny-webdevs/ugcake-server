import { NextFunction, Request, Response } from "express"

const text_to_json = () => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (typeof req.body.data === "string") {
      req.body = JSON.parse(req.body.data)
    }
    next()
  }
}

export default text_to_json
