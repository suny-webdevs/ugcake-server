import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { userService } from "./user.service"
import httpStatus from "http-status"

// const createUser = catchAsync(async (req: Request, res: Response) => {
//   const data = await userService.create_user(req)
//   sendResponse(res, httpStatus.CREATED, "User created successfully", data)
// })

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const data = await userService.get_all_user()
  sendResponse(res, httpStatus.OK, "Users fetched successfully", data)
})

const getUser = catchAsync(async (req: Request, res: Response) => {
  const data = await userService.get_user(req)
  sendResponse(res, httpStatus.OK, "User fetched successfully", data)
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const data = await userService.update_user(req)
  sendResponse(res, httpStatus.OK, "User updated successfully", data)
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const data = await userService.delete_user(req)
  sendResponse(res, httpStatus.OK, "User deleted successfully", data)
})

export const userController = {
  // createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
}
