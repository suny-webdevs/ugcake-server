import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { specificationService } from "./specification.service"
import httpStatus from "http-status"

const createSpecification = catchAsync(async (req: Request, res: Response) => {
  const data = await specificationService.create_specification(req)
  sendResponse(
    res,
    httpStatus.CREATED,
    "Specification created successfully",
    data,
  )
})

const getAllSpecification = catchAsync(async (req: Request, res: Response) => {
  const data = await specificationService.get_all_specification()
  sendResponse(res, httpStatus.OK, "Specifications fetched successfully", data)
})

const getSpecification = catchAsync(async (req: Request, res: Response) => {
  const data = await specificationService.get_specification(req)
  sendResponse(res, httpStatus.OK, "Specification fetched successfully", data)
})

const updateSpecification = catchAsync(async (req: Request, res: Response) => {
  const data = await specificationService.update_specification(req)
  sendResponse(res, httpStatus.OK, "Specification updated successfully", data)
})

const deleteSpecification = catchAsync(async (req: Request, res: Response) => {
  const data = await specificationService.delete_specification(req)
  sendResponse(res, httpStatus.OK, "Specification deleted successfully", data)
})

export const specificationController = {
  createSpecification,
  getAllSpecification,
  getSpecification,
  updateSpecification,
  deleteSpecification,
}
