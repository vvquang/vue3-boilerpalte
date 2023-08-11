import { ERoles } from '@/enums/roles'

export interface IAuth {
  id?: number | null
  email: string | null
  name: string | null
  role: ERoles | null
}

export interface IAuthRequest {
  email: string
  password: string
}

export interface IRefreshToken {
  accessToken: string
  id: number
  name: string
  email: string
  role: ERoles
  tokenExpireTime: string | null
  refreshToken: string
}
