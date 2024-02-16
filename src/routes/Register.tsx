import { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import type { ApiErrResp } from '@/utils/types'
import { UserRole } from '@/utils/enums'
import { Routes } from '@/utils/consts'
import { useAppDispatch } from '@/app/store'
import { RegisterApiProps, fetchMeApi, registerApi } from '@/app/auth/authApis'
import Link from '@/components/Link'
import ApiErrorToast from '@/components/Toasts'
import * as FormElems from '@/components/Form'

interface FormVals {
  role: UserRole | undefined
  username: string
  email: string
  password: string
  confirmPassword: string
}

const formInitVals: FormVals = {
  role: undefined,
  username: 'kundanb',
  email: 'kundanbhasin11062000@gmail.com',
  password: 'd?mL6W5#5xv8M7?',
  confirmPassword: 'd?mL6W5#5xv8M7?',
}

export default function Register() {
  const dispatch = useAppDispatch()

  const [isFormLoading, setIsFormLoading] = useState(0)

  return (
    <div className="py-8">
      <div className="container">
        <div className="max-w-md mx-auto text-center">
          <p className="flex justify-center items-center gap-1 text-sm">
            <span className="text-dark/70">Already have an account?</span>{' '}
            <Link to={Routes.Login} className="btn btn-sm btn-light text-prim">
              Log in now
            </Link>
          </p>

          <div className="w-32 my-8 mx-auto border-b"></div>

          <h1 className="font-disp font-bold text-4xl text-dark-acc">
            Register here for <span className=" text-prim-acc">free</span>
          </h1>

          <div className="mt-8 card text-left">
            <Formik
              initialValues={formInitVals}
              enableReinitialize
              validateOnChange
              validationSchema={Yup.object({
                role: Yup.mixed<UserRole>()
                  .required('Please select a role.')
                  .oneOf([UserRole.Lawyer, UserRole.Client], 'Please select a valid role.'),

                username: Yup.string()
                  .required('Please create a new username.')
                  .min(6, 'Username must be at least 6 characters.')
                  .matches(/^\w+$/, 'Username can only contain letters, numbers, and underscores.')
                  .matches(/[a-zA-Z]/, 'Username must contain at least 1 letter.'),

                email: Yup.string().required('Please enter your email').email('Please enter a valid email.'),

                password: Yup.string()
                  .required('Please create a new password.')
                  .min(8, 'Password must be at least 8 characters.'),

                confirmPassword: Yup.string()
                  .required('Please retype your password.')
                  .oneOf([Yup.ref('password')], 'Passwords do not match.'),
              })}
              onSubmit={async values => {
                try {
                  const body: RegisterApiProps['body'] = {
                    role: values.role!,
                    username: values.username,
                    email: values.email,
                    password: values.password,
                  }

                  await dispatch(registerApi({ setIsLoading: setIsFormLoading, body })).unwrap()
                  toast.success('Registered successfully')
                  await dispatch(fetchMeApi({ setIsLoading: setIsFormLoading })).unwrap()
                } catch (e) {
                  toast.error(ApiErrorToast(e as ApiErrResp))
                }
              }}
            >
              {({ values, touched, errors, setFieldValue, handleChange, handleSubmit }) => (
                <Form className="flex flex-col gap-8" onSubmit={handleSubmit} autoComplete="off">
                  <FormElems.Field>
                    <FormElems.Label>Role</FormElems.Label>

                    <FormElems.RadioGroup
                      options={[
                        { label: 'Lawyer', value: UserRole.Lawyer },
                        { label: 'Client', value: UserRole.Client },
                      ]}
                      name="role"
                      value={values.role}
                      onChange={e => e.target.checked && setFieldValue(e.target.name, +e.target.value)}
                      disabled={!!isFormLoading}
                      hasError={touched.role && !!errors.role}
                    />

                    <FormElems.ErrMsg name="role" />
                  </FormElems.Field>

                  <FormElems.Field>
                    <FormElems.Label htmlFor="username">Username</FormElems.Label>
                    <FormElems.Input
                      id="username"
                      name="username"
                      placeholder="Create a Username"
                      value={values.username}
                      onChange={handleChange}
                      hasError={touched.username && !!errors.username}
                      disabled={!!isFormLoading}
                      autoFocus
                    />
                    <FormElems.ErrMsg name="username" />
                  </FormElems.Field>

                  <FormElems.Field>
                    <FormElems.Label htmlFor="email">Email</FormElems.Label>
                    <FormElems.Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your Email"
                      value={values.email}
                      onChange={handleChange}
                      hasError={touched.email && !!errors.email}
                      disabled={!!isFormLoading}
                    />
                    <FormElems.ErrMsg name="email" />
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
                    <FormElems.Label htmlFor="confirmPassword">Confirm Password</FormElems.Label>
                    <FormElems.Password
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Retype your Password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      hasError={touched.confirmPassword && !!errors.confirmPassword}
                      disabled={!!isFormLoading}
                    />
                    <FormElems.ErrMsg name="confirmPassword" />
                  </FormElems.Field>

                  <FormElems.Field>
                    <button type="submit" className="btn btn-prim" disabled={!!isFormLoading}>
                      {!!isFormLoading && <span className="spinner spinner-light"></span>} Register
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
