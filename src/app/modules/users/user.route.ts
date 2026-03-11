import express from "express"
import { userController } from "./user.controller"
import validateRequest from "../../middlewares/validateRequest"
import {
  //   createUserValidationSchema,
  updateUserValidationSchema,
  getUserByIdValidationSchema,
} from "./user.validation"

const router = express.Router()

// router.post(
//   "/create-user",
//   validateRequest(createUserValidationSchema),
//   userController.createUser,
// )
router.get("/", userController.getAllUser)
router.get(
  "/:id",
  validateRequest(getUserByIdValidationSchema),
  userController.getUser,
)
router.patch(
  "/update-user/:id",
  validateRequest(getUserByIdValidationSchema),
  validateRequest(updateUserValidationSchema),
  userController.updateUser,
)
router.delete(
  "/delete-user/:id",
  validateRequest(getUserByIdValidationSchema),
  userController.deleteUser,
)

export const userRoutes = router
