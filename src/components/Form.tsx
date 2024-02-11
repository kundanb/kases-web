import { useState } from 'react'
import cn from 'classnames'
import { ErrorMessage } from 'formik'

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Field = ({ className, ...props }: FieldProps) => {
  return <div {...props} className={cn('flex flex-col gap-2', className)} />
}

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = ({ className, ...props }: LabelProps) => {
  return <label {...props} className={cn('text-sm text-dark/70 font-medium', className)} />
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'sm' | 'md' | 'lg' | 'xl'
  hasError?: boolean
}

export const Input = ({ inputSize = 'md', hasError, className, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={cn(
        'form-ctrl',
        {
          'form-ctrl-sm': inputSize === 'sm',
          'form-ctrl-md': inputSize === 'md',
          'form-ctrl-lg': inputSize === 'lg',
          'form-ctrl-xl': inputSize === 'xl',
        },
        hasError && 'form-ctrl-error',
        className
      )}
    />
  )
}

export interface PasswordProps extends InputProps {}

export const Password = ({ inputSize = 'md', ...props }: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative flex">
      <Input {...props} type={showPassword ? 'text' : 'password'} className="pr-10" />

      <button
        type="button"
        className={cn(
          'absolute top-[50%] -translate-y-[50%] right-3 p-1',
          'text-dark/50 hover:text-dark focus:text-dark rounded focus:ring',
          {
            'text-xs': inputSize === 'sm',
            'text-sm': inputSize === 'md',
            'text-base': inputSize === 'lg',
            'text-lg': inputSize === 'xl',
          }
        )}
        onClick={() => setShowPassword(prev => !prev)}
        disabled={props.disabled}
      >
        {showPassword ? <i className="fi fi-rr-eye-crossed"></i> : <i className="fi fi-rr-eye"></i>}
      </button>
    </div>
  )
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

export const Textarea = ({ hasError, className, ...props }: TextareaProps) => {
  return <textarea {...props} className={cn('form-ctrl', hasError && '', className)} />
}

export interface ErrMsgProps extends React.ComponentProps<typeof ErrorMessage> {}

export function ErrMsg({ component = 'div', className, ...props }: ErrMsgProps) {
  return <ErrorMessage {...props} component={component} className={cn('text-sm text-red-500', className)} />
}
