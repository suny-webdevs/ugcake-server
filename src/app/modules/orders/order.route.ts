import express from "express"
import { orderController } from "./order.controller"
import validateRequest from "../../middlewares/validateRequest"
import {
  createOrderValidationSchema,
  updateOrderValidationSchema,
  getOrderByIdValidationSchema,
} from "./order.validation"

const router = express.Router()

router.post(
  "/create-order",
  validateRequest(createOrderValidationSchema),
  orderController.createOrder,
)
router.get("/", orderController.getAllOrder)
router.get(
  "/:id",
  validateRequest(getOrderByIdValidationSchema),
  orderController.getOrder,
)
router.patch(
  "/update-order/:id",
  validateRequest(getOrderByIdValidationSchema),
  validateRequest(updateOrderValidationSchema),
  orderController.updateOrder,
)
router.delete(
  "/delete-order/:id",
  validateRequest(getOrderByIdValidationSchema),
  orderController.deleteOrder,
)

export const orderRoutes = router
