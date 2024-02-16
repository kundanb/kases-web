import { useEffect } from 'react'
import cn from 'classnames'
import { useAppDispatch } from '@/app/store'
import { bodyScrollbarActions } from '@/app/bodyScrollbar/bodyScrollbarSlice'

export interface PopupProps {
  isOpen: boolean
  close: () => void

  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'prim' | 'dark' | 'light' | 'info' | 'success' | 'warning' | 'danger'
  title?: string
  children?: React.ReactNode

  okContent?: React.ReactNode
  onOk?: () => void
}

export default function Popup({
  isOpen,
  close,
  size = 'sm',
  variant = 'default',
  title,
  children,
  okContent,
  onOk,
}: PopupProps) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isOpen) {
      dispatch(bodyScrollbarActions.hide())
    } else {
      dispatch(bodyScrollbarActions.show())
    }

    return () => {
      dispatch(bodyScrollbarActions.show())
    }
  }, [dispatch, isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 z-popup w-screen h-screen bg-light/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full h-full" onClick={() => close()}></div>

      <div
        className={cn(
          'absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-lg bg-light border shadow-lg',
          {
            'w-96': size === 'sm',
            'w-128': size === 'md',
            'w-160': size === 'lg',
            'w-192': size === 'xl',
          },
          {
            'border-prim': variant === 'prim',
            'border-dark': variant === 'dark',
            'border-light': variant === 'light',
            'border-info': variant === 'info',
            'border-success': variant === 'success',
            'border-warning': variant === 'warning',
            'border-danger': variant === 'danger',
          },
        )}
      >
        <div className="pl-8 pr-4 py-4 flex justify-between items-center">
          <h2
            className={cn('text-2xl font-disp font-bold', {
              'text-prim': variant === 'prim',
              'text-dark': variant === 'dark',
              'text-light': variant === 'light',
              'text-info': variant === 'info',
              'text-success': variant === 'success',
              'text-warning': variant === 'warning',
              'text-danger': variant === 'danger',
            })}
          >
            {title}
          </h2>

          <button className="btn btn-sm btn-light" onClick={() => close()}>
            <i className="fi fi-rr-cross"></i>
          </button>
        </div>

        <div className="px-8 py-4">{children}</div>

        <div className="p-4 flex justify-end gap-4">
          <button
            className={cn('btn', {
              'btn-prim': variant === 'default' || variant === 'prim',
              'btn-dark': variant === 'dark',
              'btn-light': variant === 'light',
              'btn-info': variant === 'info',
              'btn-success': variant === 'success',
              'btn-warning': variant === 'warning',
              'btn-danger': variant === 'danger',
            })}
            onClick={() => {
              onOk && onOk()
              close()
            }}
          >
            {okContent || 'Okay'}
          </button>
        </div>
      </div>
    </div>
  )
}
