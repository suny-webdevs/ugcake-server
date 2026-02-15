import { Cake, Cart, User } from "@prisma/client"
import prisma from "../../lib/prisma"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Request } from "express"

const create_cart = async (req: Request) => {
  const { cakeId, quantity } = req.body
  const userID = req.user.id

  const user = (await prisma.user.findUnique({ where: { id: userID } })) as User
  const cake = (await prisma.cake.findUnique({ where: { id: cakeId } })) as Cake
  const cartItem = await prisma.cart.findFirst({
    where: { userId: userID, cakeId },
  })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  if (cartItem) {
    throw new AppError(httpStatus.BAD_REQUEST, "Item already exist")
  }

  if (quantity < 1 || quantity > cake.stock) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Your quantity is not acceptable",
    )
  }

  const cart = await prisma.cart.create({
    data: {
      userId: userID,
      cakeId,
      quantity,
    },
  })

  return cart
}

const get_all_cart = async () => {
  const carts = await prisma.cart.findMany()
  return carts
}

const get_cart = async (req: Request) => {
  const { id } = req.body
  const cart = await prisma.cart.findUnique({ where: { id } })
  return cart
}

const update_cart = async (req: Request) => {
  const { id, payload } = req.body
  const res = await prisma.cart.update({
    where: { id },
    data: payload,
  })
  return res
}

const delete_cart = async (req: Request) => {
  const { id } = req.body
  const res = await prisma.cart.delete({ where: { id } })
  return res
}

export const cartService = {
  create_cart,
  get_all_cart,
  get_cart,
  update_cart,
  delete_cart,
}
