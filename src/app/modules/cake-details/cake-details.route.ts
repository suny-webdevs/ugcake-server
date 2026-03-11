import { Router } from "express"
import { cakeDetailsController } from "./cake-details.controller"
import validateRequest from "../../middlewares/validateRequest"
import {
  createCakeDetailsValidationSchema,
  updateCakeDetailsValidationSchema,
  getCakeDetailsByIdValidationSchema,
} from "./cake-details.validation"
import auth from "../../middlewares/auth"

const router = Router()

// Create cake details
router.post(
  "/create-cake-details",
  auth("ADMIN", "USER"),
  validateRequest(createCakeDetailsValidationSchema),
  cakeDetailsController.createCakeDetails,
)

// Get all cake details
router.get(
  "/",
  auth("ADMIN", "USER", "DELIVERY_MAN", "MODERATOR"),
  cakeDetailsController.getAllCakeDetails,
)

// Get cake details by ID
router.get(
  "/:id",
  auth("ADMIN", "USER", "DELIVERY_MAN", "MODERATOR"),
  validateRequest(getCakeDetailsByIdValidationSchema),
  cakeDetailsController.getCakeDetails,
)

// Get cake details by order ID
router.get(
  "/by-order/:orderId",
  auth("ADMIN", "USER", "DELIVERY_MAN", "MODERATOR"),
  validateRequest(getCakeDetailsByIdValidationSchema),
  cakeDetailsController.getCakeDetailsByOrder,
)

// Update cake details
router.patch(
  "/update-cake-details/:id",
  auth("ADMIN", "USER"),
  validateRequest(getCakeDetailsByIdValidationSchema),
  validateRequest(updateCakeDetailsValidationSchema),
  cakeDetailsController.updateCakeDetails,
)

// Delete cake details
router.delete(
  "/delete-cake-details/:id",
  auth("ADMIN", "USER"),
  validateRequest(getCakeDetailsByIdValidationSchema),
  cakeDetailsController.deleteCakeDetails,
)

export const cakeDetailsRoutes = router
