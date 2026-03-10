import httpStatus from "http-status"
import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { categoryService } from "./category.service"

const create_category = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.create_category(req)
  sendResponse(res, httpStatus.CREATED, "Category created successfully", result)
})

const get_all_categories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.get_all_categories()
  sendResponse(res, httpStatus.OK, "Categories fetched successfully", result)
})

const get_category = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.get_category(req)
  sendResponse(res, httpStatus.OK, "Category fetched successfully", result)
})

const get_category_by_name = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.params
  const result = await categoryService.get_category_by_name(name as string)
  sendResponse(res, httpStatus.OK, "Category fetched successfully", result)
})

const update_category = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.update_category(req)
  sendResponse(res, httpStatus.OK, "Category updated successfully", result)
})

const delete_category = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.delete_category(req)
  sendResponse(res, httpStatus.OK, "Category deleted successfully", result)
})

export const categoryController = {
  create_category,
  get_all_categories,
  get_category,
  get_category_by_name,
  update_category,
  delete_category,
}
