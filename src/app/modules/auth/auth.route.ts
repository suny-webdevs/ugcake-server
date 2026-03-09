import { Router } from "express"
import {
  register,
  login,
  changePassword,
  refreshAccessToken,
} from "./auth.controller"
import validateRequest from "../../middlewares/validateRequest"
import auth from "../../middlewares/auth"
import {
  registerValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
} from "./auth.validation"

const router = Router()

router.post("/register", validateRequest(registerValidationSchema), register)

router.post("/login", validateRequest(loginValidationSchema), login)

router.post(
  "/change-password",
  auth("ADMIN", "USER", "MODERATOR", "DELIVERY_MAN"),
  validateRequest(changePasswordValidationSchema),
  changePassword,
)

router.post(
  "/refresh-token",
  validateRequest(refreshTokenValidationSchema),
  refreshAccessToken,
)

export const AuthRoutes = router
