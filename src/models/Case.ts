import moment from 'moment'
import { CaseStatus } from '@/utils/enums'
import { DateTimeFormat } from '@/utils/consts'
import User from './User'

export interface RespCase {
  caseId: number | string
  caseAddedById: number | string
  caseCaseNumber: string
  caseCourt: string
  caseTitle: string
  caseDescription?: string | null
  caseStatus: CaseStatus | string
  caseCreatedAt: string
  caseUpdatedAt: string
  caseDeletedAt?: string | null
  caseAddedBy$?: User | null
}

export default class Case {
  id: number
  addedById: number
  caseNumber: string
  court: string
  title: string
  description?: string | null
  status: CaseStatus
  createdAt: string
  updatedAt: string
  deletedAt?: string | null

  addedBy$?: User | null

  constructor(caseRef: Case) {
    this.id = caseRef.id
    this.addedById = caseRef.addedById
    this.caseNumber = caseRef.caseNumber
    this.court = caseRef.court
    this.title = caseRef.title
    this.description = caseRef.description
    this.status = caseRef.status
    this.createdAt = caseRef.createdAt
    this.updatedAt = caseRef.updatedAt
    this.deletedAt = caseRef.deletedAt
  }

  static fromResp(respCase: RespCase) {
    return new Case({
      id: +respCase.caseId,
      addedById: +respCase.caseAddedById,
      caseNumber: respCase.caseCaseNumber,
      court: respCase.caseCourt,
      title: respCase.caseTitle,
      description: respCase.caseDescription,
      status: +respCase.caseStatus,
      createdAt: moment(respCase.caseCreatedAt, DateTimeFormat).toISOString(),
      updatedAt: moment(respCase.caseUpdatedAt, DateTimeFormat).toISOString(),
      deletedAt: respCase.caseDeletedAt && moment(respCase.caseDeletedAt, DateTimeFormat).toISOString(),
    })
  }
}
