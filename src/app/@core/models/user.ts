export interface User {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  avatar: string
  gender: string
  phone: string
  birthday: string
  status: boolean
}

export interface Auth {
  user: User
  accessToken?: string
  refreshToken?: string
}
