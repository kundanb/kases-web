import moment from 'moment'
import { Nullable } from '@/utils/types'
import { ApiDateFormat, ApiDateTimeFormat } from '@/utils/consts'
import { defNul } from '@/utils/funcs'
import Case, { RespCase } from './Case'

export interface RespHearing {
  hearingId: number
  hearingAddedById: number
  hearingCaseId: number
  hearingPreviousId?: Nullable<number>
  hearingDate: string
  hearingDescription?: Nullable<string>
  hearingCreatedAt: string
  hearingUpdatedAt: string

  $hearingCase?: Nullable<RespCase>
}

export default class Hearing implements RespHearing {
  hearingId: number
  hearingAddedById: number
  hearingCaseId: number
  hearingPreviousId: Nullable<number>
  hearingDate: string
  hearingDescription: Nullable<string>
  hearingCreatedAt: string
  hearingUpdatedAt: string

  $hearingCase: Nullable<Case>

  constructor(respHearing: RespHearing) {
    this.hearingId = respHearing.hearingId
    this.hearingAddedById = respHearing.hearingAddedById
    this.hearingCaseId = respHearing.hearingCaseId
    this.hearingPreviousId = defNul(respHearing.hearingPreviousId)
    this.hearingDate = moment(respHearing.hearingDate, ApiDateFormat).toISOString()
    this.hearingDescription = defNul(respHearing.hearingDescription)
    this.hearingCreatedAt = moment(respHearing.hearingCreatedAt, ApiDateTimeFormat).toISOString()
    this.hearingUpdatedAt = moment(respHearing.hearingUpdatedAt, ApiDateTimeFormat).toISOString()

    this.$hearingCase = defNul(respHearing.$hearingCase && new Case(respHearing.$hearingCase))
  }
}
