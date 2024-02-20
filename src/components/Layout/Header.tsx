import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import cn from 'classnames'
import { toast } from 'react-toastify'
import Logo from '@/assets/logo-dark.svg'
import AvatarImg from '@/assets/avatar.svg'
import { Routes } from '@/utils/consts'
import { getOutsideClickHandler } from '@/utils/funcs'
import { useAppDispatch } from '@/app/store'
import { authActions, useAuth } from '@/app/auth/authSlice'
import Link from '../Link'

export default function Header() {
  const dispatch = useAppDispatch()

  const auth = useAuth()

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false)

  const { pathname } = useLocation()

  useEffect(() => {
    setIsUserMenuOpen(false)
    setIsCreateMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const userMenuHandleClick = getOutsideClickHandler('.header-user-menu', setIsUserMenuOpen)
    const createMenuHandleClick = getOutsideClickHandler('.header-create-menu', setIsCreateMenuOpen)

    document.addEventListener('click', userMenuHandleClick)
    document.addEventListener('click', createMenuHandleClick)

    return () => {
      document.removeEventListener('click', userMenuHandleClick)
      document.removeEventListener('click', createMenuHandleClick)
    }
  }, [])

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
            <>
              <div className="header-create-menu relative">
                <button
                  className={cn('btn btn-sm btn-light border', {
                    'bg-light-acc': isCreateMenuOpen,
                  })}
                  onClick={() => setIsCreateMenuOpen(prev => !prev)}
                >
                  <i className="fi fi-rr-plus"></i>
                  {!isCreateMenuOpen ? <i className="fi fi-rs-caret-down"></i> : <i className="fi fi-rs-caret-up"></i>}
                </button>

                {isCreateMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 p-4 bg-light rounded border shadow-xl flex flex-col gap-1">
                    <DropdownMenuLink to={Routes.CreateCase} icon="fi fi-rr-auction" text="New Case" />
                    <DropdownMenuLink to={Routes.CreateHearing} icon="fi fi-rr-ear" text="New Hearing" />
                    <DropdownMenuLink to={Routes.CreateTodo} icon="fi fi-rr-rectangle-list" text="New Todo" />
                  </div>
                )}
              </div>

              <div className="header-user-menu relative flex">
                <button
                  className={cn('p-1 rounded-full bg-prim hover:bg-prim-acc focus:bg-prim-acc focus:ring', {
                    'bg-gradient-to-br from-prim to-prim-acc': isUserMenuOpen,
                  })}
                  onClick={() => setIsUserMenuOpen(prev => !prev)}
                >
                  <img src={AvatarImg} alt="Avatar" className="size-9 rounded-full" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 p-4 bg-light rounded border shadow-xl flex flex-col gap-1">
                    <DropdownMenuLink to={Routes.MyDashboard} icon="fi fi-rr-dashboard" text="Dashboard" />
                    <DropdownMenuLink to={Routes.MyProfile} icon="fi fi-rr-user" text="Profile" />
                    <DropdownMenuLink to={Routes.MySettings} icon="fi fi-rr-settings" text="Settings" />

                    <div className="my-2 border-b"></div>

                    <button
                      className="btn btn-outline btn-outline-dark flex items-center"
                      onClick={() => {
                        dispatch(authActions.logout())
                        toast.success('Logged out successfully')
                      }}
                    >
                      <i className="fi fi-rr-sign-out-alt"></i> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

interface DropdownMenuLinkProps {
  to: string
  icon: string
  text: string
}

const DropdownMenuLink = ({ to, icon, text }: DropdownMenuLinkProps) => {
  return (
    <Link to={to} className="btn btn-sm btn-light justify-start text-dark/70 hover:text-dark focus:text-dark">
      <i className={icon}></i> <span className="text-nowrap">{text}</span>
    </Link>
  )
}
