import { Request } from "express"
import httpStatus from "http-status"
import prisma from "../../lib/prisma"
import AppError from "../../errors/AppError"

const create_cake_details = async (req: Request) => {
  const {
    orderId,
    size,
    text,
    flavour,
    isEggLess,
    isLessCream,
    isExtraJuicy,
    shape,
    icingType,
    icingColor,
    tiers,
    height,
  } = req.body

  // Check if order exists
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  })

  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found")
  }

  // Create cake details
  const cakeDetails = await prisma.cakeDetails.create({
    data: {
      orderId,
      size,
      text,
      flavour,
      isEggLess: isEggLess || false,
      isLessCream: isLessCream || false,
      isExtraJuicy: isExtraJuicy || false,
      shape,
      icingType,
      icingColor,
      tiers,
      height,
    },
    include: {
      order: true,
    },
  })

  return cakeDetails
}

const get_all_cake_details = async () => {
  const cakeDetails = await prisma.cakeDetails.findMany({
    include: {
      order: true,
    },
  })

  return cakeDetails
}

const get_cake_details = async (id: string) => {
  const cakeDetails = await prisma.cakeDetails.findUnique({
    where: { id },
    include: {
      order: true,
    },
  })

  if (!cakeDetails) {
    throw new AppError(httpStatus.NOT_FOUND, "Cake details not found")
  }

  return cakeDetails
}

const get_cake_details_by_order = async (orderId: string) => {
  const cakeDetails = await prisma.cakeDetails.findUnique({
    where: { orderId },
    include: {
      order: true,
    },
  })

  if (!cakeDetails) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Cake details not found for this order",
    )
  }

  return cakeDetails
}

const update_cake_details = async (id: string, payload: any) => {
  const cakeDetails = await prisma.cakeDetails.findUnique({
    where: { id },
  })

  if (!cakeDetails) {
    throw new AppError(httpStatus.NOT_FOUND, "Cake details not found")
  }

  const updatedCakeDetails = await prisma.cakeDetails.update({
    where: { id },
    data: payload,
    include: {
      order: true,
    },
  })

  return updatedCakeDetails
}

const delete_cake_details = async (id: string) => {
  const cakeDetails = await prisma.cakeDetails.findUnique({
    where: { id },
  })

  if (!cakeDetails) {
    throw new AppError(httpStatus.NOT_FOUND, "Cake details not found")
  }

  await prisma.cakeDetails.delete({
    where: { id },
  })

  return { message: "Cake details deleted successfully" }
}

export const cakeDetailsService = {
  create_cake_details,
  get_all_cake_details,
  get_cake_details,
  get_cake_details_by_order,
  update_cake_details,
  delete_cake_details,
}
