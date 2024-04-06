import { createSlice } from '@reduxjs/toolkit'
import { to0 } from '@/utils/funcs'
import { useAppSelector } from '../store'

export interface BodyScrollbarState {
  disabled: number
}

const initialState: BodyScrollbarState = {
  disabled: 0,
}

export const bodyScrollbarSlice = createSlice({
  name: 'bodyScrollbar',

  initialState,

  reducers: {
    show: state => {
      state.disabled = to0(state.disabled)
      onChange(state.disabled)
    },

    hide: state => {
      state.disabled++
      onChange(state.disabled)
    },
  },
})

const onChange = (disabled: number) => {
  document.body.style.overflow = disabled ? 'hidden' : ''
}

export const bodyScrollbarActions = bodyScrollbarSlice.actions

export const useBodyScrollbar = () => useAppSelector(state => state.bodyScrollbar)

export default bodyScrollbarSlice.reducer
