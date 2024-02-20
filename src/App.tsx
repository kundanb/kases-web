import { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import type { ApiErrResp } from './utils/types'
import { Routes } from './utils/consts'
import { useAppDispatch } from './app/store'
import { fetchMeApi } from './app/auth/authApis'
import { useAuth } from './app/auth/authSlice'
import ApiErrorToast from './components/Toasts'
import Layout from './components/Layout'
import Home from './routes/Home'
import Register from './routes/Register'
import Login from './routes/Login'
import MyDashboard from './routes/MyDashboard'
import MyCases from './routes/MyCases'
import CreateEditCase from './routes/CreateEditCase'
import MyCase from './routes/MyCase'
import MyHearings from './routes/MyHearings'
import CreateEditHearing from './routes/CreateEditHearing'
import MyHearing from './routes/MyHearing'

export default function App() {
  const dispatch = useAppDispatch()

  const auth = useAuth()

  useEffect(() => {
    dispatch(fetchMeApi())
      .unwrap()
      .catch(e => toast.error(ApiErrorToast(e as ApiErrResp)))
  }, [dispatch])

  return (
    <>
      <Layout>
        {auth.isInitialized && !auth.isLoading && (
          <Switch>
            <Route path={Routes.Home} exact component={Home} />

            {!auth.isLoggedIn ? (
              <Switch>
                <Route path={Routes.Register} component={Register} />
                <Route path={Routes.Login} component={Login} />

                <Route path="*">
                  <Redirect to={Routes.Login} />
                </Route>
              </Switch>
            ) : (
              <Switch>
                <Route path={Routes.MyDashboard} exact component={MyDashboard} />
                <Route path={Routes.MyCases} exact component={MyCases} />
                <Route path={Routes.CreateCase} exact component={CreateEditCase} />
                <Route path={Routes.EditCase()} exact component={CreateEditCase} />
                <Route path={Routes.MyCase()} exact component={MyCase} />
                <Route path={Routes.MyHearings} exact component={MyHearings} />
                <Route path={Routes.CreateHearing} exact component={CreateEditHearing} />
                <Route path={Routes.EditHearing()} exact component={CreateEditHearing} />
                <Route path={Routes.MyHearing()} exact component={MyHearing} />

                <Route path="*">
                  <Redirect to={Routes.MyDashboard} />
                </Route>
              </Switch>
            )}
          </Switch>
        )}
      </Layout>

      <ToastContainer theme="colored" bodyStyle={{ fontSize: '0.9rem' }} closeOnClick />
    </>
  )
}
