import moment from 'moment'
import { DateTimeFormat } from '@/utils/consts'
import Case, { RespCase } from './Case'

export interface RespHearing {
  hearingId: number | string
  hearingCaseId: number | string
  hearingDate: string
  hearingDescription?: string | null
  hearingPreviousId?: number | null
  hearingCreatedAt: string
  hearingUpdatedAt: string
  hearingDeletedAt?: string | null
  hearingCase$?: RespCase | null
  hearingPrevious$?: RespHearing | null
}

export default class Hearing {
  id: number
  caseId: number
  date: string
  description?: string | null
  previousId?: number | null
  createdAt: string
  updatedAt: string
  deletedAt?: string | null

  case$?: Case | null
  previous$?: Hearing | null

  constructor(hearingRef: Hearing) {
    this.id = hearingRef.id
    this.caseId = hearingRef.caseId
    this.date = hearingRef.date
    this.description = hearingRef.description
    this.previousId = hearingRef.previousId
    this.createdAt = hearingRef.createdAt
    this.updatedAt = hearingRef.updatedAt
    this.deletedAt = hearingRef.deletedAt
    this.case$ = hearingRef.case$
    this.previous$ = hearingRef.previous$
  }

  static fromResp(respHearing: RespHearing) {
    return new Hearing({
      id: +respHearing.hearingId,
      caseId: +respHearing.hearingCaseId,
      date: moment.utc(respHearing.hearingDate, DateTimeFormat).toISOString(),
      description: respHearing.hearingDescription,
      previousId: respHearing.hearingPreviousId,
      createdAt: moment.utc(respHearing.hearingCreatedAt, DateTimeFormat).toISOString(),
      updatedAt: moment.utc(respHearing.hearingUpdatedAt, DateTimeFormat).toISOString(),
      deletedAt: respHearing.hearingDeletedAt && moment.utc(respHearing.hearingDeletedAt, DateTimeFormat).toISOString(),
      case$: respHearing.hearingCase$ ? Case.fromResp(respHearing.hearingCase$) : null,
    })
  }
}
