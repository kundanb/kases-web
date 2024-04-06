import { createSlice } from '@reduxjs/toolkit'
import { StorageKeys } from '@/utils/consts'
import { to0 } from '@/utils/funcs'
import { loginApi, logoutApi, registerApi } from './authApis'
import { fetchMeApi } from '../me/meApis'
import { useAppSelector } from '../store'

export interface AuthState {
  initialized: boolean
  loading: number
  loggedIn: boolean
}

const initialState: AuthState = {
  initialized: false,
  loading: 0,
  loggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {},

  extraReducers: builder => {
    builder.addCase(registerApi.fulfilled, (_, action) => {
      localStorage.setItem(StorageKeys.authToken, action.payload.authToken)
    })

    builder.addCase(loginApi.fulfilled, (_, action) => {
      localStorage.setItem(StorageKeys.authToken, action.payload.authToken)
    })

    builder.addCase(logoutApi.pending, state => {
      state.loading++
    })

    builder.addCase(logoutApi.fulfilled, state => {
      localStorage.removeItem(StorageKeys.authToken)
      state.loggedIn = false
      state.loading = to0(state.loading)
    })

    builder.addCase(logoutApi.rejected, state => {
      localStorage.removeItem(StorageKeys.authToken)
      state.loggedIn = false
      state.loading = to0(state.loading)
    })

    builder.addCase(fetchMeApi.pending, state => {
      state.loading++
    })

    builder.addCase(fetchMeApi.fulfilled, (state, action) => {
      if (action.payload) {
        state.loggedIn = true
      }

      state.initialized = true
      state.loading = to0(state.loading)
    })

    builder.addCase(fetchMeApi.rejected, state => {
      state.initialized = true
      state.loading = to0(state.loading)
    })
  },
})

export const authActions = authSlice.actions

export const useAuth = () => useAppSelector(state => state.auth)

export default authSlice.reducer
