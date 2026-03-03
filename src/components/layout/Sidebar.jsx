import { useState } from 'react'
import {
  LayoutDashboard,
  FolderOpen,
  ScanLine,
  CalendarDays,
  Bell,
  Settings,
  HelpCircle,
  ChevronRight,
  Menu,
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { ThemeToggle } from '../ui/Badges'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Projects', icon: FolderOpen },
  { label: 'Scans', icon: ScanLine },
  { label: 'Schedule', icon: CalendarDays },
]

const bottomNavItems = [
  { label: 'Notifications', icon: Bell },
  { label: 'Settings', icon: Settings },
  { label: 'Support', icon: HelpCircle },
]

export default function Sidebar({ activeNav, setActiveNav, onNavigate }) {
  const { theme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isDark = theme === 'dark'

  const handleNav = (label) => {
    setActiveNav(label)
    if (label === 'Scans') onNavigate('scan-detail')
    else onNavigate('dashboard')
    setMobileOpen(false)
  }

  const sidebarContent = (
    <div className={`flex flex-col h-full py-4
      ${isDark ? 'bg-[#111213] border-r border-[#1f2123]' : 'bg-white border-r border-gray-100'}`}>
      <div className="px-4 mb-6 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-[#0CC8A8] flex items-center justify-center flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
        </div>
        <span className={`font-700 text-base tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>aps</span>
      </div>

      <nav className="flex-1 px-2 space-y-0.5">
        {navItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => handleNav(label)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-500 transition-all duration-150 text-left
              ${activeNav === label
                ? isDark
                  ? 'bg-[#0CC8A8]/10 text-[#0CC8A8]'
                  : 'bg-[#0CC8A8]/10 text-[#09a98d]'
                : isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-white/5'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
          >
            <Icon size={16} strokeWidth={1.8} className={activeNav === label ? 'text-[#0CC8A8]' : ''} />
            {label}
          </button>
        ))}
      </nav>

      <div className="px-2 space-y-0.5 mb-2">
        {bottomNavItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => handleNav(label)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-500 transition-all duration-150 text-left
              ${activeNav === label
                ? isDark ? 'bg-[#0CC8A8]/10 text-[#0CC8A8]' : 'bg-[#0CC8A8]/10 text-[#09a98d]'
                : isDark ? 'text-zinc-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
          >
            <Icon size={16} strokeWidth={1.8} />
            {label}
          </button>
        ))}
      </div>

      <div className={`mx-3 pt-3 mt-1 border-t ${isDark ? 'border-[#1f2123]' : 'border-gray-100'}`}>
        <div className="flex items-center gap-2.5 px-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex-shrink-0 flex items-center justify-center">
            <span className="text-white text-xs font-700">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className={`text-[12px] font-600 truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>admin@edu.com</div>
            <div className={`text-[11px] truncate ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>Security Lead</div>
          </div>
          <button className={`p-1 rounded transition-colors ${isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-gray-400 hover:text-gray-600'}`}>
            <ChevronRight size={14} strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex items-center gap-2 px-1 mt-3">
          <span className={`text-[11px] ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>
            {theme === 'dark' ? 'Dark' : 'Light'}
          </span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg ${isDark ? 'bg-[#1f2123] text-white' : 'bg-white text-gray-900 border border-gray-200'}`}
      >
        <Menu size={18} strokeWidth={1.8} />
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute left-0 top-0 bottom-0 w-56" onClick={e => e.stopPropagation()}>
            {sidebarContent}
          </div>
        </div>
      )}

      <div className="hidden lg:block w-52 flex-shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </div>
    </>
  )
}