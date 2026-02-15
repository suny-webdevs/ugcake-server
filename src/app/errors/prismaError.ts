import { Prisma } from "@prisma/client"
import { IErrorSources, IGenericErrorResponse } from "../interface/error"

const handlePrismaError = (
  err: Prisma.PrismaClientKnownRequestError
): IGenericErrorResponse => {
  let statusCode = 400
  let message = "Database error"
  let errorSources: IErrorSources[] = [{ path: "", message: err.message }]

  switch (err.code) {
    case "P2002": {
      // Unique constraint violation
      statusCode = 400
      message = "Data Existing Error"
      const target = err.meta?.target as string[] | undefined
      const field = Array.isArray(target) ? target.join(", ") : "Field"
      errorSources = [{ path: field, message: `${field} is already exist` }]
      break
    }
    case "P2003": {
      // Foreign key constraint failed
      statusCode = 400
      message = "Invalid reference"
      break
    }
    case "P2025": {
      // Record not found
      statusCode = 404
      const cause = err.meta?.cause
      message = typeof cause === "string" ? cause : "Record not found"
      break
    }
    default:
      break
  }

  return {
    statusCode,
    message,
    errorSources,
  }
}

export default handlePrismaError
