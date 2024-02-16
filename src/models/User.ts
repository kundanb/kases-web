import moment from 'moment'
import { UserRole } from '@/utils/enums'
import { DateTimeFormat } from '@/utils/consts'

export interface RespUser {
  id: number
  role: UserRole
  username: string
  email?: string | null
  email_verified_at?: string | null
  name?: string | null
  avatar?: string | null
  bio?: string | null
  created_at: string
  updated_at: string
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
      emailVerifiedAt: respUser.email_verified_at && moment(respUser.email_verified_at, DateTimeFormat).toISOString(),
      name: respUser.name,
      avatar: respUser.avatar,
      bio: respUser.bio,
      createdAt: moment.utc(respUser.created_at, DateTimeFormat).toISOString(),
      updatedAt: moment.utc(respUser.updated_at, DateTimeFormat).toISOString(),
    })
  }
}
