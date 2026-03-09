import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import AppError from "../errors/AppError"
import httpStatus from "http-status"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"
import prisma from "../lib/prisma"

type TUserRole = "ADMIN" | "USER" | "MODERATOR" | "DELIVERY_MAN"

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      const token = req.headers.authorization

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!")
      }

      const decoded = jwt.verify(
        token as string,
        config.jwt_access_secret as string,
      ) as JwtPayload

      const { id, role } = decoded

      if (!id || !role) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token payload")
      }

      // Finding user by id from token
      const user = await prisma.user.findUnique({
        where: { id: id as string },
      })

      // Checking if user exists
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!")
      }

      // Checking if user is deleted
      if (user.isDeleted) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!")
      }

      // Checking if user is blocked or suspended
      if (user.isBlocked || user.isSuspended) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "Your account has been blocked or suspended!",
        )
      }

      // Check required role exists or not
      if (requiredRoles && requiredRoles.length > 0) {
        if (!requiredRoles.includes(role as TUserRole)) {
          throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!")
        }
      }

      // Attach user to request
      req.user = decoded as JwtPayload & { role: TUserRole }
      next()
    },
  )
}

export default auth
