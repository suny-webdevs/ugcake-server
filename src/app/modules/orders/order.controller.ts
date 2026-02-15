import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { orderService } from "./order.service"
import httpStatus from "http-status"

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const data = await orderService.create_order(req)
  sendResponse(res, httpStatus.CREATED, "Order created successfully", data)
})

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const data = await orderService.get_all_order()
  sendResponse(res, httpStatus.OK, "Orders fetched successfully", data)
})

const getOrder = catchAsync(async (req: Request, res: Response) => {
  const data = await orderService.get_order(req)
  sendResponse(res, httpStatus.OK, "Order fetched successfully", data)
})

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const data = await orderService.update_order(req)
  sendResponse(res, httpStatus.OK, "Order updated successfully", data)
})

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const data = await orderService.delete_order(req)
  sendResponse(res, httpStatus.OK, "Order deleted successfully", data)
})

export const orderController = {
  createOrder,
  getAllOrder,
  getOrder,
  updateOrder,
  deleteOrder,
}
