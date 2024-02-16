export { type AxiosError } from 'axios'

export interface ApiBaseProps {
  setIsLoading?: React.Dispatch<React.SetStateAction<number>>
}

export interface ApiBasePropsWithBody<Body> extends ApiBaseProps {
  body: Body
}

export interface ApiOkResp<T = null> {
  message?: string | null
  data?: T | null
}

export interface ApiErrResp<T = Record<string, string>> {
  message: string
  errors?: Record<keyof T, string> | null
}
