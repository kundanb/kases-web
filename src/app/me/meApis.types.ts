import { ApiProps, ApiOkResp } from '@/utils/types'
import User, { RespUser } from '@/models/User'
import Case, { RespCase } from '@/models/Case'
import Hearing, { RespHearing } from '@/models/Hearing'

export interface FetchMeApi {
  Props: ApiProps | void
  Resp: ApiOkResp<RespUser>
  Data: User | void
}

export interface DashboardApi {
  Props: ApiProps | void

  Resp: ApiOkResp<{
    casesTotal: number
    casesOpenCount: number
    casesOpen: RespCase[]
    hearingsTotal: number
    hearingsTodayCount: number
    hearingsUpcomingCount: number
    hearingsToday: RespHearing[]
    hearingsUpcoming: RespHearing[]
  }>

  Data: {
    casesTotal: number
    casesOpenCount: number
    casesOpen: Case[]
    hearingsTotal: number
    hearingsTodayCount: number
    hearingsUpcomingCount: number
    hearingsToday: Hearing[]
    hearingsUpcoming: Hearing[]
  }
}
