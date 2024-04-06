import { createSlice } from '@reduxjs/toolkit'
import { Nullable } from '@/utils/types'
import { to0 } from '@/utils/funcs'
import User from '@/models/User'
import { logoutApi } from '../auth/authApis'
import { fetchMeApi } from './meApis'
import { useAppSelector } from '../store'

export interface MeState {
  loading: number
  user: Nullable<User>
}

const initialState: MeState = {
  loading: 0,
  user: null,
}

const meSlice = createSlice({
  name: 'me',

  initialState,

  reducers: {},

  extraReducers: builder => {
    builder.addCase(fetchMeApi.pending, state => {
      state.loading++
    })

    builder.addCase(fetchMeApi.fulfilled, (state, action) => {
      state.loading = to0(state.loading)

      if (action.payload) {
        state.user = action.payload
      }
    })

    builder.addCase(fetchMeApi.rejected, state => {
      state.loading = to0(state.loading)
    })

    builder.addCase(logoutApi.fulfilled, state => {
      state.user = null
    })

    builder.addCase(logoutApi.rejected, state => {
      state.user = null
    })
  },
})

export const meActions = meSlice.actions

export const useMe = () => useAppSelector(state => state.me)

export default meSlice.reducer
