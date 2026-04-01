import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { cakeService } from "./cake.service"
import httpStatus from "http-status"
import { get } from "http"

const createCake = catchAsync(async (req: Request, res: Response) => {
  const data = await cakeService.create_cake(req)
  sendResponse(res, httpStatus.CREATED, "Cake created successfully", data)
})

const getAllCake = catchAsync(async (req: Request, res: Response) => {
  const data = await cakeService.get_all_cake(req)
  sendResponse(res, httpStatus.OK, "Cakes fetched successfully", data)
})

const getCake = catchAsync(async (req: Request, res: Response) => {
  const data = await cakeService.get_cake(req)
  sendResponse(res, httpStatus.OK, "Cake fetched successfully", data)
})

const getCakeBySlug = catchAsync(async (req: Request, res: Response) => {
  const data = await cakeService.get_cake_by_slug(req)
  sendResponse(res, httpStatus.OK, "Cake fetched successfully", data)
})

const updateCake = catchAsync(async (req: Request, res: Response) => {
  const data = await cakeService.update_cake(req)
  sendResponse(res, httpStatus.OK, "Cake updated successfully", data)
})

const deleteCake = catchAsync(async (req: Request, res: Response) => {
  const data = await cakeService.delete_cake(req)
  sendResponse(res, httpStatus.OK, "Cake deleted successfully", data)
})

export const cakeController = {
  createCake,
  getAllCake,
  getCake,
  getCakeBySlug,
  updateCake,
  deleteCake,
}
