import { useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { ApiErrResp } from '@/utils/types'
import { Routes } from '@/utils/consts'
import { useAppDispatch } from '@/app/store'
import { createCaseApi } from '@/app/cases/casesApi'
import Link from '@/components/Link'
import ApiErrorToast from '@/components/Toasts'
import * as FormElems from '@/components/Form'

interface CreateEditCaseFormProps {
  caseNumber: string
  title: string
  description: string
}

const initialValues: CreateEditCaseFormProps = {
  caseNumber: '',
  title: '',
  description: '',
}

export default function CreateEditCase() {
  const dispatch = useAppDispatch()

  const history = useHistory()

  return (
    <div className="py-12">
      <div className="container">
        <div>
          <Link
            to={Routes.MyCases}
            className="btn btn-sm btn-light text-dark-acc/50 hover:text-dark-acc focus:text-dark-acc"
          >
            <i className="fi fi-rs-angle-left text-xs"></i> Back to My Cases
          </Link>
        </div>

        <h1 className="mt-6 text-4xl text-dark-acc font-disp font-bold">Create Case</h1>

        <div className="mt-8">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validateOnChange
            validationSchema={Yup.object({
              caseNumber: Yup.string().required('Please enter a case number'),
              title: Yup.string().required('Please enter a title'),
              description: Yup.string(),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const body = {
                  case_number: values.caseNumber,
                  title: values.title,
                  description: values.description,
                }

                await dispatch(createCaseApi(body)).unwrap()
                history.push(Routes.MyCases)
              } catch (e) {
                toast.error(ApiErrorToast(e as ApiErrResp))
              } finally {
                setSubmitting(false)
              }
            }}
          >
            {({ values, touched, errors, handleChange, handleSubmit, isSubmitting }) => (
              <Form className="flex flex-col gap-8" onSubmit={handleSubmit} autoComplete="off">
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
                      disabled={isSubmitting}
                      autoFocus
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
                      disabled={isSubmitting}
                    />
                    <FormElems.ErrMsg name="title" />
                  </FormElems.Field>
                </div>

                <FormElems.Field>
                  <FormElems.Label htmlFor="description">Description</FormElems.Label>
                  <FormElems.Textarea
                    id="description"
                    name="description"
                    placeholder="Enter the description"
                    value={values.description}
                    onChange={handleChange}
                    hasError={touched.description && !!errors.description}
                    disabled={isSubmitting}
                  />
                  <FormElems.ErrMsg name="description" />
                </FormElems.Field>

                <FormElems.Field className="items-center">
                  <button type="submit" className="btn btn-prim" disabled={isSubmitting}>
                    {isSubmitting && <span className="spinner spinner-light"></span>} Create Case
                  </button>
                </FormElems.Field>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
