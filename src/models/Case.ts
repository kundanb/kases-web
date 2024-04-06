import moment from 'moment'
import { Nullable } from '@/utils/types'
import { CaseStatus } from '@/utils/enums'
import { ApiDateTimeFormat, ApiYearFormat } from '@/utils/consts'
import { defNul } from '@/utils/funcs'
import Hearing, { RespHearing } from './Hearing'

export interface RespCase {
  caseId: number
  caseAddedById: number
  caseCourtName: string
  caseNumber: string
  caseCNRNumber: string
  caseYear: string
  caseTitle: string
  casePartyName: string
  caseDescription?: Nullable<string>
  caseStatus: CaseStatus
  caseNextHearingId?: Nullable<number>
  caseCreatedAt: string
  caseUpdatedAt: string

  $caseNextHearing?: Nullable<RespHearing>
}

export default class Case implements RespCase {
  caseId: number
  caseAddedById: number
  caseCourtName: string
  caseNumber: string
  caseCNRNumber: string
  caseYear: string
  caseTitle: string
  casePartyName: string
  caseDescription: Nullable<string>
  caseStatus: CaseStatus
  caseNextHearingId: Nullable<number>
  caseCreatedAt: string
  caseUpdatedAt: string

  $caseNextHearing: Nullable<Hearing>

  constructor(respCase: RespCase) {
    this.caseId = respCase.caseId
    this.caseAddedById = respCase.caseAddedById
    this.caseCourtName = respCase.caseCourtName
    this.caseNumber = respCase.caseNumber
    this.caseCNRNumber = respCase.caseCNRNumber
    this.caseYear = moment(respCase.caseYear, ApiYearFormat).toISOString()
    this.caseTitle = respCase.caseTitle
    this.casePartyName = respCase.casePartyName
    this.caseDescription = defNul(respCase.caseDescription)
    this.caseStatus = respCase.caseStatus
    this.caseNextHearingId = defNul(respCase.caseNextHearingId)
    this.caseCreatedAt = moment(respCase.caseCreatedAt, ApiDateTimeFormat).toISOString()
    this.caseUpdatedAt = moment(respCase.caseUpdatedAt, ApiDateTimeFormat).toISOString()

    this.$caseNextHearing = defNul(respCase.$caseNextHearing && new Hearing(respCase.$caseNextHearing))
  }
}
