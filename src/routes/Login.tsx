import { Form, Formik, FormikContextType } from 'formik'
import * as Yup from 'yup'
import FormikErrorFocus from 'formik-error-focus'
import { toast } from 'react-toastify'
import { ApiErrResp } from '@/utils/types'
import { Routes } from '@/utils/consts'
import { useAppDispatch } from '@/app/store'
import { fetchMeApi, loginApi } from '@/app/auth/authApis'
import Link from '@/components/Link'
import ApiErrorToast from '@/components/Toasts'
import * as FormElems from '@/components/Form'

interface RegisterFormProps {
  unique: string
  password: string
}

const initialValues: RegisterFormProps = {
  unique: 'kundanb',
  password: 'd?mL6W5#5xv8M7?',
}

export default function Login() {
  const dispatch = useAppDispatch()

  return (
    <div className="py-12">
      <div className="container">
        <div className="max-w-md mx-auto text-center">
          <p className="flex justify-center items-center gap-2 text-sm">
            <span className="text-dark/70">Don't have an account?</span>{' '}
            <Link to={Routes.Register} className="btn btn-sm btn-outline btn-outline-prim">
              Register here
            </Link>
          </p>

          <div className="w-32 my-8 mx-auto border-b"></div>

          <h1 className="font-disp font-bold text-4xl text-dark-acc">Login now</h1>

          <div className="mt-8 card text-left">
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validateOnChange
              validationSchema={Yup.object({
                unique: Yup.string().required('Please enter your username or email'),
                password: Yup.string().required('Please enter your password'),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await dispatch(loginApi(values)).unwrap()
                  await dispatch(fetchMeApi()).unwrap()
                } catch (e) {
                  toast.error(ApiErrorToast(e as ApiErrResp))
                } finally {
                  setSubmitting(false)
                }
              }}
            >
              {({ values, touched, errors, handleChange, handleSubmit, isSubmitting }) => (
                <Form className="flex flex-col gap-8" onSubmit={handleSubmit} autoComplete="off">
                  <FormElems.Field>
                    <FormElems.Label htmlFor="unique">Username or Email</FormElems.Label>
                    <FormElems.Input
                      id="unique"
                      name="unique"
                      placeholder="Enter your Username or Email"
                      value={values.unique}
                      onChange={handleChange}
                      hasError={touched.unique && !!errors.unique}
                      disabled={isSubmitting}
                      autoFocus
                    />
                    <FormElems.ErrMsg name="unique" />
                  </FormElems.Field>

                  <FormElems.Field>
                    <FormElems.Label htmlFor="password">Password</FormElems.Label>
                    <FormElems.Password
                      id="password"
                      name="password"
                      placeholder="Create a Password"
                      value={values.password}
                      onChange={handleChange}
                      hasError={touched.password && !!errors.password}
                      disabled={isSubmitting}
                    />
                    <FormElems.ErrMsg name="password" />
                  </FormElems.Field>

                  <FormElems.Field>
                    <button type="submit" className="btn btn-prim" disabled={isSubmitting}>
                      {isSubmitting && <span className="spinner spinner-light"></span>} Login
                    </button>
                  </FormElems.Field>

                  <FormikErrorFocus
                    offset={0}
                    align="middle"
                    focusDelay={0}
                    duration={150}
                    formik={{} as FormikContextType<object>}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
