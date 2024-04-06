export type Nullable<T> = T | null

export interface ApiProps {
  setLoading?: React.Dispatch<React.SetStateAction<number>>
}

export interface ApiPropsWithBody<TBody> extends ApiProps {
  body: TBody
}

export interface ApiOkResp<TData = null> {
  message: Nullable<string>
  data: TData
}

export interface ApiErrResp<IfErr = Record<string, string>> {
  message: Nullable<string>
  errors: Nullable<Record<keyof IfErr, string>>
}
