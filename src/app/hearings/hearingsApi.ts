import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AxiosError, ApiErrResp, ApiOkResp, ApiBasePropsWithBody } from '@/utils/types'
import { ErrorMessages } from '@/utils/consts'
import axios from '@/utils/axios'
import Hearing, { RespHearing } from '@/models/Hearing'

export type CreateHearingApiProps = ApiBasePropsWithBody<{
  hearingCaseId: number
  hearingDate: string
  hearingDescription?: string | null
}>

export type CreateHearingApiOkResp = ApiOkResp
export type CreateHearingApiErrResp = ApiErrResp<CreateHearingApiProps['body']>

export const createHearingApi = createAsyncThunk<undefined, CreateHearingApiProps>(
  'hearings/create',

  async ({ setIsLoading, body }, { rejectWithValue }) => {
    setIsLoading?.(prev => prev + 1)

    try {
      await axios.post<CreateHearingApiOkResp>('/hearings/new', body)
    } catch (e) {
      const err = e as AxiosError<CreateHearingApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    } finally {
      setIsLoading?.(prev => prev - 1)
    }
  },
)

export type MyHearingsApiProps = ApiBasePropsWithBody<{
  search?: string
  page?: number
  perPage?: number
}>

export type MyHearingsApiOkResp = ApiOkResp<RespHearing[]>
export type MyHearingsApiErrResp = ApiErrResp

export const myHearingsApi = createAsyncThunk<Hearing[], undefined | MyHearingsApiProps>(
  'hearings/my/all',

  async (props, { rejectWithValue }) => {
    props?.setIsLoading?.(prev => prev + 1)

    try {
      const { data } = await axios.get<MyHearingsApiOkResp>('/hearings', { params: props?.body })
      return data.data!.map(c => ({ ...Hearing.fromResp(c) }))
    } catch (e) {
      const err = e as AxiosError<MyHearingsApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    } finally {
      props?.setIsLoading?.(prev => prev - 1)
    }
  },
)

export type MyHearingApiProps = ApiBasePropsWithBody<number>

export type MyHearingApiOkResp = ApiOkResp<RespHearing>
export type MyHearingApiErrResp = ApiErrResp

export const myHearingApi = createAsyncThunk<Hearing, MyHearingApiProps>(
  'hearings/my',

  async ({ setIsLoading, body: id }, { rejectWithValue }) => {
    setIsLoading?.(prev => prev + 1)

    try {
      const { data } = await axios.get<MyHearingApiOkResp>(`/hearings/${id}`)
      return { ...Hearing.fromResp(data.data!) }
    } catch (e) {
      const err = e as AxiosError<MyHearingApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    } finally {
      setIsLoading?.(prev => prev - 1)
    }
  },
)

export type UpdateHearingApiProps = ApiBasePropsWithBody<{
  hearingId: number
  hearingDate: string
  hearingDescription?: string | null
}>

export type UpdateHearingApiOkResp = ApiOkResp
export type UpdateHearingApiErrResp = ApiErrResp<Omit<UpdateHearingApiProps['body'], 'id'>>

export const updateHearingApi = createAsyncThunk<undefined, UpdateHearingApiProps>(
  'hearings/update',

  async ({ setIsLoading, body: { hearingId: id, ...body } }, { rejectWithValue }) => {
    setIsLoading?.(prev => prev + 1)

    try {
      await axios.put<UpdateHearingApiOkResp>(`/hearings/${id}`, body)
    } catch (e) {
      const err = e as AxiosError<UpdateHearingApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    } finally {
      setIsLoading?.(prev => prev - 1)
    }
  },
)

export type DeleteHearingApiProps = ApiBasePropsWithBody<number>

export type DeleteHearingApiOkResp = ApiOkResp
export type DeleteHearingApiErrResp = ApiErrResp

export const deleteHearingApi = createAsyncThunk<undefined, DeleteHearingApiProps>(
  'hearings/delete',

  async ({ setIsLoading, body: id }, { rejectWithValue }) => {
    setIsLoading?.(prev => prev + 1)

    try {
      await axios.delete<DeleteHearingApiOkResp>(`/hearings/${id}`)
    } catch (e) {
      const err = e as AxiosError<DeleteHearingApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    } finally {
      setIsLoading?.(prev => prev - 1)
    }
  },
)
