import { createSlice } from '@reduxjs/toolkit'
import { StorageKeys } from '@/utils/consts'
import User from '@/models/User'
import { useAppSelector } from '../store'
import { fetchMeApi } from './authApis'

export interface AuthState {
  isInitialized: boolean
  isLoading: number
  isLoggedIn: boolean
  user?: User | null
}

const initialState: AuthState = {
  isInitialized: false,
  isLoading: 0,
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    init: state => {
      state.isInitialized = true
    },

    logout: state => {
      localStorage.removeItem(StorageKeys.LoginToken)
      state.isLoggedIn = false
      state.user = null
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchMeApi.pending, state => {
      state.isLoading++
    })

    builder.addCase(fetchMeApi.fulfilled, (state, action) => {
      state.isLoading--

      if (action.payload) {
        state.isLoggedIn = true
        state.user = action.payload
      }
    })

    builder.addCase(fetchMeApi.rejected, state => {
      state.isLoading--
    })
  },
})

export const authActions = authSlice.actions

export const useAuth = () => useAppSelector(state => state.auth)

export default authSlice.reducer
