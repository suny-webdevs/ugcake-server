import { Router } from "express"
import { categoryController } from "./category.controller"
import text_to_json from "../../middlewares/textToJSON"

const router = Router()

router.post(
  "/create-category",
  text_to_json(),
  categoryController.create_category,
)
router.get("/", categoryController.get_all_categories)
router.get("/:id", categoryController.get_category)
router.get("/name/:name", categoryController.get_category_by_name)
router.patch("/:id", text_to_json(), categoryController.update_category)
router.delete("/:id", categoryController.delete_category)

export const categoryRoute = router
