import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { ratingService } from "./rating.service"
import httpStatus from "http-status"

const createRating = catchAsync(async (req: Request, res: Response) => {
  const data = await ratingService.create_rating(req)
  sendResponse(res, httpStatus.CREATED, "Rating created successfully", data)
})

const getAllRating = catchAsync(async (req: Request, res: Response) => {
  const data = await ratingService.get_all_rating()
  sendResponse(res, httpStatus.OK, "Ratings fetched successfully", data)
})

const getRating = catchAsync(async (req: Request, res: Response) => {
  const data = await ratingService.get_rating(req)
  sendResponse(res, httpStatus.OK, "Rating fetched successfully", data)
})

const updateRating = catchAsync(async (req: Request, res: Response) => {
  const data = await ratingService.update_rating(req)
  sendResponse(res, httpStatus.OK, "Rating updated successfully", data)
})

const deleteRating = catchAsync(async (req: Request, res: Response) => {
  const data = await ratingService.delete_rating(req)
  sendResponse(res, httpStatus.OK, "Rating deleted successfully", data)
})

export const ratingController = {
  createRating,
  getAllRating,
  getRating,
  updateRating,
  deleteRating,
}
