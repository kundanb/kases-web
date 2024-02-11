import moment from 'moment'
import { UserRole } from '@/utils/enums'
import { DateTimeFormat } from '@/utils/consts'

export interface RespUser {
  id: number
  role: UserRole
  username: string
  email?: string
  email_verified_at?: string
  name?: string
  avatar?: string
  bio?: string
  created_at: string
  updated_at: string
}

export default class User {
  id: number
  role: UserRole
  username: string
  email?: string
  emailVerifiedAt?: moment.Moment
  name?: string
  avatar?: string
  bio?: string
  createdAt: string
  updatedAt: string

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
  }

  static fromResp(respUser: RespUser) {
    return new User({
      id: respUser.id,
      role: respUser.role,
      username: respUser.username,
      email: respUser.email,
      emailVerifiedAt: respUser.email_verified_at ? moment(respUser.email_verified_at, DateTimeFormat) : undefined,
      name: respUser.name,
      avatar: respUser.avatar,
      bio: respUser.bio,
      createdAt: moment.utc(respUser.created_at, DateTimeFormat).toISOString(),
      updatedAt: moment.utc(respUser.updated_at, DateTimeFormat).toISOString(),
    })
  }
}
