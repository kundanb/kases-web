import { createSlice } from '@reduxjs/toolkit'
import { useAppSelector } from '../store'

export interface BodyScrollbarState {
  isHidden: number
}

const initialState: BodyScrollbarState = {
  isHidden: 0,
}

const bodyScrollbarSlice = createSlice({
  name: 'bodyScrollbar',

  initialState,

  reducers: {
    show: state => {
      state.isHidden = Math.max(0, state.isHidden - 1)
      applyBodyScrollbar(!!state.isHidden)
    },

    hide: state => {
      state.isHidden++
      applyBodyScrollbar(!!state.isHidden)
    },
  },
})

const applyBodyScrollbar = (isHidden: boolean) => {
  if (isHidden) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

export const bodyScrollbarActions = bodyScrollbarSlice.actions

export const useBodyScrollbar = () => useAppSelector(state => state.bodyScrollbar)

export default bodyScrollbarSlice.reducer
