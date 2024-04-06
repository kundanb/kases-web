import moment from 'moment'
import { Nullable } from '@/utils/types'
import { UserRole } from '@/utils/enums'
import { ApiDateTimeFormat } from '@/utils/consts'
import { defNul } from '@/utils/funcs'

export interface RespUser {
  userId: number
  userRole: UserRole
  userUsername: string
  userEmail?: Nullable<string>
  userEmailVerifiedAt?: Nullable<string>
  userName?: Nullable<string>
  userAvatar?: Nullable<string>
  userBio?: Nullable<string>
  userCreatedAt: string
  userUpdatedAt: string
}

export default class User implements RespUser {
  userId: number
  userRole: UserRole
  userUsername: string
  userEmail: Nullable<string>
  userEmailVerifiedAt: Nullable<string>
  userName: Nullable<string>
  userAvatar: Nullable<string>
  userBio: Nullable<string>
  userCreatedAt: string
  userUpdatedAt: string

  constructor(respUser: RespUser) {
    this.userId = respUser.userId
    this.userRole = respUser.userRole
    this.userUsername = respUser.userUsername
    this.userEmail = defNul(respUser.userEmail)
    this.userEmailVerifiedAt = defNul(
      respUser.userEmailVerifiedAt && moment(respUser.userEmailVerifiedAt, ApiDateTimeFormat).toISOString(),
    )
    this.userName = defNul(respUser.userName)
    this.userAvatar = defNul(respUser.userAvatar)
    this.userBio = defNul(respUser.userBio)
    this.userCreatedAt = moment(respUser.userCreatedAt, ApiDateTimeFormat).toISOString()
    this.userUpdatedAt = moment(respUser.userUpdatedAt, ApiDateTimeFormat).toISOString()
  }
}
