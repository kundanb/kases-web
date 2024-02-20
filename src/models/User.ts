import moment from 'moment'
import { UserRole } from '@/utils/enums'
import { DateTimeFormat } from '@/utils/consts'

export interface RespUser {
  userId: number | string
  userRole: UserRole | string
  userUsername: string
  userEmail?: string | null
  userEmailVerifiedAt?: string | null
  userName?: string | null
  userAvatar?: string | null
  userBio?: string | null
  userCreatedAt: string
  userUpdatedAt: string
  userDeletedAt?: string | null
}

export default class User {
  id: number
  role: UserRole
  username: string
  email?: string | null
  emailVerifiedAt?: string | null
  name?: string | null
  avatar?: string | null
  bio?: string | null
  createdAt: string
  updatedAt: string
  deletedAt?: string | null

  constructor(userRef: User) {
    this.id = userRef.id
    this.role = userRef.role
    this.username = userRef.username
    this.email = userRef.email
    this.emailVerifiedAt = userRef.emailVerifiedAt
    this.name = userRef.name
    this.avatar = userRef.avatar
    this.bio = userRef.bio
    this.createdAt = userRef.createdAt
    this.updatedAt = userRef.updatedAt
    this.deletedAt = userRef.deletedAt
  }

  static fromResp(respUser: RespUser) {
    return new User({
      id: +respUser.userId,
      role: +respUser.userRole,
      username: respUser.userUsername,
      email: respUser.userEmail,
      emailVerifiedAt:
        respUser.userEmailVerifiedAt && moment(respUser.userEmailVerifiedAt, DateTimeFormat).toISOString(),
      name: respUser.userName,
      avatar: respUser.userAvatar,
      bio: respUser.userBio,
      createdAt: moment.utc(respUser.userCreatedAt, DateTimeFormat).toISOString(),
      updatedAt: moment.utc(respUser.userUpdatedAt, DateTimeFormat).toISOString(),
      deletedAt: respUser.userDeletedAt && moment.utc(respUser.userDeletedAt, DateTimeFormat).toISOString(),
    })
  }
}
