import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Request } from "express"
import prisma from "../../lib/prisma"

const create_specification = async (req: Request) => {
  const body = req.body

  const specification = await prisma.specification.create({
    data: {
      cakeId: body.cakeId,
      label: body.label,
      value: body.value,
    },
  })

  return specification
}

const get_all_specification = async () => {
  const specifications = await prisma.specification.findMany()
  return specifications
}

const get_specification = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const specification = await prisma.specification.findUnique({ where: { id } })
  if (!specification) {
    throw new AppError(httpStatus.NOT_FOUND, "Specification not found")
  }
  return specification
}

const update_specification = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const { payload } = req.body
  const specification = await prisma.specification.update({
    where: { id },
    data: payload,
  })
  return specification
}

const delete_specification = async (req: Request) => {
  const id = req.params.id ?? req.body?.id
  const specification = await prisma.specification.delete({ where: { id } })
  return specification
}

export const specificationService = {
  create_specification,
  get_all_specification,
  get_specification,
  update_specification,
  delete_specification,
}
