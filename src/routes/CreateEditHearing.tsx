import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import cn from 'classnames'
import moment from 'moment'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import type { ApiErrResp } from '@/utils/types'
import { DateFormat, Routes } from '@/utils/consts'
import { useAppDispatch } from '@/app/store'
import { myCasesApi } from '@/app/cases/casesApi'
import {
  CreateHearingApiProps,
  UpdateHearingApiProps,
  createHearingApi,
  myHearingApi,
  updateHearingApi,
} from '@/app/hearings/hearingsApi'
import Link from '@/components/Link'
import ApiErrorToast from '@/components/Toasts'
import * as FormElems from '@/components/Form'

interface RouteParams {
  id?: string
}

interface FormVals {
  id?: number
  caseId: FormElems.SelectValue<number> | null
  date: string
  description: string
}

export default function CreateEditHearing() {
  const dispatch = useAppDispatch()

  const params = useParams<RouteParams>()

  const history = useHistory()

  const [initFormVals, setInitFormVals] = useState<FormVals>({
    caseId: null,
    date: '',
    description: '',
  })

  const [isEdit, setIsEdit] = useState(false)
  const [isHearingLoading, setIsHearingLoading] = useState(0)
  const [isFormLoading, setIsFormLoading] = useState(0)

  useEffect(() => {
    if (params.id) {
      setIsEdit(true)
    }
  }, [params])

  useEffect(() => {
    if (isEdit) {
      ;(async (dispatch, params) => {
        try {
          const data = await dispatch(myHearingApi({ setIsLoading: setIsHearingLoading, body: +params.id! })).unwrap()

          setInitFormVals({
            id: data.id,
            caseId: { label: data.case$!.title, value: data.case$!.id },
            date: moment(data.date).format('YYYY-MM-DD'),
            description: data.description || '',
          })
        } catch (e) {
          toast.error(ApiErrorToast(e as ApiErrResp))
        }
      })(dispatch, params)
    }
  }, [dispatch, isEdit, params])

  return (
    <div className="py-8">
      <div className="container">
        <div>
          <Link to={Routes.MyHearings} className="btn btn-sm btn-light text-dark/50 hover:text-dark focus:text-dark">
            <i className="fi fi-rs-angle-left text-xs"></i> Back to My Hearings
          </Link>
        </div>

        <h1 className="mt-4 text-4xl text-dark-acc font-disp font-bold">Create Hearing</h1>

        <div className="mt-8">
          {isHearingLoading ? (
            <div className="py-8 flex justify-center items-center gap-3">
              <span className="spinner"></span> Retrieving hearing details...
            </div>
          ) : (
            <Formik
              initialValues={initFormVals}
              enableReinitialize
              validateOnChange
              validationSchema={Yup.object({
                caseId: Yup.object().required('Case is required'),
                date: Yup.date()
                  .required('Date is required')
                  .min(moment().add(1, 'days').format('YYYY-MM-DD'), 'Date must be at least tomorrow'),
                description: Yup.string(),
                previousId: Yup.object().nullable(),
              })}
              onSubmit={async values => {
                const setIsLoading = setIsFormLoading

                try {
                  if (!isEdit) {
                    const body: CreateHearingApiProps['body'] = {
                      hearingCaseId: values.caseId!.value,
                      hearingDate: values.date,
                      hearingDescription: values.description,
                    }

                    await dispatch(createHearingApi({ setIsLoading, body })).unwrap()
                    toast.success('Hearing added successfully')

                    history.push(Routes.MyHearings)
                  } else {
                    const body: UpdateHearingApiProps['body'] = {
                      hearingId: values.id!,
                      hearingDate: values.date,
                      hearingDescription: values.description,
                    }

                    await dispatch(updateHearingApi({ setIsLoading, body })).unwrap()
                    toast.success('Hearing updated successfully')

                    history.push(Routes.MyHearings)
                  }
                } catch (e) {
                  toast.error(ApiErrorToast(e as ApiErrResp))
                }
              }}
            >
              {({ values, touched, errors, setFieldTouched, handleChange, handleSubmit }) => (
                <Form className="flex flex-col gap-8" onSubmit={handleSubmit} autoComplete="off">
                  <div className="flex gap-8">
                    <FormElems.Field className="flex-1">
                      <FormElems.Label htmlFor="caseId">Case</FormElems.Label>
                      <FormElems.AsyncSelect
                        id="caseId"
                        name="caseId"
                        placeholder="Select a case"
                        loadOptions={async search => {
                          try {
                            const data = await dispatch(myCasesApi({ body: { search } })).unwrap()
                            return data.map(c => ({ label: c.title, value: c.id }))
                          } catch (e) {
                            toast.error(ApiErrorToast(e as ApiErrResp))
                            return []
                          }
                        }}
                        value={values.caseId}
                        onChange={value => handleChange({ target: { name: 'caseId', value } })}
                        hasError={touched.caseId && !!errors.caseId}
                        disabled={!!isFormLoading}
                        autoFocus
                      />
                      <FormElems.ErrMsg name="caseId" />
                    </FormElems.Field>

                    <FormElems.Field className="flex-1">
                      <div className="flex justify-between items-center">
                        <FormElems.Label htmlFor="date">Date</FormElems.Label>
                        <span
                          className={cn('tag tag-xs font-medium', {
                            'tag-danger': moment(values.date, DateFormat).format('d') === '0',
                            'tag-success': moment(values.date, DateFormat).format('d') !== '0',
                          })}
                        >
                          {values.date && moment(values.date, DateFormat).format('dddd')}
                        </span>
                      </div>

                      <FormElems.Input
                        type="date"
                        id="date"
                        name="date"
                        placeholder="Enter the date"
                        value={values.date}
                        min={moment().add(1, 'days').format('YYYY-MM-DD')}
                        onChange={handleChange}
                        hasError={touched.date && !!errors.date}
                        disabled={!!isFormLoading}
                      />
                      <FormElems.ErrMsg name="date" />
                    </FormElems.Field>
                  </div>

                  <FormElems.Field>
                    <FormElems.Label htmlFor="description">Description</FormElems.Label>
                    <FormElems.Editor
                      placeholder="Enter the description"
                      initialData={values.description}
                      setData={data => handleChange({ target: { name: 'description', value: data } })}
                      setTouched={touched => setFieldTouched('description', touched)}
                      disabled={!!isFormLoading}
                    />
                    <FormElems.ErrMsg name="description" />
                  </FormElems.Field>

                  <div className="text-center">
                    <button type="submit" className="btn btn-wider-lg btn-prim" disabled={!!isFormLoading}>
                      {!!isFormLoading && <span className="spinner spinner-light"></span>}{' '}
                      <span>{isEdit ? 'Update' : 'Add'} Hearing</span>
                    </button>
                  </div>

                  <FormElems.ErrorFocus />
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  )
}
