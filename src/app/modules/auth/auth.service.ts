import AppError from "../../errors/AppError"
import prisma from "../../lib/prisma"
import { TAuth, TChangePassword } from "./auth.type"
import httpStatus from "http-status"
import { createToken, generateUsername, verifyToken } from "./auth.utils"
import config from "../../config"
import { JwtPayload } from "jsonwebtoken"
import * as bcrypt from "bcryptjs"

const loginUser = async (payload: TAuth) => {
  if (!payload.email || !payload.password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email and password are required",
    )
  }

  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  })

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found. Please register first.",
    )
  }

  if (user.isDeleted) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "This user account has been deleted",
    )
  }

  // Verify password
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  )

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid email or password")
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  return {
    token: accessToken,
    refreshToken,
  }
}

const changePassword = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userData.id as string },
  })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  if (user.isDeleted) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "This user account has been deleted",
    )
  }

  // Verify old password
  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    user.password,
  )

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Old password is incorrect")
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(payload.newPassword, 10)

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      updatedAt: new Date(),
    },
  })

  return null
}

const refreshAccessToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token is required")
  }

  const decoded = verifyToken(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload

  const { id } = decoded

  const user = await prisma.user.findUnique({
    where: { id: id as string },
  })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  if (user.isDeleted) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "This user account has been deleted",
    )
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return {
    token: accessToken,
  }
}

const registerUser = async (payload: TAuth) => {
  if (!payload.email || !payload.password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email and password are required",
    )
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  })

  if (existingUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User already exists with this email",
    )
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(payload.password, 10)

  const user = await prisma.user.create({
    data: {
      email: payload.email,
      password: hashedPassword,
      name: payload.name || (generateUsername(payload.email) as string),
      address: "",
      phone: "",
      image: "",
    },
  })

  // const jwtPayload = {
  //   id: user.id,
  //   email: user.email,
  //   role: user.role,
  // }

  // const accessToken = createToken(
  //   jwtPayload,
  //   config.jwt_access_secret as string,
  //   config.jwt_access_expires_in as string,
  // )

  // const refreshToken = createToken(
  //   jwtPayload,
  //   config.jwt_refresh_secret as string,
  //   config.jwt_refresh_expires_in as string,
  // )

  return user
}

export const AuthServices = {
  loginUser,
  registerUser,
  changePassword,
  refreshAccessToken,
}
