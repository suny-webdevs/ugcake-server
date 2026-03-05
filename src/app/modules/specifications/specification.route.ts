import express from "express"
import { specificationController } from "./specification.controller"

const router = express.Router()

router.post(
  "/create-specification",
  specificationController.createSpecification,
)
router.get("/", specificationController.getAllSpecification)
router.get("/:id", specificationController.getSpecification)
router.patch(
  "/update-specification/:id",
  specificationController.updateSpecification,
)
router.delete(
  "/delete-specification/:id",
  specificationController.deleteSpecification,
)

export const specificationRoutes = router
