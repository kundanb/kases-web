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
  userUnique: string
  userPassword: string
}

const formInitVals: FormVals = {
  userUnique: 'kundanb',
  userPassword: 'd?mL6W5#5xv8M7?',
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
                userUnique: Yup.string().required('Please enter your username or email.'),
                userPassword: Yup.string().required('Please enter your password.'),
              })}
              onSubmit={async values => {
                try {
                  const body: LoginApiProps['body'] = {
                    userUnique: values.userUnique,
                    userPassword: values.userPassword,
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
                    <FormElems.Label htmlFor="userUnique">Username or Email</FormElems.Label>
                    <FormElems.Input
                      id="userUnique"
                      name="userUnique"
                      placeholder="Enter your Username or Email"
                      value={values.userUnique}
                      onChange={handleChange}
                      hasError={touched.userUnique && !!errors.userUnique}
                      disabled={!!isFormLoading}
                      autoFocus
                    />
                    <FormElems.ErrMsg name="userUnique" />
                  </FormElems.Field>

                  <FormElems.Field>
                    <FormElems.Label htmlFor="userPassword">Password</FormElems.Label>
                    <FormElems.Password
                      id="userPassword"
                      name="userPassword"
                      placeholder="Create a Password"
                      value={values.userPassword}
                      onChange={handleChange}
                      hasError={touched.userPassword && !!errors.userPassword}
                      disabled={!!isFormLoading}
                    />
                    <FormElems.ErrMsg name="userPassword" />
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
