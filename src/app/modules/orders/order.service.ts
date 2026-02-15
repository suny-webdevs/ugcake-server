import prisma from "../../lib/prisma"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Request } from "express"

const create_order = async (req: Request) => {
  const { userId, cakeId, quantity, totalPrice, status, paymentMethod, message } =
    req.body

  const order = await prisma.order.create({
    data: {
      userId,
      cakeId,
      quantity: quantity ?? 1,
      totalPrice,
      status: status ?? "PENDING",
      paymentMethod: paymentMethod ?? "COD",
      message: message ?? null,
    },
  })

  return order
}

const get_all_order = async () => {
  const orders = await prisma.order.findMany()
  return orders
}

const get_order = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const order = await prisma.order.findUnique({ where: { id } })
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found")
  }
  return order
}

const update_order = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const { payload } = req.body
  const order = await prisma.order.update({
    where: { id },
    data: payload,
  })
  return order
}

const delete_order = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const order = await prisma.order.delete({ where: { id } })
  return order
}

export const orderService = {
  create_order,
  get_all_order,
  get_order,
  update_order,
  delete_order,
}
