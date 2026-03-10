import httpStatus from "http-status"
import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { cakeFeaturesService } from "./cake-features.service"

const create_cake_features = catchAsync(async (req: Request, res: Response) => {
  const result = await cakeFeaturesService.create_cake_features(req)
  sendResponse(
    res,
    httpStatus.CREATED,
    "Cake features created successfully",
    result,
  )
})

const get_all_cake_features = catchAsync(
  async (req: Request, res: Response) => {
    const result = await cakeFeaturesService.get_all_cake_features()
    sendResponse(
      res,
      httpStatus.OK,
      "Cake features fetched successfully",
      result,
    )
  },
)

const get_cake_features = catchAsync(async (req: Request, res: Response) => {
  const result = await cakeFeaturesService.get_cake_features(req)
  sendResponse(res, httpStatus.OK, "Cake features fetched successfully", result)
})

const get_cake_features_by_cake = catchAsync(
  async (req: Request, res: Response) => {
    const { cakeId } = req.params
    const result = await cakeFeaturesService.get_cake_features_by_cake(
      cakeId as string,
    )
    sendResponse(
      res,
      httpStatus.OK,
      "Cake features fetched successfully",
      result,
    )
  },
)

const update_cake_features = catchAsync(async (req: Request, res: Response) => {
  const result = await cakeFeaturesService.update_cake_features(req)
  sendResponse(res, httpStatus.OK, "Cake features updated successfully", result)
})

const delete_cake_features = catchAsync(async (req: Request, res: Response) => {
  const result = await cakeFeaturesService.delete_cake_features(req)
  sendResponse(res, httpStatus.OK, "Cake features deleted successfully", result)
})

export const cakeFeaturesController = {
  create_cake_features,
  get_all_cake_features,
  get_cake_features,
  get_cake_features_by_cake,
  update_cake_features,
  delete_cake_features,
}
