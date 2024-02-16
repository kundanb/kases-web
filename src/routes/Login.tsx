import { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import type { ApiErrResp } from '@/utils/types'
import { Routes } from '@/utils/consts'
import { useAppDispatch } from '@/app/store'
import { LoginApiProps, fetchMeApi, loginApi } from '@/app/auth/authApis'
import Link from '@/components/Link'
import ApiErrorToast from '@/components/Toasts'
import * as FormElems from '@/components/Form'

interface FormVals {
  unique: string
  password: string
}

const formInitVals: FormVals = {
  unique: 'kundanb',
  password: 'd?mL6W5#5xv8M7?',
}

export default function Login() {
  const dispatch = useAppDispatch()

  const [isFormLoading, setIsFormLoading] = useState(0)

  return (
    <div className="py-8">
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
              initialValues={formInitVals}
              enableReinitialize
              validateOnChange
              validationSchema={Yup.object({
                unique: Yup.string().required('Please enter your username or email.'),
                password: Yup.string().required('Please enter your password.'),
              })}
              onSubmit={async values => {
                try {
                  const body: LoginApiProps['body'] = {
                    unique: values.unique,
                    password: values.password,
                  }

                  await dispatch(loginApi({ setIsLoading: setIsFormLoading, body })).unwrap()
                  toast.success('Logged in successfully')
                  await dispatch(fetchMeApi({ setIsLoading: setIsFormLoading })).unwrap()
                } catch (e) {
                  toast.error(ApiErrorToast(e as ApiErrResp))
                }
              }}
            >
              {({ values, touched, errors, handleChange, handleSubmit }) => (
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
                      disabled={!!isFormLoading}
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
                      disabled={!!isFormLoading}
                    />
                    <FormElems.ErrMsg name="password" />
                  </FormElems.Field>

                  <FormElems.Field>
                    <button type="submit" className="btn btn-prim" disabled={!!isFormLoading}>
                      {!!isFormLoading && <span className="spinner spinner-light"></span>} Login
                    </button>
                  </FormElems.Field>

                  <FormElems.ErrorFocus />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
