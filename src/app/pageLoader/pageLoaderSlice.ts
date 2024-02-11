import { createSlice } from '@reduxjs/toolkit'
import { useAppSelector } from '../store'

export interface PageLoaderState {
  isLoading: number
}

const initialState: PageLoaderState = {
  isLoading: 0,
}

const pageLoaderSlice = createSlice({
  name: 'pageLoader',

  initialState,

  reducers: {
    show: state => {
      state.isLoading++
    },

    hide: state => {
      state.isLoading--
    },
  },
})

export const pageLoaderActions = pageLoaderSlice.actions

export const usePageLoader = () => useAppSelector(state => state.pageLoader)

export default pageLoaderSlice.reducer
