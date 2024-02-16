import { configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import bodyScrollbarReducer from './bodyScrollbar/bodyScrollbarSlice'
import pageLoaderReducer from './pageLoader/pageLoaderSlice'
import authReducer from './auth/authSlice'

const store = configureStore({
  reducer: {
    bodyScrollbar: bodyScrollbarReducer,
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
