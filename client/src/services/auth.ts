import type { IAuth, IAuthRequest, IRefreshToken } from '@/interfaces/auth'
import type { IBaseResponse } from '@/interfaces/base'
import axios from './api-caller'

export const apiLogin = async (data: IAuthRequest) => {
  return axios.post<IBaseResponse<any>>('/auth/login', data)
}

export const getMe = async () => {
  return axios.get<IBaseResponse<IAuth>>('/auth/me')
}

export const refreshToken = async (data: { refresh_token: string }) => {
  return axios.post<IBaseResponse<IRefreshToken>>('/auth/refresh-token', data)
}
