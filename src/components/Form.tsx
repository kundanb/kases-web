import { useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import { ErrorMessage, type FormikContextType } from 'formik'
import ReactSelect, { SingleValue as ReactSelectSingleValue } from 'react-select'
import AsyncReactSelect from 'react-select/async'
import Quill from 'quill'
import FormikErrorFocus from 'formik-error-focus'

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
        className,
      )}
    />
  )
}

export interface PasswordProps extends Omit<InputProps, 'type'> {}

export const Password = (props: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative flex">
      <Input {...props} type={showPassword ? 'text' : 'password'} className="pr-10" />

      <button
        type="button"
        className="absolute top-2/4 -translate-y-2/4 right-3 btn btn-sm btn-txt btn-txt-dark text-dark/50"
        onClick={() => setShowPassword(prev => !prev)}
        disabled={props.disabled}
      >
        {showPassword ? <i className="fi fi-rr-eye-crossed"></i> : <i className="fi fi-rr-eye"></i>}
      </button>
    </div>
  )
}

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'sm' | 'md' | 'lg' | 'xl'
  label?: React.ReactNode
}

export const Radio = ({ label, inputSize, className, ...props }: RadioProps) => {
  const [id] = useMemo(() => Math.random().toString(36).slice(2) + Date.now(), [])
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="flex flex-1">
      <input
        {...props}
        type="radio"
        id={id}
        className="size-0 fixed -top-10"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <label
        htmlFor={id}
        className={cn(
          'flex-1 px-[1em] py-[0.5em] cursor-pointer rounded border flex items-center gap-3 hover:bg-light-acc',
          {
            'text-sm': inputSize === 'sm',
            'text-base': inputSize === 'md',
            'text-lg': inputSize === 'lg',
            'text-xl': inputSize === 'xl',
            'bg-light-acc ring': isFocused,
            'bg-light-acc border-prim': props.checked,
          },
          className,
        )}
      >
        <span
          className={cn('relative size-[0.8em] rounded-full border border-dark/50', {
            'border-[0.2em] !border-prim': props.checked,
          })}
        ></span>
        {label}
      </label>
    </div>
  )
}

export type RadioValue = string | number | readonly string[] | undefined

export interface RadioGroupProps {
  className?: string
  options: { label: React.ReactNode; value: RadioValue }[]
  name: string
  value?: RadioValue
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  hasError?: boolean
}

export const RadioGroup = ({ className, options, name, value, onChange, disabled, hasError }: RadioGroupProps) => {
  return (
    <div className={cn('flex gap-3 rounded ring-offset-[6px] ring-danger', { ring: hasError }, className)}>
      {options.map((opt, idx) => (
        <Radio
          key={idx}
          name={name}
          label={opt.label}
          value={opt.value}
          checked={opt.value === value}
          onChange={onChange}
          disabled={disabled}
        />
      ))}
    </div>
  )
}

export type SelectOption<V = string> = { label: string; value: V }
export type SelectValue<V = string> = ReactSelectSingleValue<SelectOption<V>> | null

export interface SelectProps<V = string> {
  options: SelectOption<V>[]
  value: SelectValue<V>
  onChange: (value: SelectValue<V>) => void
}

export function Select<V = string>({ options, value, onChange }: SelectProps<V>) {
  return <ReactSelect options={options} value={value} onChange={onChange} />
}

export interface AsyncSelectProps<V = string> {
  id?: string
  name?: string
  placeholder?: string
  loadOptions: (input: string) => Promise<SelectOption<V>[]>
  value: SelectValue<V>
  onChange: (value: SelectValue<V>) => void
  autoFocus?: boolean
  hasError?: boolean
  disabled?: boolean
}

export function AsyncSelect<V = string>({
  id,
  name,
  placeholder,
  loadOptions,
  value,
  onChange,
  hasError,
  disabled,
  autoFocus,
}: AsyncSelectProps<V>) {
  return (
    <AsyncReactSelect
      id={id}
      name={name}
      placeholder={placeholder}
      cacheOptions
      loadOptions={loadOptions}
      value={value}
      onChange={onChange}
      isDisabled={disabled}
      autoFocus={autoFocus}
      classNames={{
        control: state =>
          cn(
            'h-12 !rounded',
            state.isFocused ? '!border-dark/50 !ring' : '!border-borderColor',
            hasError && '!border-danger !ring-danger',
          ),
        dropdownIndicator: () => '!h-[2.5em] flex items-center',
      }}
    />
  )
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

export const Textarea = ({ hasError, className, ...props }: TextareaProps) => {
  return <textarea {...props} className={cn('form-ctrl', hasError && 'form-ctrl-error', className)} />
}

export interface EditorProps {
  className?: string
  placeholder?: string
  initialData?: string
  setData: (data: string) => void
  setTouched?: (touched: boolean) => void
  disabled?: boolean
  hasError?: boolean
}

export function Editor({ className, placeholder, initialData, setData, setTouched, disabled, hasError }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<Quill>()

  const placeholderRef = useRef<string>(placeholder || '')
  const initialDataRef = useRef<string>(initialData || '')

  const [editorData, setEditorData] = useState(initialDataRef.current)

  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: placeholderRef.current,
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'link'],
            [{ list: 'ordered' }, { list: 'bullet' }],
          ],
        },
      })

      quillRef.current.root.innerHTML = initialDataRef.current
      quillRef.current.root.addEventListener('focus', () => setIsFocused(true))
      quillRef.current.root.addEventListener('blur', () => setIsFocused(false))

      quillRef.current.on('text-change', () => {
        setEditorData(quillRef.current!.root.innerHTML)
      })
    }
  }, [])

  useEffect(() => {
    setData(editorData)
    setTouched?.(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorData])

  useEffect(() => {
    quillRef.current?.enable(!disabled)
  }, [disabled])

  return (
    <div className={cn('rounded', isFocused && 'ring', hasError && 'ring-danger', className)}>
      <div ref={editorRef} />
    </div>
  )
}

export interface ErrMsgProps extends React.ComponentProps<typeof ErrorMessage> {}

export function ErrMsg({ component = 'div', className, ...props }: ErrMsgProps) {
  return <ErrorMessage {...props} component={component} className={cn('text-sm text-danger', className)} />
}

export function ErrorFocus() {
  return (
    <FormikErrorFocus
      offset={0}
      align="middle"
      focusDelay={0}
      duration={150}
      formik={{} as FormikContextType<object>}
    />
  )
}
