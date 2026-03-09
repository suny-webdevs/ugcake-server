import express from "express"
import { cartController } from "./cart.controller"
import auth from "../../middlewares/auth"

const router = express.Router()

router.post("/create-cart", auth(), cartController.createCart)
router.get("/", cartController.getAllCart)
router.get("/:id", cartController.getCart)
router.patch("/update-cart/:id", cartController.updateCart)
router.delete("/delete-cart/:id", cartController.deleteCart)

export const cartRoutes = router
