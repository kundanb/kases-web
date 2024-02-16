import { useLocation } from 'react-router-dom'
import cn from 'classnames'
import { Routes } from '@/utils/consts'
import Link from '../Link'

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <div className="p-8 bg-dark-acc text-light">
      <nav className="flex flex-col gap-4 font-disp">
        <SidebarLink
          to={Routes.MyDashboard}
          icon="fi fi-rr-dashboard"
          label="My Dashboard"
          active={pathname === Routes.MyDashboard}
        />
        <SidebarLink
          to={Routes.MyCases}
          icon="fi fi-rr-auction"
          label="My Cases"
          active={pathname.startsWith(Routes.MyCases)}
        />
        <SidebarLink
          to={Routes.MyHearings}
          icon="fi fi-rr-ear"
          label="My Hearings"
          active={pathname.startsWith(Routes.MyHearings)}
        />
        <SidebarLink
          to={Routes.MyTodos}
          icon="fi fi-rr-rectangle-list"
          label="My Todos"
          active={pathname.startsWith(Routes.MyTodos)}
        />
        <SidebarLink
          to={Routes.MyProfile}
          icon="fi fi-rr-user"
          label="My Profile"
          active={pathname === Routes.MyProfile}
        />
      </nav>
    </div>
  )
}

interface SidebarLinkProps {
  to: string
  icon: string
  label: React.ReactNode
  active?: boolean
}

const SidebarLink = ({ to, icon, label, active }: SidebarLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'px-4 py-2 rounded',
        'hover:bg-light/20 focus:bg-light/20 focus:ring focus:ring-offset-dark-acc',
        'flex items-center gap-4',
        { '!bg-prim-acc ': active },
      )}
    >
      <i className={icon}></i> {label}
    </Link>
  )
}
