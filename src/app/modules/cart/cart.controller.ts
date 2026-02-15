import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { cartService } from "./cart.service"
import httpStatus from "http-status"

const createCart = catchAsync(async (req: Request, res: Response) => {
  const data = await cartService.create_cart(req)
  sendResponse(res, httpStatus.CREATED, "Cart created successfully", data)
})

const getAllCart = catchAsync(async (req: Request, res: Response) => {
  const data = await cartService.get_all_cart()
  sendResponse(res, httpStatus.OK, "Carts fetched successfully", data)
})

const getCart = catchAsync(async (req: Request, res: Response) => {
  const data = await cartService.get_cart(req)
  sendResponse(res, httpStatus.OK, "Cart fetched successfully", data)
})

const updateCart = catchAsync(async (req: Request, res: Response) => {
  const data = await cartService.update_cart(req)
  sendResponse(res, httpStatus.OK, "Carts updated successfully", data)
})

const deleteCart = catchAsync(async (req: Request, res: Response) => {
  const data = await cartService.delete_cart(req)
  sendResponse(res, httpStatus.OK, "Carts deleted successfully", data)
})

export const cartController = {
  createCart,
  getAllCart,
  getCart,
  updateCart,
  deleteCart,
}
