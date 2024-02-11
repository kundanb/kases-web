export { AxiosError } from 'axios'

export interface ApiOkResp<T = null> {
  message?: string
  data?: T
}

export interface ApiErrResp<T = Record<string, string>> {
  message: string
  errors?: Record<keyof T, string>
}
