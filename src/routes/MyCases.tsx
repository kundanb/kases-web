import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import type { ApiErrResp } from '@/utils/types'
import { CaseStatus } from '@/utils/enums'
import { Routes } from '@/utils/consts'
import Case from '@/models/Case'
import { useAppDispatch } from '@/app/store'
import { myCasesApi } from '@/app/cases/casesApi'
import Link from '@/components/Link'
import ApiErrorToast from '@/components/Toasts'
import Table, { TableColumn } from '@/components/Table'

export default function MyCases() {
  const dispatch = useAppDispatch()

  const [page] = useState(1)
  const [perPage] = useState(10)

  const requestId = useRef('')

  const [isTableLoading, setIsTableLoading] = useState(0)

  const [cases, setCases] = useState<Case[]>([])

  useEffect(() => {
    const dispatched = dispatch(myCasesApi({ setIsLoading: setIsTableLoading, body: { page, perPage } }))
    requestId.current = dispatched.requestId

    dispatched
      .unwrap()
      .then(cases => dispatched.requestId === requestId.current && setCases(cases))
      .catch(e => toast.error(ApiErrorToast(e as ApiErrResp)))

    return () => {
      dispatched.abort()
    }
  }, [dispatch, page, perPage])

  const columns: TableColumn<Case>[] = [
    {
      title: 'Case Number',
      key: 'caseNumber',
      render: (caseNumber, record) => (
        <Link
          to={Routes.MyCase(record.id)}
          className="text-nowrap text-prim hover:underline focus:underline rounded focus:ring"
        >
          {caseNumber as string}
        </Link>
      ),
    },
    {
      title: 'Title',
      key: 'title',
    },
    {
      title: 'Status',
      key: 'status',
      render: status => <span className="tag tag-xs tag-info">{CaseStatus[status as CaseStatus]}</span>,
    },
    {
      title: 'Last Updated',
      key: 'updatedAt',
      render: date => <span className="text-nowrap">{moment(date as string).format('ll')}</span>,
    },
    {
      title: 'Actions',
      key: 'id',
      render: id => (
        <div className="flex gap-4">
          <Link to={Routes.MyCase(id as number)} className="btn btn-sm btn-txt btn-txt-info">
            <i className="fi fi-rr-eye"></i> View
          </Link>

          <Link to={Routes.EditCase(id as number)} className="btn btn-sm btn-txt btn-txt-warning">
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
          <h1 className="text-4xl text-dark-acc font-disp font-bold">My Cases</h1>

          <Link to={Routes.CreateCase} className="btn btn-dark">
            <i className="fi fi-rr-plus"></i> Create a Case
          </Link>
        </div>

        <div className="mt-8">
          {isTableLoading ? (
            <div className="py-8 flex justify-center items-center gap-3">
              <span className="spinner"></span> Retrieving your cases...
            </div>
          ) : cases.length ? (
            <>
              <div className="flex justify-between items-center">
                <div className=""></div>
              </div>

              <div className="mt-8">
                <Table columns={columns} data={cases} />
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-lg text-dark/70">You don't have any cases at the moment.</p>

              <p className="mt-8 text-sm text-dark/70">
                <Link to={Routes.CreateCase} className="btn btn-sm btn-outline btn-outline-prim">
                  Create a case now
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
