import express from "express"
import { AuthRoutes } from "../modules/auth/auth.route"
import { cakeRoutes } from "../modules/cakes/cake.route"
import { orderRoutes } from "../modules/orders/order.route"
import { userRoutes } from "../modules/users/user.route"
import { ratingRoutes } from "../modules/ratings/rating.route"
import { profileRoute } from "../modules/profile/profile.route"
import { categoryRoute } from "../modules/category/category.route"
import { cakeFeaturesRoute } from "../modules/cake-features/cake-features.route"

const router = express.Router()

const routerData = [
  {
    path: "/auth",
    route: AuthRoutes,
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
    path: "/profiles",
    route: profileRoute,
  },
  {
    path: "/categories",
    route: categoryRoute,
  },
  {
    path: "/cake-features",
    route: cakeFeaturesRoute,
  },
  {
    path: "/ratings",
    route: ratingRoutes,
  },
]

routerData.forEach((route) => router.use(route.path, route.route))

export default router
