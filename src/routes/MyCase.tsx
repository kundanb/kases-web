import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import type { ApiErrResp } from '@/utils/types'
import Case from '@/models/Case'
import { useAppDispatch } from '@/app/store'
import { myCaseApi } from '@/app/cases/casesApi'
import ApiErrorToast from '@/components/Toasts'
import moment from 'moment'

interface RouteParams {
  id: string
}

export default function MyCase() {
  const dispatch = useAppDispatch()

  const params = useParams<RouteParams>()

  const [isCaseLoading, setIsCaseLoading] = useState(0)

  const [myCase, setMyCase] = useState<Case | null>(null)

  useEffect(() => {
    dispatch(myCaseApi({ setIsLoading: setIsCaseLoading, body: +params.id }))
      .unwrap()
      .then(setMyCase)
      .catch(e => toast.error(ApiErrorToast(e as ApiErrResp)))
  }, [params])

  return (
    <div className="py-8">
      <div className="container">
        <div className="max-w-md mx-auto">
          <h1 className="font-disp font-bold text-4xl text-dark-acc">Case details</h1>

          {isCaseLoading ? (
            <div className="my-8 text-center">Loading...</div>
          ) : myCase ? (
            <div className="mt-8 card text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-dark/70">Case number</p>
                  <p className="text-lg font-bold">{myCase.caseNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-dark/70">Title</p>
                  <p className="text-lg font-bold">{myCase.title}</p>
                </div>
                <div>
                  <p className="text-sm text-dark/70">Description</p>
                  <p className="text-lg font-bold">{myCase.description}</p>
                </div>
                <div>
                  <p className="text-sm text-dark/70">Status</p>
                  <p className="text-lg font-bold">{myCase.status}</p>
                </div>
                <div>
                  <p className="text-sm text-dark/70">Created at</p>
                  <p className="text-lg font-bold">{moment(myCase.createdAt).format('ll')}</p>
                </div>
                <div>
                  <p className="text-sm text-dark/70">Updated at</p>
                  <p className="text-lg font-bold">{moment(myCase.updatedAt).format('ll')}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-8 text-center">No case found</div>
          )}
        </div>
      </div>
    </div>
  )
}
