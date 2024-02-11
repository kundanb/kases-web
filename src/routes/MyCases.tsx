import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import { ApiErrResp } from '@/utils/types'
import { CaseStatus } from '@/utils/enums'
import { Routes } from '@/utils/consts'
import Case from '@/models/Case'
import { useAppDispatch } from '@/app/store'
import { deleteCaseApi, myCasesApi } from '@/app/cases/casesApi'
import Link from '@/components/Link'
import ApiErrorToast from '@/components/Toasts'
import Table, { TableColumn } from '@/components/Table'

export default function MyCases() {
  const dispatch = useAppDispatch()

  const [isTableLoading, setIsTableLoading] = useState(false)
  const [isRowLoading, setIsRowLoading] = useState<Record<number, boolean>>({})
  const [cases, setCases] = useState<Case[]>([])

  useEffect(() => {
    setIsTableLoading(true)

    dispatch(myCasesApi())
      .unwrap()
      .then(setCases)
      .catch(e => toast.error(ApiErrorToast(e as ApiErrResp)))
      .finally(() => setIsTableLoading(false))
  }, [])

  const columns: TableColumn<Case>[] = [
    {
      title: 'Case Number',
      key: 'caseNumber',
      render: (caseNumber, record) => (
        <Link
          to={Routes.MyCase(record.id)}
          className="text-nowrap text-prim hover:underline focus:underline"
          disabled={isRowLoading[record.id]}
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
      render: status => CaseStatus[status as CaseStatus],
    },
    {
      title: 'Date Created',
      key: 'createdAt',
      render: date => <span className="text-nowrap">{moment(date as string).format('ll')}</span>,
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
        <div className="flex gap-3">
          <Link to={Routes.MyCase(id as number)} className="btn btn-sm btn-outline btn-outline-info">
            <i className="fi fi-rr-eye"></i>
          </Link>

          <Link to={Routes.EditCase(id as number)} className="btn btn-sm btn-outline btn-outline-warning">
            <i className="fi fi-rr-edit"></i>
          </Link>

          <button
            className="btn btn-sm btn-outline btn-outline-danger"
            onClick={async () => {
              setIsRowLoading(prev => ({ ...prev, [id as number]: true }))

              try {
                await dispatch(deleteCaseApi(id as number)).unwrap()
                setCases(cases.filter(c => c.id !== id))
              } catch (e) {
                toast.error(ApiErrorToast(e as ApiErrResp))
              } finally {
                setIsRowLoading(prev => ({ ...prev, [id as number]: false }))
              }
            }}
            disabled={isRowLoading[id as number]}
          >
            {isRowLoading[id as number] ? (
              <span className="spinner spinner-danger"></span>
            ) : (
              <>
                <i className="fi fi-rr-trash"></i>
              </>
            )}
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="py-12">
      <div className="container">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl text-dark-acc font-disp font-bold">My Cases</h1>

          <Link to={Routes.CreateCase} className="btn btn-dark">
            <i className="fi fi-rr-plus"></i> Create a Case
          </Link>
        </div>

        <div className="mt-16">
          {isTableLoading ? (
            <div className="flex justify-center items-center gap-3">
              <span className="spinner"></span> Loading cases...
            </div>
          ) : cases.length ? (
            <Table columns={columns} data={cases} />
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
