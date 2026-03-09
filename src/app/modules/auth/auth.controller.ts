import config from "../../config"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AuthServices } from "./auth.service"
import httpStatus from "http-status"
import { Response } from "express"

export const register = catchAsync(async (req, res) => {
  const data = await AuthServices.registerUser(req.body)
  const { token, refreshToken } = data

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })

  sendResponse(res, httpStatus.CREATED, "User registered successfully", {
    token,
  })
})

export const login = catchAsync(async (req, res) => {
  const data = await AuthServices.loginUser(req.body)
  const { token, refreshToken } = data

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })

  sendResponse(res, httpStatus.OK, "User logged in successfully", {
    token,
  })
})

export const changePassword = catchAsync(async (req, res) => {
  const userData = req.user

  const data = await AuthServices.changePassword(userData, req.body)

  sendResponse(res, httpStatus.OK, "Password changed successfully", data)
})

export const refreshAccessToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies

  const data = await AuthServices.refreshAccessToken(refreshToken)

  sendResponse(res, httpStatus.OK, "Access token refreshed successfully", data)
})
