import { Router } from "express"
import { categoryController } from "./category.controller"
import text_to_json from "../../middlewares/textToJSON"
import { upload } from "../../middlewares/upload"

const router = Router()

router.post(
  "/create-category",
  upload.single("file"),
  text_to_json(),
  categoryController.create_category,
)
router.get("/", categoryController.get_all_categories)
router.get("/:id", categoryController.get_category)
router.get("/category/:slug", categoryController.get_category_by_slug)
router.patch("/:id", text_to_json(), categoryController.update_category)
router.delete("/:id", categoryController.delete_category)

export const categoryRoute = router
