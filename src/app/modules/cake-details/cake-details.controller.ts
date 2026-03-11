import { Request, Response } from "express"
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { cakeDetailsService } from "./cake-details.service"

const createCakeDetails = catchAsync(async (req: Request, res: Response) => {
  const data = await cakeDetailsService.create_cake_details(req)
  sendResponse(res, httpStatus.CREATED, "Cake details created successfully", data)
})

const getAllCakeDetails = catchAsync(async (req: Request, res: Response) => {
  const data = await cakeDetailsService.get_all_cake_details()
  sendResponse(res, httpStatus.OK, "Cake details retrieved successfully", data)
})

const getCakeDetails = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string
  const data = await cakeDetailsService.get_cake_details(id)
  sendResponse(res, httpStatus.OK, "Cake details retrieved successfully", data)
})

const getCakeDetailsByOrder = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.orderId as string
  const data = await cakeDetailsService.get_cake_details_by_order(orderId)
  sendResponse(res, httpStatus.OK, "Cake details retrieved successfully", data)
})

const updateCakeDetails = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string
  const { payload } = req.body
  const data = await cakeDetailsService.update_cake_details(id, payload)
  sendResponse(res, httpStatus.OK, "Cake details updated successfully", data)
})

const deleteCakeDetails = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string
  const data = await cakeDetailsService.delete_cake_details(id)
  sendResponse(res, httpStatus.OK, "Cake details deleted successfully", data)
})

export const cakeDetailsController = {
  createCakeDetails,
  getAllCakeDetails,
  getCakeDetails,
  getCakeDetailsByOrder,
  updateCakeDetails,
  deleteCakeDetails,
}
