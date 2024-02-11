import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, ApiErrResp, ApiOkResp } from '@/utils/types'
import { ErrorMessages } from '@/utils/consts'
import axios from '@/utils/axios'
import Case, { RespCase } from '@/models/Case'

export interface CreateCaseApiBody {
  case_number: string
  title: string
  description?: string
}

export type CreateCaseApiOkResp = ApiOkResp
export type CreateCaseApiErrResp = ApiErrResp<CreateCaseApiBody>

export const createCaseApi = createAsyncThunk<void, CreateCaseApiBody>(
  'auth/register',

  async (values, { rejectWithValue }) => {
    try {
      await axios.post<CreateCaseApiOkResp>('/cases/new', values)
    } catch (e) {
      const err = e as AxiosError<CreateCaseApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    }
  }
)

export interface MyCasesApiBody {
  page?: number
  perPage?: number
}

export type MyCasesApiOkResp = ApiOkResp<RespCase[]>
export type MyCasesApiErrResp = ApiErrResp

export const myCasesApi = createAsyncThunk<Case[], MyCasesApiBody | undefined>(
  'cases/my',

  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<MyCasesApiOkResp>('/cases', { params: values })
      return data.data!.map(c => ({ ...Case.fromResp(c) }))
    } catch (e) {
      const err = e as AxiosError<MyCasesApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    }
  }
)

export type MyCaseApiBody = number

export type MyCaseApiOkResp = ApiOkResp<RespCase>
export type MyCaseApiErrResp = ApiErrResp

export const myCaseApi = createAsyncThunk<Case, MyCaseApiBody>(
  'cases/my',

  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<MyCaseApiOkResp>('/cases/' + id)
      return { ...Case.fromResp(data.data!) }
    } catch (e) {
      const err = e as AxiosError<MyCaseApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    }
  }
)

export interface UpdateCaseApiBody {
  id: number
  title?: string
  description?: string
}

export type UpdateCaseApiOkResp = ApiOkResp
export type UpdateCaseApiErrResp = ApiErrResp<Omit<UpdateCaseApiBody, 'id'>>

export const updateCaseApi = createAsyncThunk<void, UpdateCaseApiBody>(
  'cases/update',

  async ({ id, ...values }, { rejectWithValue }) => {
    try {
      await axios.put<UpdateCaseApiOkResp>('/cases/' + id, values)
    } catch (e) {
      const err = e as AxiosError<UpdateCaseApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    }
  }
)

export type DeleteCaseApiBody = number

export type DeleteCaseApiOkResp = ApiOkResp
export type DeleteCaseApiErrResp = ApiErrResp

export const deleteCaseApi = createAsyncThunk<void, DeleteCaseApiBody>(
  'cases/delete',

  async (id, { rejectWithValue }) => {
    try {
      await axios.delete<DeleteCaseApiOkResp>('/cases/' + id)
    } catch (e) {
      const err = e as AxiosError<DeleteCaseApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    }
  }
)
