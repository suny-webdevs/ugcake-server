import prisma from "../../lib/prisma"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Request } from "express"

const create_order = async (req: Request) => {
  const {
    userId,
    cakeId,
    quantity,
    totalPrice,
    status,
    paymentMethod,
    message,
  } = req.body

  // Check if cake exists and has sufficient stock
  const cake = await prisma.cake.findUnique({
    where: { id: cakeId },
  })

  if (!cake) {
    throw new AppError(httpStatus.NOT_FOUND, "Cake not found")
  }

  if (cake.stock < quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Insufficient stock. Available: ${cake.stock}, Requested: ${quantity}`,
    )
  }

  // Create order and update cake stock and sold amount in transaction
  const order = await prisma.order.create({
    data: {
      userId,
      cakeId,
      quantity,
      totalPrice,
      status: status ?? "PENDING",
      paymentMethod: paymentMethod ?? "CASH_ON_DELIVERY",
      message: message ?? null,
    },
    include: {
      user: true,
      cake: true,
    },
  })

  // Update cake stock and soldAmount
  await prisma.cake.update({
    where: { id: cakeId },
    data: {
      stock: {
        decrement: quantity,
      },
      soldAmount: {
        increment: quantity,
      },
    },
  })

  return order
}

const get_all_order = async () => {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      cake: true,
    },
  })
  return orders
}

const get_order = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      cake: true,
    },
  })
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
    include: {
      user: true,
      cake: true,
    },
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
