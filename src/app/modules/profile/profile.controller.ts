import httpStatus from "http-status"
import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { profileService } from "./profile.service"

const create_profile = catchAsync(async (req: Request, res: Response) => {
  const result = await profileService.create_profile(req)
  sendResponse(res, httpStatus.CREATED, "Profile created successfully", result)
})

const get_all_profiles = catchAsync(async (req: Request, res: Response) => {
  const result = await profileService.get_all_profiles()
  sendResponse(res, httpStatus.OK, "Profiles fetched successfully", result)
})

const get_profile = catchAsync(async (req: Request, res: Response) => {
  const result = await profileService.get_profile(req)
  sendResponse(res, httpStatus.OK, "Profile fetched successfully", result)
})

const get_profile_by_user = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params
  const result = await profileService.get_profile_by_user(userId as string)
  sendResponse(res, httpStatus.OK, "Profile fetched successfully", result)
})

const update_profile = catchAsync(async (req: Request, res: Response) => {
  const result = await profileService.update_profile(req)
  sendResponse(res, httpStatus.OK, "Profile updated successfully", result)
})

const delete_profile = catchAsync(async (req: Request, res: Response) => {
  const result = await profileService.delete_profile(req)
  sendResponse(res, httpStatus.OK, "Profile deleted successfully", result)
})

export const profileController = {
  create_profile,
  get_all_profiles,
  get_profile,
  get_profile_by_user,
  update_profile,
  delete_profile,
}
