import express from "express"
import { cakeController } from "./cake.controller"
import { upload } from "../../middlewares/upload"
import text_to_json from "../../middlewares/textToJSON"

const router = express.Router()

router.post(
  "/create-cake",
  upload.array("files"),
  text_to_json(),
  cakeController.createCake,
)
router.get("/", cakeController.getAllCake)
router.get("/:id", cakeController.getCake)
router.patch("/update-cake/:id", cakeController.updateCake)
router.delete("/delete-cake/:id", cakeController.deleteCake)

export const cakeRoutes = router
