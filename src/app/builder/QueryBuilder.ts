/**
 * Builds Prisma findMany-style args from request query.
 * Use with: prisma.model.findMany({ ...queryBuilder.build() })
 */
export type SortOrder = "asc" | "desc"

export interface QueryBuilderResult {
  where: Record<string, unknown>
  orderBy: Record<string, SortOrder>
  skip: number
  take: number
  select?: Record<string, boolean>
}

class QueryBuilder {
  public query: Record<string, unknown>
  private where: Record<string, unknown> = {}
  private orderBy: Record<string, SortOrder> = { createdAt: "desc" }
  private skip = 0
  private take = 10
  private select: Record<string, boolean> | undefined

  constructor(query: Record<string, unknown>) {
    this.query = query
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm as string | undefined
    if (searchTerm) {
      this.where = {
        ...(this.where as object),
        OR: searchableFields.map((field) => ({
          [field]: { contains: searchTerm, mode: "insensitive" },
        })),
      }
    }
    return this
  }

  filter(excludeFields: string[] = ["searchTerm", "sort", "limit", "page", "fields"]) {
    const queryObj = { ...this.query }
    excludeFields.forEach((el) => delete queryObj[el])
    const filterWhere = queryObj as Record<string, unknown>
    if (Object.keys(filterWhere).length > 0) {
      this.where = { ...(this.where as object), ...filterWhere }
    }
    return this
  }

  sort(defaultSort: string = "createdAt") {
    const sortStr = (this.query?.sort as string)?.split(",")?.join(" ") ?? `-${defaultSort}`
    const orderBy: Record<string, SortOrder> = {}
    for (const part of sortStr.split(/\s+/)) {
      const desc = part.startsWith("-")
      const field = desc ? part.slice(1) : part
      orderBy[field] = desc ? "desc" : "asc"
    }
    this.orderBy = Object.keys(orderBy).length ? orderBy : { [defaultSort]: "desc" }
    return this
  }

  paginate() {
    const page = Number(this.query?.page) || 1
    const limit = Number(this.query?.limit) || 10
    this.skip = (page - 1) * limit
    this.take = limit
    return this
  }

  fields(fieldsStr?: string) {
    const raw = (this.query?.fields as string) ?? fieldsStr
    if (raw) {
      const keys = raw.split(",").map((s) => s.trim().replace(/^-/, ""))
      this.select = keys.length ? Object.fromEntries(keys.map((k) => [k, true])) : undefined
    }
    return this
  }

  build(): QueryBuilderResult {
    const result: QueryBuilderResult = {
      where: this.where,
      orderBy: this.orderBy,
      skip: this.skip,
      take: this.take,
    }
    if (this.select) result.select = this.select
    return result
  }

  async countTotal(model: { count: (args: { where: unknown }) => Promise<number> }) {
    const total = await model.count({ where: this.where })
    const page = Number(this.query?.page) || 1
    const limit = Number(this.query?.limit) || 10
    const totalPage = Math.ceil(total / limit)
    return { page, limit, total, totalPage }
  }
}

export default QueryBuilder
