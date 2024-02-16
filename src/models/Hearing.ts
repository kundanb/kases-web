import moment from 'moment'
import { DateTimeFormat } from '@/utils/consts'
import Case from './Case'

export interface RespHearing {
  id: number
  case_id: number
  date: string
  description?: string | null
  previous_id?: number | null
  created_at: string
  updated_at: string
}

export default class Hearing {
  id: number
  caseId: number
  date: string
  description?: string | null
  previousId?: number | null
  createdAt: string
  updatedAt: string

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
  }

  static fromResp(respHearing: RespHearing) {
    return new Hearing({
      id: respHearing.id,
      caseId: respHearing.case_id,
      date: moment.utc(respHearing.date, DateTimeFormat).toISOString(),
      description: respHearing.description,
      previousId: respHearing.previous_id,
      createdAt: moment.utc(respHearing.created_at, DateTimeFormat).toISOString(),
      updatedAt: moment.utc(respHearing.updated_at, DateTimeFormat).toISOString(),
    })
  }
}
