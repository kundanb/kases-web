import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import cn from 'classnames'
import Logo from '@/assets/logo-dark.svg'
import AvatarImg from '@/assets/avatar.svg'
import { Routes } from '@/utils/consts'
import { useAppDispatch } from '@/app/store'
import { authActions, useAuth } from '@/app/auth/authSlice'
import Link from '../Link'

export default function Header() {
  const dispatch = useAppDispatch()

  const auth = useAuth()

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const { pathname } = useLocation()

  useEffect(() => {
    setIsUserMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-header h-16 bg-light border-t-4 border-t-misc border-b">
      <div className="container h-full flex justify-between items-center">
        <Link to={Routes.Home} className="rounded focus:ring">
          <img src={Logo} alt="Kases Logo" className="h-8" />
        </Link>

        <nav className="flex items-center gap-6">
          <a
            href={Routes.Blog}
            target="_blank"
            className="rounded text-dark/70 hover:text-dark focus:text-dark focus:ring"
          >
            Visit our Blog
          </a>

          <div className="h-4 border-r"></div>

          {!auth.isLoggedIn ? (
            <>
              <Link to={Routes.Login} className="rounded text-dark/70 hover:text-dark focus:text-dark focus:ring">
                Login
              </Link>
              <Link to={Routes.Register} className="btn btn-dark hover:bg-prim-acc focus:bg-prim-acc">
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                className={cn(
                  'px-3 h-12 rounded text-light focus:ring flex items-center gap-2',
                  'bg-prim hover:bg-prim-acc',
                  'focus:bg-gradient-to-br focus:from-prim focus:to-prim-acc',
                  { 'bg-gradient-to-br from-prim to-prim-acc': isUserMenuOpen }
                )}
                onClick={() => setIsUserMenuOpen(prev => !prev)}
              >
                <img src={AvatarImg} alt="Avatar" className="size-8 rounded-full border-2 border-light" />

                <span className="text-left font-disp flex flex-col">
                  {auth.user?.name ? (
                    <>
                      <span className="font-medium">{auth.user?.name}</span>
                      <span className="text-xs text-light/70">{auth.user?.username}</span>
                    </>
                  ) : (
                    <span className="font-medium">{auth.user?.username}</span>
                  )}
                </span>

                <span className="text-sm">
                  <i className="fi fi-rs-angle-down"></i>
                </span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 p-4 bg-light rounded shadow-xl flex flex-col gap-2">
                  <Link
                    to={Routes.MyProfile}
                    className="text-dark/70 hover:text-dark focus:text-dark rounded focus:ring flex items-center gap-3"
                  >
                    <i className="fi fi-rr-user"></i> Profile
                  </Link>
                  <Link
                    to={Routes.MySettings}
                    className="text-dark/70 hover:text-dark focus:text-dark rounded focus:ring flex items-center gap-3"
                  >
                    <i className="fi fi-rr-settings"></i> Settings
                  </Link>

                  <div className="my-2 border-b"></div>

                  <button
                    className="btn btn-outline btn-outline-dark focus:ring flex items-center"
                    onClick={() => dispatch(authActions.logout())}
                  >
                    <i className="fi fi-rr-sign-out-alt"></i> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
