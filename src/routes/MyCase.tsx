import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import cn from 'classnames'
import { toast } from 'react-toastify'
import moment from 'moment'
import type { ApiErrResp } from '@/utils/types'
import { CaseStatus } from '@/utils/enums'
import { Routes } from '@/utils/consts'
import Case from '@/models/Case'
import { useAppDispatch } from '@/app/store'
import { deleteCaseApi, myCaseApi } from '@/app/cases/casesApi'
import ApiErrorToast from '@/components/Toasts'
import Link from '@/components/Link'
import Popup from '@/components/Popup'

interface RouteParams {
  id: string
}

export default function MyCase() {
  const dispatch = useAppDispatch()

  const history = useHistory()

  const params = useParams<RouteParams>()

  const [isCaseLoading, setIsCaseLoading] = useState(0)

  const [myCase, setMyCase] = useState<Case | null>(null)

  const [isDescOpen, setIsDescOpen] = useState(false)

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(0)

  useEffect(() => {
    dispatch(myCaseApi({ setIsLoading: setIsCaseLoading, body: +params.id }))
      .unwrap()
      .then(setMyCase)
      .catch(e => toast.error(ApiErrorToast(e as ApiErrResp)))
  }, [dispatch, params])

  return (
    <div className="pt-8 pb-12">
      <div className="container">
        <div>
          <Link to={Routes.MyCases} className="btn btn-sm btn-light text-dark/50 hover:text-dark focus:text-dark">
            <i className="fi fi-rs-angle-left text-xs"></i> Back to My Cases
          </Link>
        </div>

        <div className="mt-4">
          {isCaseLoading ? (
            <div className="py-8 flex justify-center items-center gap-3">
              <span className="spinner"></span> Retrieving case details...
            </div>
          ) : (
            myCase && (
              <div>
                <h1 className="mt-8 text-2xl text-dark-acc font-disp font-bold underline">{myCase.title}</h1>

                <div className="mt-8 flex items-center gap-8">
                  <div>
                    <h2 className="text-sm text-dark/70">Case Number</h2>
                    <p className="font-medium">{myCase.caseNumber}</p>
                  </div>
                  <div>
                    <h2 className="text-sm text-dark/70">Status</h2>
                    <p className="tag tag-xs tag-info">{CaseStatus[myCase.status]}</p>
                  </div>
                  <div>
                    <h2 className="text-sm text-dark/70">Date Added</h2>
                    <p className="font-medium">{moment(myCase.createdAt).format('ll')}</p>
                  </div>
                  <div className="ml-auto">
                    <Link to={Routes.EditCase(myCase.id)} className="btn btn-sm btn-outline btn-outline-warning">
                      <i className="fi fi-rr-edit"></i> Edit
                    </Link>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline btn-outline-danger"
                      onClick={() => setIsDeletePopupOpen(true)}
                      disabled={!!isDeleting}
                    >
                      <i className="fi fi-rr-trash"></i> Delete
                    </button>
                    <Popup
                      variant="danger"
                      isOpen={isDeletePopupOpen}
                      close={() => setIsDeletePopupOpen(false)}
                      title="Delete Case"
                      okContent={<>{!isDeleting && <i className="fi fi-rr-trash"></i>} Delete</>}
                      onOk={async () => {
                        try {
                          await dispatch(deleteCaseApi({ setIsLoading: setIsDeleting, body: myCase.id })).unwrap()
                          toast.success('Case deleted successfully')
                          history.push(Routes.MyCases)
                        } catch (e) {
                          toast.error(ApiErrorToast(e as ApiErrResp))
                        } finally {
                          setIsDeletePopupOpen(false)
                        }
                      }}
                      closeOnOk={false}
                      isLoading={!!isDeleting}
                      disabled={!!isDeleting}
                    >
                      <p>Are you sure you want to delete this case?</p>
                    </Popup>
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-sm text-dark/70">Court</h2>
                  <p className="font-medium">{myCase.court}</p>
                </div>

                {myCase.description && (
                  <div className="mt-8">
                    <h3 className="text-sm text-dark/70">Description</h3>
                    <div className={cn('relative mt-2 rounded border')}>
                      <div
                        className={cn(
                          'px-6 py-4 overflow-hidden',
                          { 'max-h-[10em]': !isDescOpen },
                          { 'pb-10': isDescOpen },
                        )}
                        dangerouslySetInnerHTML={{ __html: myCase.description }}
                      />

                      <div
                        className={cn(
                          'absolute left-0 w-full bg-gradient-to-b from-transparent to-light flex justify-end items-center',
                          isDescOpen ? 'bottom-0' : 'bottom-0',
                        )}
                      >
                        <button
                          type="button"
                          className="btn btn-sm btn-light text-dark/50 hover:text-dark focus:text-dark"
                          onClick={() => setIsDescOpen(prev => !prev)}
                        >
                          {isDescOpen ? 'Read less' : 'Read more'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
