import { ApiErrResp } from '@/utils/types'

export default function ApiErrorToast(err: ApiErrResp) {
  return (
    <>
      <p>{err.message}</p>

      {err.errors && (
        <ul className="list-disc">
          {Object.values(err.errors).map((err, i) => (
            <li key={i} className="ml-4">
              {err}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
