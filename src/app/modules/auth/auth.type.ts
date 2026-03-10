export type TAuth = {
  email: string
  password: string
  role?: "ADMIN" | "USER" | "DELIVERY_MAN" | "MODERATOR"
}

export type TAuthResponse = {
  id: string
  email: string
  role: "ADMIN" | "USER" | "DELIVERY_MAN" | "MODERATOR"
  createdAt: Date
  updatedAt: Date
  profile?: {
    id: string
    userId: string
    name: string
    image: string | null
    phone: string | null
    address: string | null
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
  } | null
}

export type TChangePassword = {
  oldPassword: string
  newPassword: string
}
