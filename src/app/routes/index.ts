import express from "express"
import { cartRoutes } from "../modules/cart/cart.route"

const router = express.Router()

const routerData = [
  {
    path: "/carts",
    route: cartRoutes,
  },
]

routerData.forEach((route) => router.use(route.path, route.route))

export default router
