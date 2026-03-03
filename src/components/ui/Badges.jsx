import { X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export function SeverityBadge({ severity }) {
  const configs = {
    Critical: 'bg-red-500 text-white',
    High: 'bg-orange-500 text-white',
    Medium: 'bg-amber-500 text-white',
    Low: 'bg-green-500 text-white',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-600 tracking-wide ${configs[severity] || 'bg-gray-500 text-white'}`}>
      {severity}
    </span>
  )
}

export function StatusChip({ status }) {
  const { theme } = useTheme()
  const configs = {
    Completed: theme === 'dark'
      ? 'text-green-400 bg-green-400/10 border border-green-400/20'
      : 'text-green-600 bg-green-50 border border-green-200',
    Scheduled: theme === 'dark'
      ? 'text-zinc-400 bg-zinc-400/10 border border-zinc-500/20'
      : 'text-zinc-500 bg-zinc-100 border border-zinc-200',
    Failed: theme === 'dark'
      ? 'text-red-400 bg-red-400/10 border border-red-400/20'
      : 'text-red-500 bg-red-50 border border-red-200',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[12px] font-500 ${configs[status] || ''}`}>
      {status}
    </span>
  )
}

export function VulnBadge({ count, level }) {
  const colors = {
    0: 'bg-red-500',
    1: 'bg-orange-500',
    2: 'bg-amber-500',
    3: 'bg-green-500',
  }
  if (count === undefined) return null
  return (
    <span className={`inline-flex items-center justify-center w-7 h-6 rounded-md text-[11px] font-700 text-white ${colors[level]}`}>
      {count}
    </span>
  )
}

export function Toast({ message, onClose }) {
  const { theme } = useTheme()
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl animate-fade-in
      ${theme === 'dark' ? 'bg-[#1f2123] border border-[#2a2d2f] text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>
      <div className="w-2 h-2 rounded-full bg-[#0CC8A8] animate-pulse-dot" />
      <span className="text-sm font-500">{message}</span>
      <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-600 transition-colors">
        <X size={14} strokeWidth={1.5} />
      </button>
    </div>
  )
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className={`relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none
        ${theme === 'dark' ? 'bg-[#0CC8A8]' : 'bg-gray-300'}`}
      aria-label="Toggle theme"
    >
      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300
        ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}