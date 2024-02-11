import { createAsyncThunk } from '@reduxjs/toolkit'
import { HttpStatusCode } from 'axios'
import { AxiosError, ApiErrResp, ApiOkResp } from '@/utils/types'
import { ErrorMessages, StorageKeys } from '@/utils/consts'
import axios from '@/utils/axios'
import User, { RespUser } from '@/models/User'
import { pageLoaderActions } from '../pageLoader/pageLoaderSlice'
import { authActions } from './authSlice'

export interface RegisterApiBody {
  username: string
  email: string
  password: string
}

export interface RegisterApiRespData {
  loginToken: string
}

export type RegisterApiOkResp = ApiOkResp<RegisterApiRespData>
export type RegisterApiErrResp = ApiErrResp<RegisterApiBody>

export const registerApi = createAsyncThunk<void, RegisterApiBody>(
  'auth/register',

  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<RegisterApiOkResp>('/auth/register', values)
      localStorage.setItem(StorageKeys.LoginToken, data.data!.loginToken!)
    } catch (e) {
      const err = e as AxiosError<RegisterApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    }
  }
)

export interface LoginApiBody {
  unique: string
  password: string
}

export interface LoginApiRespData {
  loginToken: string
}

export type LoginApiOkResp = ApiOkResp<LoginApiRespData>
export type LoginApiErrResp = ApiErrResp<Body>

export const loginApi = createAsyncThunk<void, LoginApiBody>(
  'auth/login',

  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<LoginApiOkResp>('/auth/login', values)
      localStorage.setItem(StorageKeys.LoginToken, data.data!.loginToken!)
    } catch (e) {
      const err = e as AxiosError<LoginApiErrResp>
      return rejectWithValue(err.response?.data || { message: ErrorMessages.Unknown })
    }
  }
)

export type FetchMeApiOkResp = ApiOkResp<RespUser>
export type FetchMeApiErrResp = ApiErrResp<null>

export const fetchMeApi = createAsyncThunk<User | null, void>(
  'auth/fetchMe',

  async (_, { dispatch, rejectWithValue }) => {
    if (!localStorage.getItem(StorageKeys.LoginToken)) {
      dispatch(authActions.init())
      return null
    }

    dispatch(pageLoaderActions.show())

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
      dispatch(pageLoaderActions.hide())
    }
  }
)
