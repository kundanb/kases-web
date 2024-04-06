import { ApiProps, ApiPropsWithBody, ApiOkResp } from '@/utils/types'
import { UserRole } from '@/utils/enums'

export interface RegisterApi {
  Props: ApiPropsWithBody<{
    userRole: UserRole
    userUsername: string
    userEmail: string
    userPassword: string
  }>

  Resp: ApiOkResp<{
    authToken: string
  }>

  Data: {
    authToken: string
  }
}

export interface LoginApi {
  Props: ApiPropsWithBody<{
    userUnique: string
    userPassword: string
  }>

  Resp: ApiOkResp<{
    authToken: string
  }>

  Data: {
    authToken: string
  }
}

export interface LogoutApi {
  Props: ApiProps
  Resp: ApiOkResp
  Data: void
}
