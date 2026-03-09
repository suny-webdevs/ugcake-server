export type TAuth = {
  email: string
  password: string
  name?: string
}

export type TChangePassword = {
  oldPassword: string
  newPassword: string
}
