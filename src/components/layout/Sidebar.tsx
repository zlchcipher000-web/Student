import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Wallet,
  CreditCard,
  GraduationCap,
  Bell,
  User,
  Settings,
  LogOut,
  BookOpen,
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/sessions', icon: BookOpen, label: 'My Sessions' },
  { to: '/students', icon: Users, label: 'My Students' },
  { to: '/schedule', icon: CalendarDays, label: 'Schedule' },
  { to: '/earnings', icon: Wallet, label: 'Earnings' },
  { to: '/payouts', icon: CreditCard, label: 'Payouts' },
  { to: '/tuition', icon: GraduationCap, label: 'Tuition Monitoring' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-[var(--bg-sidebar)] flex flex-col z-50">
      {/* Logo */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent-blue)] flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white text-lg font-bold leading-tight">EduFund</h1>
            <p className="text-[10px] text-[var(--text-sidebar)] tracking-[2px] uppercase">Tutor Portal</p>
          </div>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="mx-3 mb-4 p-3 rounded-lg bg-[#1E293B]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/avatars/maria.jpg"
              alt="Maria Santos"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[var(--accent-green)] rounded-full border-2 border-[#1E293B]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">Maria Santos</p>
            <p className="text-[var(--text-sidebar)] text-xs">Student Tutor</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-2 h-2 bg-[var(--accent-green)] rounded-full" />
          <span className="text-[var(--accent-green)] text-[11px] font-medium">Online</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 h-11 px-3 rounded-lg text-sm font-medium transition-default ${
                  isActive
                    ? 'bg-[#1E293B] text-white'
                    : 'text-[var(--text-sidebar)] hover:bg-[#1E293B] hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
              {item.to === '/notifications' && (
                <span className="ml-auto w-2 h-2 bg-[var(--accent-red)] rounded-full" />
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-[#1E293B]">
        <button className="flex items-center gap-3 h-11 px-3 rounded-lg text-sm font-medium text-[var(--text-sidebar)] hover:bg-[#1E293B] hover:text-white transition-default w-full">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
