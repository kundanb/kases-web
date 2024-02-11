import { useLocation } from 'react-router-dom'
import { useAuth } from '@/app/auth/authSlice'
import PageLoader from './PageLoader'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

export interface LayoutProps {
  children?: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const auth = useAuth()

  const { pathname } = useLocation()

  return (
    <>
      <PageLoader />

      <div className="min-h-screen flex flex-col">
        <Header />

        <div className="flex-1 flex">
          {auth.isLoggedIn && pathname.startsWith('/me') && <Sidebar />}

          <main className="flex-1 flex flex-col min-w-0">{children}</main>
        </div>

        <Footer />
      </div>
    </>
  )
}
