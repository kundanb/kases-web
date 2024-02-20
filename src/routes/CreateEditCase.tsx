import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import type { ApiErrResp } from '@/utils/types'
import { Routes } from '@/utils/consts'
import { useAppDispatch } from '@/app/store'
import { CreateCaseApiProps, UpdateCaseApiProps, createCaseApi, myCaseApi, updateCaseApi } from '@/app/cases/casesApi'
import Link from '@/components/Link'
import ApiErrorToast from '@/components/Toasts'
import * as FormElems from '@/components/Form'

interface RouteParams {
  id?: string
}

interface FormVals {
  caseId?: number
  caseNumber: string
  court: string
  title: string
  description: string
}

export default function CreateEditCase() {
  const dispatch = useAppDispatch()

  const history = useHistory()
  const params = useParams<RouteParams>()

  const [initFormVals, setInitFormVals] = useState<FormVals>({
    caseNumber: '',
    court: '',
    title: '',
    description: '',
  })

  const [isEdit, setIsEdit] = useState(false)
  const [isCaseLoading, setIsCaseLoading] = useState(0)
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
          const data = await dispatch(myCaseApi({ setIsLoading: setIsCaseLoading, body: +params.id! })).unwrap()

          setInitFormVals({
            caseId: data.id,
            caseNumber: data.caseNumber,
            court: data.court,
            title: data.title,
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
          <Link to={Routes.MyCases} className="btn btn-sm btn-light text-dark/50 hover:text-dark focus:text-dark">
            <i className="fi fi-rs-angle-left text-xs"></i> Back to My Cases
          </Link>
        </div>

        <h1 className="mt-4 text-4xl text-dark-acc font-disp font-bold">Create Case</h1>

        <div className="mt-8">
          {isCaseLoading ? (
            <div className="py-8 flex justify-center items-center gap-3">
              <span className="spinner"></span> Retrieving case details...
            </div>
          ) : (
            <Formik
              initialValues={initFormVals}
              enableReinitialize
              validateOnChange
              validationSchema={Yup.object({
                caseNumber: Yup.string().required('Please enter a case number'),
                title: Yup.string().required('Please enter a title'),
                description: Yup.string(),
              })}
              onSubmit={async values => {
                const setIsLoading = setIsFormLoading

                try {
                  if (!isEdit) {
                    const body: CreateCaseApiProps['body'] = {
                      caseCaseNumber: values.caseNumber,
                      caseCourt: values.court,
                      caseTitle: values.title,
                      caseDescription: values.description,
                    }

                    await dispatch(createCaseApi({ setIsLoading, body })).unwrap()
                    toast.success('Case created successfully')

                    history.push(Routes.MyCases)
                  } else {
                    const body: UpdateCaseApiProps['body'] = {
                      caseId: values.caseId!,
                      caseCaseNumber: values.caseNumber,
                      caseCourt: values.court,
                      caseTitle: values.title,
                      caseDescription: values.description,
                    }

                    await dispatch(updateCaseApi({ setIsLoading, body })).unwrap()
                    toast.success('Case updated successfully')

                    history.push(Routes.MyCases)
                  }
                } catch (e) {
                  toast.error(ApiErrorToast(e as ApiErrResp))
                }
              }}
            >
              {({ values, touched, errors, setFieldTouched, handleChange, handleSubmit }) => (
                <Form className="flex flex-col gap-8" onSubmit={handleSubmit} autoComplete="off">
                  <FormElems.Field className="flex-1">
                    <FormElems.Label htmlFor="caseNumber">Court</FormElems.Label>
                    <FormElems.Input
                      id="court"
                      name="court"
                      placeholder="Enter the court name"
                      value={values.court}
                      onChange={handleChange}
                      hasError={touched.court && !!errors.court}
                      disabled={!!isFormLoading}
                      autoFocus
                    />
                    <FormElems.ErrMsg name="court" />
                  </FormElems.Field>

                  <div className="flex gap-8">
                    <FormElems.Field className="flex-1">
                      <FormElems.Label htmlFor="caseNumber">Case Number</FormElems.Label>
                      <FormElems.Input
                        id="caseNumber"
                        name="caseNumber"
                        placeholder="Enter the case number"
                        value={values.caseNumber}
                        onChange={handleChange}
                        hasError={touched.caseNumber && !!errors.caseNumber}
                        disabled={!!isFormLoading}
                      />
                      <FormElems.ErrMsg name="caseNumber" />
                    </FormElems.Field>

                    <FormElems.Field className="flex-1">
                      <FormElems.Label htmlFor="title">Title</FormElems.Label>
                      <FormElems.Input
                        id="title"
                        name="title"
                        placeholder="Enter the title"
                        value={values.title}
                        onChange={handleChange}
                        hasError={touched.title && !!errors.title}
                        disabled={!!isFormLoading}
                      />
                      <FormElems.ErrMsg name="title" />
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
                      <span>{isEdit ? 'Update' : 'Create'} Case</span>
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
