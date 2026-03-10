import { Router } from "express"
import { profileController } from "./profile.controller"

const router = Router()

router.post("/", profileController.create_profile)
router.get("/", profileController.get_all_profiles)
router.get("/:id", profileController.get_profile)
router.get("/user/:userId", profileController.get_profile_by_user)
router.patch("/:id", profileController.update_profile)
router.delete("/:id", profileController.delete_profile)

export const profileRoute = router
