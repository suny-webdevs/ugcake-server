import express from "express"
import { userController } from "./user.controller"

const router = express.Router()

router.post("/create-user", userController.createUser)
router.get("/", userController.getAllUser)
router.get("/:id", userController.getUser)
router.patch("/update-user/:id", userController.updateUser)
router.delete("/delete-user/:id", userController.deleteUser)

export const userRoutes = router
