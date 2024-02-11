import { Form, Formik, FormikContextType } from 'formik'
import * as Yup from 'yup'
import FormikErrorFocus from 'formik-error-focus'
import { toast } from 'react-toastify'
import { ApiErrResp } from '@/utils/types'
import { Routes } from '@/utils/consts'
import { useAppDispatch } from '@/app/store'
import { fetchMeApi, registerApi } from '@/app/auth/authApis'
import Link from '@/components/Link'
import ApiErrorToast from '@/components/Toasts'
import * as FormElems from '@/components/Form'

interface RegisterFormProps {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const initialValues: RegisterFormProps = {
  username: 'kundanb',
  email: 'kundanbhasin11062000@gmail.com',
  password: 'd?mL6W5#5xv8M7?',
  confirmPassword: 'd?mL6W5#5xv8M7?',
}

export default function Register() {
  const dispatch = useAppDispatch()

  return (
    <div className="py-12">
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
              initialValues={initialValues}
              enableReinitialize
              validateOnChange
              validationSchema={Yup.object({
                username: Yup.string()
                  .required('Please create a new username')
                  .min(6, 'Username must be at least 6 characters')
                  .matches(/^\w+$/, 'Username can only contain letters, numbers, and underscores')
                  .matches(/[a-zA-Z]/, 'Username must contain at least 1 letter'),

                email: Yup.string().required('Please enter your email').email('Please enter a valid email'),

                password: Yup.string()
                  .required('Please create a new password')
                  .min(8, 'Password must be at least 8 characters'),

                confirmPassword: Yup.string()
                  .required('Please retype your password')
                  .oneOf([Yup.ref('password')], 'Passwords do not match'),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const body = {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                  }

                  await dispatch(registerApi(body)).unwrap()
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
                    <FormElems.Label htmlFor="username">Username</FormElems.Label>
                    <FormElems.Input
                      id="username"
                      name="username"
                      placeholder="Create a Username"
                      value={values.username}
                      onChange={handleChange}
                      hasError={touched.username && !!errors.username}
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                    />
                    <FormElems.ErrMsg name="confirmPassword" />
                  </FormElems.Field>

                  <FormElems.Field>
                    <button type="submit" className="btn btn-prim" disabled={isSubmitting}>
                      {isSubmitting && <span className="spinner spinner-light"></span>} Register
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
