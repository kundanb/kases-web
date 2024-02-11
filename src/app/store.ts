import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import pageLoaderReducer from './pageLoader/pageLoaderSlice'
import authReducer from './auth/authSlice'

const store = configureStore({
  reducer: {
    pageLoader: pageLoaderReducer,
    auth: authReducer,
  },
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export interface AsyncThunkConfig {
  dispatch: AppDispatch
  state: RootState
}
