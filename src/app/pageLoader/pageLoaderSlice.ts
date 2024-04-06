import { createSlice } from '@reduxjs/toolkit'
import { to0 } from '@/utils/funcs'
import { useAppSelector } from '../store'

export interface PageLoaderState {
  active: number
}

const initialState: PageLoaderState = {
  active: 0,
}

const pageLoaderSlice = createSlice({
  name: 'pageLoader',

  initialState,

  reducers: {
    show: state => {
      state.active++
    },

    hide: state => {
      state.active = to0(state.active)
    },
  },
})

export const pageLoaderActions = pageLoaderSlice.actions

export const usePageLoader = () => useAppSelector(state => state.pageLoader)

export default pageLoaderSlice.reducer
