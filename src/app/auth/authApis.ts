import { createAsyncThunk } from '@reduxjs/toolkit'
import { HttpStatusCode } from 'axios'
import type { ApiBaseProps, AxiosError, ApiErrResp, ApiOkResp, ApiBasePropsWithBody } from '@/utils/types'
import { UserRole } from '@/utils/enums'
import { ErrorMessages, StorageKeys } from '@/utils/consts'
import axios from '@/utils/axios'
import User, { RespUser } from '@/models/User'
import { pageLoaderActions } from '../pageLoader/pageLoaderSlice'
import { authActions } from './authSlice'

export type RegisterApiProps = ApiBasePropsWithBody<{
  role: UserRole
  username: string
  email: string
  password: string
}>

export interface RegisterApiRespData {
  loginToken: string
}

export type RegisterApiOkResp = ApiOkResp<RegisterApiRespData>
export type RegisterApiErrResp = ApiErrResp<RegisterApiProps['body']>

export const registerApi = createAsyncThunk<undefined, RegisterApiProps>(
  'auth/register',

  async ({ setIsLoading, body }, { rejectWithValue }) => {
    setIsLoading?.(prev => prev + 1)

    try {
      const { data } = await axios.post<RegisterApiOkResp>('/auth/register', body)
      localStorage.setItem(StorageKeys.LoginToken, data.data!.loginToken!)
    } catch (e) {
      const err = e as AxiosError<RegisterApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    } finally {
      setIsLoading?.(prev => prev - 1)
    }
  },
)

export type LoginApiProps = ApiBasePropsWithBody<{
  unique: string
  password: string
}>

export interface LoginApiRespData {
  loginToken: string
}

export type LoginApiOkResp = ApiOkResp<LoginApiRespData>
export type LoginApiErrResp = ApiErrResp<LoginApiProps['body']>

export const loginApi = createAsyncThunk<undefined, LoginApiProps>(
  'auth/login',

  async ({ setIsLoading, body }, { rejectWithValue }) => {
    setIsLoading?.(prev => prev + 1)

    try {
      const { data } = await axios.post<LoginApiOkResp>('/auth/login', body)
      localStorage.setItem(StorageKeys.LoginToken, data.data!.loginToken!)
    } catch (e) {
      const err = e as AxiosError<LoginApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    } finally {
      setIsLoading?.(prev => prev - 1)
    }
  },
)

export type FetchMeApiProps = ApiBaseProps

export type FetchMeApiOkResp = ApiOkResp<RespUser>
export type FetchMeApiErrResp = ApiErrResp

export const fetchMeApi = createAsyncThunk<undefined | User, undefined | FetchMeApiProps>(
  'auth/fetchMe',

  async (props, { dispatch, rejectWithValue }) => {
    if (!localStorage.getItem(StorageKeys.LoginToken)) {
      dispatch(authActions.init())
      return
    }

    dispatch(pageLoaderActions.show())
    props?.setIsLoading?.(prev => prev + 1)

    try {
      const { data } = await axios.get<FetchMeApiOkResp>('/auth/me')
      return { ...User.fromResp(data.data!) }
    } catch (e) {
      const err = e as AxiosError<FetchMeApiErrResp>

      if (err.response?.status === HttpStatusCode.Unauthorized) {
        dispatch(authActions.logout())
      }

      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    } finally {
      dispatch(authActions.init())
      props?.setIsLoading?.(prev => prev - 1)
      dispatch(pageLoaderActions.hide())
    }
  },
)
