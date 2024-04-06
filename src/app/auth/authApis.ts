import { createAsyncThunk } from '@reduxjs/toolkit'
import { dec, inc, makeApiErrResp } from '@/utils/funcs'
import axios from '@/utils/axios'
import { pageLoaderActions } from '../pageLoader/pageLoaderSlice'
import { LoginApi, LogoutApi, RegisterApi } from './authApis.types'

export const registerApi = createAsyncThunk<RegisterApi['Data'], RegisterApi['Props']>(
  'auth/register',

  async ({ setLoading, body }, { rejectWithValue }) => {
    setLoading?.(inc)

    try {
      const { data } = await axios.post<RegisterApi['Resp']>('auth/register', body)
      return data.data
    } catch (err) {
      return rejectWithValue(makeApiErrResp(err))
    } finally {
      setLoading?.(dec)
    }
  },
)

export const loginApi = createAsyncThunk<LoginApi['Data'], LoginApi['Props']>(
  'auth/login',

  async ({ setLoading, body }, { rejectWithValue }) => {
    setLoading?.(inc)

    try {
      const { data } = await axios.post<LoginApi['Resp']>('auth/login', body)
      return data.data
    } catch (err) {
      return rejectWithValue(makeApiErrResp(err))
    } finally {
      setLoading?.(dec)
    }
  },
)

export const logoutApi = createAsyncThunk<LogoutApi['Data'], LogoutApi['Props'] | void>(
  'auth/logout',

  async (props, { dispatch, rejectWithValue }) => {
    props?.setLoading?.(inc)
    dispatch(pageLoaderActions.show())

    try {
      await axios.post<LogoutApi['Resp']>('auth/logout')
    } catch (err) {
      return rejectWithValue(makeApiErrResp(err))
    } finally {
      dispatch(pageLoaderActions.hide())
      props?.setLoading?.(dec)
    }
  },
)
