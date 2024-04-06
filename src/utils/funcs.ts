import { AxiosError } from 'axios'
import { ApiErrResp } from './types'
import { ErrMessages } from './consts'

export const to0 = (val: number) => Math.max(0, val - 1)
export const inc = (val: number) => val + 1
export const dec = (val: number) => to0(val)

export const defNul = <T>(val: T) => val ?? null

export const getOutsideClickHandler = (
  targetElemSelector: string,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return (evt: MouseEvent) => {
    if (evt.target instanceof Element && !evt.target.closest(targetElemSelector)) {
      setIsOpen(false)
    }
  }
}

export const makeApiErrResp = (err: unknown | AxiosError<ApiErrResp>) => {
  return (err as AxiosError<ApiErrResp>).response?.data || { message: ErrMessages.Unknown }
}
