import express from "express"
import { orderController } from "./order.controller"

const router = express.Router()

router.post("/create-order", orderController.createOrder)
router.get("/", orderController.getAllOrder)
router.get("/:id", orderController.getOrder)
router.patch("/update-order/:id", orderController.updateOrder)
router.delete("/delete-order/:id", orderController.deleteOrder)

export const orderRoutes = router
