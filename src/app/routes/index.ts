import express from "express"
import { AuthRoutes } from "../modules/auth/auth.route"
import { cartRoutes } from "../modules/cart/cart.route"
import { cakeRoutes } from "../modules/cakes/cake.route"
import { orderRoutes } from "../modules/orders/order.route"
import { userRoutes } from "../modules/users/user.route"
import { ratingRoutes } from "../modules/ratings/rating.route"

const router = express.Router()

const routerData = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
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
  {
    path: "/ratings",
    route: ratingRoutes,
  },
]

routerData.forEach((route) => router.use(route.path, route.route))

export default router
