import express from "express"
import { cartRoutes } from "../modules/cart/cart.route"
import { cakeRoutes } from "../modules/cakes/cake.route"
import { orderRoutes } from "../modules/orders/order.route"
import { userRoutes } from "../modules/users/user.route"

const router = express.Router()

const routerData = [
  {
    path: "/carts",
    route: cartRoutes,
  },
  {
    path: "/cakes",
    route: cakeRoutes,
  },
  {
    path: "/orders",
    route: orderRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
]

routerData.forEach((route) => router.use(route.path, route.route))

export default router
