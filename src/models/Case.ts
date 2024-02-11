import moment from 'moment'
import { CaseStatus } from '@/utils/enums'
import { DateTimeFormat } from '@/utils/consts'
import User from './User'

export interface RespCase {
  id: number
  added_by_id: number
  case_number: string
  title: string
  description?: string
  status: CaseStatus
  created_at: string
  updated_at: string
}

export default class Case {
  id: number
  addedById: number
  caseNumber: string
  title: string
  description?: string
  status: CaseStatus
  createdAt: string
  updatedAt: string

  addedBy$?: User

  constructor(caseRef: Case) {
    this.id = caseRef.id
    this.addedById = caseRef.addedById
    this.caseNumber = caseRef.caseNumber
    this.title = caseRef.title
    this.description = caseRef.description
    this.status = caseRef.status
    this.createdAt = caseRef.createdAt
    this.updatedAt = caseRef.updatedAt
  }

  static fromResp(respCase: RespCase) {
    return new Case({
      id: respCase.id,
      addedById: respCase.added_by_id,
      caseNumber: respCase.case_number,
      title: respCase.title,
      description: respCase.description,
      status: respCase.status,
      createdAt: moment.utc(respCase.created_at, DateTimeFormat).toISOString(),
      updatedAt: moment.utc(respCase.updated_at, DateTimeFormat).toISOString(),
    })
  }
}
