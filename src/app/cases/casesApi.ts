import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AxiosError, ApiErrResp, ApiOkResp, ApiBasePropsWithBody } from '@/utils/types'
import { ErrorMessages } from '@/utils/consts'
import axios from '@/utils/axios'
import Case, { RespCase } from '@/models/Case'

export type CreateCaseApiProps = ApiBasePropsWithBody<{
  case_number: string
  title: string
  description?: string | null
}>

export type CreateCaseApiOkResp = ApiOkResp
export type CreateCaseApiErrResp = ApiErrResp<CreateCaseApiProps['body']>

export const createCaseApi = createAsyncThunk<undefined, CreateCaseApiProps>(
  'cases/create',

  async ({ setIsLoading, body }, { rejectWithValue }) => {
    setIsLoading?.(prev => prev + 1)

    try {
      await axios.post<CreateCaseApiOkResp>('/cases/new', body)
    } catch (e) {
      const err = e as AxiosError<CreateCaseApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    } finally {
      setIsLoading?.(prev => prev - 1)
    }
  },
)

export type MyCasesApiProps = ApiBasePropsWithBody<undefined | { page?: number; perPage?: number }>

export type MyCasesApiOkResp = ApiOkResp<RespCase[]>
export type MyCasesApiErrResp = ApiErrResp

export const myCasesApi = createAsyncThunk<Case[], undefined | MyCasesApiProps>(
  'cases/my/all',

  async (props, { rejectWithValue }) => {
    props?.setIsLoading?.(prev => prev + 1)

    try {
      const { data } = await axios.get<MyCasesApiOkResp>('/cases', { params: props?.body })
      return data.data!.map(c => ({ ...Case.fromResp(c) }))
    } catch (e) {
      const err = e as AxiosError<MyCasesApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    } finally {
      props?.setIsLoading?.(prev => prev - 1)
    }
  },
)

export type MyCaseApiProps = ApiBasePropsWithBody<number>

export type MyCaseApiOkResp = ApiOkResp<RespCase>
export type MyCaseApiErrResp = ApiErrResp

export const myCaseApi = createAsyncThunk<Case, MyCaseApiProps>(
  'cases/my',

  async ({ setIsLoading, body: id }, { rejectWithValue }) => {
    setIsLoading?.(prev => prev + 1)

    try {
      const { data } = await axios.get<MyCaseApiOkResp>(`/cases/${id}`)
      return { ...Case.fromResp(data.data!) }
    } catch (e) {
      const err = e as AxiosError<MyCaseApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    } finally {
      setIsLoading?.(prev => prev - 1)
    }
  },
)

export type UpdateCaseApiProps = ApiBasePropsWithBody<{
  id: number
  case_number: string
  title: string
  description?: string | null
}>

export type UpdateCaseApiOkResp = ApiOkResp
export type UpdateCaseApiErrResp = ApiErrResp<Omit<UpdateCaseApiProps['body'], 'id'>>

export const updateCaseApi = createAsyncThunk<undefined, UpdateCaseApiProps>(
  'cases/update',

  async ({ setIsLoading, body: { id, ...body } }, { rejectWithValue }) => {
    setIsLoading?.(prev => prev + 1)

    try {
      await axios.put<UpdateCaseApiOkResp>(`/cases/${id}`, body)
    } catch (e) {
      const err = e as AxiosError<UpdateCaseApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    } finally {
      setIsLoading?.(prev => prev - 1)
    }
  },
)

export type DeleteCaseApiProps = ApiBasePropsWithBody<number>

export type DeleteCaseApiOkResp = ApiOkResp
export type DeleteCaseApiErrResp = ApiErrResp

export const deleteCaseApi = createAsyncThunk<undefined, DeleteCaseApiProps>(
  'cases/delete',

  async ({ setIsLoading, body: id }, { rejectWithValue }) => {
    setIsLoading?.(prev => prev + 1)

    try {
      await axios.delete<DeleteCaseApiOkResp>(`/cases/${id}`)
    } catch (e) {
      const err = e as AxiosError<DeleteCaseApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    } finally {
      setIsLoading?.(prev => prev - 1)
    }
  },
)
