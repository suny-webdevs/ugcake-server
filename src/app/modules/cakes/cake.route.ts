import express from "express"
import { cakeController } from "./cake.controller"

const router = express.Router()

router.post("/create-cake", cakeController.createCake)
router.get("/", cakeController.getAllCake)
router.get("/:id", cakeController.getCake)
router.patch("/update-cake/:id", cakeController.updateCake)
router.delete("/delete-cake/:id", cakeController.deleteCake)

export const cakeRoutes = router
