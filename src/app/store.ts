import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import bodyScrollbarReducer from './bodyScrollbar/bodyScrollbarSlice'
import pageLoaderReducer from './pageLoader/pageLoaderSlice'
import authReducer from './auth/authSlice'
import meReducer from './me/meSlice'

const store = configureStore({
  reducer: {
    bodyScrollbar: bodyScrollbarReducer,
    pageLoader: pageLoaderReducer,
    auth: authReducer,
    me: meReducer,
  },
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
