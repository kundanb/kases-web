import { createAsyncThunk } from '@reduxjs/toolkit'
import { StorageKeys } from '@/utils/consts'
import { dec, inc, makeApiErrResp } from '@/utils/funcs'
import axios from '@/utils/axios'
import User from '@/models/User'
import Case from '@/models/Case'
import Hearing from '@/models/Hearing'
import { pageLoaderActions } from '../pageLoader/pageLoaderSlice'
import { DashboardApi, FetchMeApi } from './meApis.types'

export const fetchMeApi = createAsyncThunk<FetchMeApi['Data'], FetchMeApi['Props']>(
  'auth/fetchMe',

  async (props, { dispatch, rejectWithValue }) => {
    if (!localStorage.getItem(StorageKeys.authToken)) {
      return
    }

    props?.setLoading?.(inc)
    dispatch(pageLoaderActions.show())

    try {
      const { data } = await axios.get<FetchMeApi['Resp']>('me')
      return { ...new User(data.data) }
    } catch (err) {
      return rejectWithValue(makeApiErrResp(err))
    } finally {
      dispatch(pageLoaderActions.hide())
      props?.setLoading?.(dec)
    }
  },
)

export const fetchDashboardApi = createAsyncThunk<DashboardApi['Data'], DashboardApi['Props']>(
  'me/dashboard',

  async (props, { rejectWithValue }) => {
    props?.setLoading?.(inc)

    try {
      const { data } = await axios.get<DashboardApi['Resp']>('me/dashboard')

      return {
        ...data.data,
        casesOpen: data.data.casesOpen.map(c => ({ ...new Case(c) })),
        hearingsToday: data.data.hearingsToday.map(h => ({ ...new Hearing(h) })),
        hearingsUpcoming: data.data.hearingsUpcoming.map(h => ({ ...new Hearing(h) })),
      }
    } catch (err) {
      return rejectWithValue(makeApiErrResp(err))
    } finally {
      props?.setLoading?.(dec)
    }
  },
)
