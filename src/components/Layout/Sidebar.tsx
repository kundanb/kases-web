import { useLocation } from 'react-router-dom'
import cn from 'classnames'
import { Routes } from '@/utils/consts'
import Link from '../Link'

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <div className="px-8 py-12 bg-dark-acc text-light">
      <nav className="flex flex-col gap-4 font-disp">
        <SidebarItem
          to={Routes.MyDashboard}
          icon="fi fi-rr-dashboard"
          label="My Dashboard"
          active={pathname === Routes.MyDashboard}
        />
        <SidebarItem
          to={Routes.MyCases}
          icon="fi fi-rr-auction"
          label="My Cases"
          active={pathname.startsWith(Routes.MyCases)}
        />
        <SidebarItem
          to={Routes.MyProfile}
          icon="fi fi-rr-user"
          label="My Profile"
          active={pathname === Routes.MyProfile}
        />
      </nav>
    </div>
  )
}

interface SidebarItemProps {
  to: string
  icon: string
  label: React.ReactNode
  active?: boolean
}

const SidebarItem = ({ to, icon, label, active }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'px-4 py-2 rounded',
        'hover:bg-light/20 focus:bg-light/20 focus:ring focus:ring-offset-dark-acc',
        'flex items-center gap-4',
        { '!bg-prim-acc ': active }
      )}
    >
      <i className={icon}></i> {label}
    </Link>
  )
}
