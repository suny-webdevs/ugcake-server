import express from "express"
import { ratingController } from "./rating.controller"

const router = express.Router()

router.post("/create-rating", ratingController.createRating)
router.get("/", ratingController.getAllRating)
router.get("/:id", ratingController.getRating)
router.patch("/update-rating/:id", ratingController.updateRating)
router.delete("/delete-rating/:id", ratingController.deleteRating)

export const ratingRoutes = router
