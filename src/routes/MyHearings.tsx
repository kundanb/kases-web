import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import type { ApiErrResp } from '@/utils/types'
import { Routes } from '@/utils/consts'
import Hearing from '@/models/Hearing'
import { useAppDispatch } from '@/app/store'
import { myHearingsApi } from '@/app/hearings/hearingsApi'
import Link from '@/components/Link'
import ApiErrorToast from '@/components/Toasts'
import Table, { TableColumn } from '@/components/Table'

export default function MyHearings() {
  const dispatch = useAppDispatch()

  const [page] = useState(1)
  const [perPage] = useState(10)

  const requestId = useRef('')

  const [isTableLoading, setIsTableLoading] = useState(0)

  const [hearings, setHearings] = useState<Hearing[]>([])

  useEffect(() => {
    const dispatched = dispatch(myHearingsApi({ setIsLoading: setIsTableLoading, body: { page, perPage } }))
    requestId.current = dispatched.requestId

    dispatched
      .unwrap()
      .then(hearings => dispatched.requestId === requestId.current && setHearings(hearings))
      .catch(e => toast.error(ApiErrorToast(e as ApiErrResp)))

    return () => {
      dispatched.abort()
    }
  }, [dispatch, page, perPage])

  const columns: TableColumn<Hearing>[] = [
    {
      title: 'Case Title',
      key: 'case$.title',
    },
    {
      title: 'Hearing Date',
      key: 'date',
      render: date => <span className="text-nowrap">{moment(date as string).format('ll')}</span>,
    },
    {
      title: 'Actions',
      key: 'id',
      render: id => (
        <div className="flex gap-4">
          <Link to={Routes.MyHearing(id as number)} className="btn btn-sm btn-txt btn-txt-info">
            <i className="fi fi-rr-eye"></i> View
          </Link>

          <Link to={Routes.EditHearing(id as number)} className="btn btn-sm btn-txt btn-txt-warning">
            <i className="fi fi-rr-edit"></i> Edit
          </Link>
        </div>
      ),
    },
  ]

  return (
    <div className="py-8">
      <div className="container">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl text-dark-acc font-disp font-bold">My Hearings</h1>

          <Link to={Routes.CreateHearing} className="btn btn-dark">
            <i className="fi fi-rr-plus"></i> Create a Hearing
          </Link>
        </div>

        <div className="mt-8">
          {isTableLoading ? (
            <div className="py-8 flex justify-center items-center gap-3">
              <span className="spinner"></span> Retrieving your hearings...
            </div>
          ) : hearings.length ? (
            <>
              <div className="flex justify-between items-center">
                <div className=""></div>
              </div>

              <div className="mt-8">
                <Table columns={columns} data={hearings} />
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-lg text-dark/70">You don't have any hearings at the moment.</p>

              <p className="mt-8 text-sm text-dark/70">
                <Link to={Routes.CreateHearing} className="btn btn-sm btn-outline btn-outline-prim">
                  Create a hearing now
                </Link>{' '}
                <span className="ml-2">to get started.</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
