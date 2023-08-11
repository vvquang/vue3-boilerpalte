export interface IMeta {
  currentPage: number
  from: number
  lastPage: number
  perPage: number
  to: number
  total: number
}

export interface IBaseResponse<T = any> {
  success: boolean
  result: {
    meta?: IMeta
    data: T
  }
  error?: any
  errorMessage?: any
}

export interface IKeyValuePair<T> {
  [key: string]: T
}
