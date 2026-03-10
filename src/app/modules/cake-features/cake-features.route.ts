import { Router } from "express"
import { cakeFeaturesController } from "./cake-features.controller"

const router = Router()

router.post("/", cakeFeaturesController.create_cake_features)
router.get("/", cakeFeaturesController.get_all_cake_features)
router.get("/:id", cakeFeaturesController.get_cake_features)
router.get("/cake/:cakeId", cakeFeaturesController.get_cake_features_by_cake)
router.patch("/:id", cakeFeaturesController.update_cake_features)
router.delete("/:id", cakeFeaturesController.delete_cake_features)

export const cakeFeaturesRoute = router
