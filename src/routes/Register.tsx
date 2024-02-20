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
  userRole: UserRole | undefined
  userUsername: string
  userEmail: string
  userPassword: string
  userConfirmPassword: string
}

const formInitVals: FormVals = {
  userRole: undefined,
  userUsername: 'kundanb',
  userEmail: 'kundanbhasin11062000@gmail.com',
  userPassword: 'd?mL6W5#5xv8M7?',
  userConfirmPassword: 'd?mL6W5#5xv8M7?',
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
                userRole: Yup.mixed<UserRole>()
                  .required('Please select a role.')
                  .oneOf([UserRole.Lawyer, UserRole.Client], 'Please select a valid role.'),

                userUsername: Yup.string()
                  .required('Please create a new username.')
                  .min(6, 'Username must be at least 6 characters.')
                  .matches(/^\w+$/, 'Username can only contain letters, numbers, and underscores.')
                  .matches(/[a-zA-Z]/, 'Username must contain at least 1 letter.'),

                userEmail: Yup.string().required('Please enter your email').email('Please enter a valid email.'),

                userPassword: Yup.string()
                  .required('Please create a new password.')
                  .min(8, 'Password must be at least 8 characters.'),

                userConfirmPassword: Yup.string()
                  .required('Please retype your password.')
                  .oneOf([Yup.ref('userPassword')], 'Passwords do not match.'),
              })}
              onSubmit={async values => {
                try {
                  const body: RegisterApiProps['body'] = {
                    userRole: values.userRole!,
                    userUsername: values.userUsername,
                    userEmail: values.userEmail,
                    userPassword: values.userPassword,
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
                      name="userRole"
                      value={values.userRole}
                      onChange={e => e.target.checked && setFieldValue(e.target.name, +e.target.value)}
                      disabled={!!isFormLoading}
                      hasError={touched.userRole && !!errors.userRole}
                    />

                    <FormElems.ErrMsg name="userRole" />
                  </FormElems.Field>

                  <FormElems.Field>
                    <FormElems.Label htmlFor="userUsername">Username</FormElems.Label>
                    <FormElems.Input
                      id="userUsername"
                      name="userUsername"
                      placeholder="Create a Username"
                      value={values.userUsername}
                      onChange={handleChange}
                      hasError={touched.userUsername && !!errors.userUsername}
                      disabled={!!isFormLoading}
                      autoFocus
                    />
                    <FormElems.ErrMsg name="userUsername" />
                  </FormElems.Field>

                  <FormElems.Field>
                    <FormElems.Label htmlFor="userEmail">Email</FormElems.Label>
                    <FormElems.Input
                      type="userEmail"
                      id="userEmail"
                      name="userEmail"
                      placeholder="Enter your Email"
                      value={values.userEmail}
                      onChange={handleChange}
                      hasError={touched.userEmail && !!errors.userEmail}
                      disabled={!!isFormLoading}
                    />
                    <FormElems.ErrMsg name="userEmail" />
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
                    <FormElems.Label htmlFor="userConfirmPassword">Confirm Password</FormElems.Label>
                    <FormElems.Password
                      id="userConfirmPassword"
                      name="userConfirmPassword"
                      placeholder="Retype your Password"
                      value={values.userConfirmPassword}
                      onChange={handleChange}
                      hasError={touched.userConfirmPassword && !!errors.userConfirmPassword}
                      disabled={!!isFormLoading}
                    />
                    <FormElems.ErrMsg name="userConfirmPassword" />
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
