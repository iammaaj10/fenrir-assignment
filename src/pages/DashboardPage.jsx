import { useState, useMemo } from 'react'
import {
  Search,
  SlidersHorizontal,
  Columns3,
  Plus,
  FileDown,
  StopCircle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  AlertTriangle,
  Info,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import Sidebar from '../components/layout/Sidebar'
import { StatusChip, VulnBadge, Toast } from '../components/ui/Badges'
import { mockScans, orgStats, severityStats } from '../data/mockData'

function SeverityIcon({ type }) {
  const iconProps = { size: 16, strokeWidth: 1.6 }
  if (type === 'critical') return (
    <div className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center">
      <ShieldAlert {...iconProps} className="text-red-500" />
    </div>
  )
  if (type === 'high') return (
    <div className="w-8 h-8 rounded-full bg-orange-500/15 flex items-center justify-center">
      <AlertTriangle {...iconProps} className="text-orange-500" />
    </div>
  )
  if (type === 'medium') return (
    <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center">
      <AlertTriangle {...iconProps} className="text-amber-500" />
    </div>
  )
  return (
    <div className="w-8 h-8 rounded-full bg-blue-500/15 flex items-center justify-center">
      <Info {...iconProps} className="text-blue-500" />
    </div>
  )
}

function ProgressBar({ progress, status }) {
  const color = status === 'Failed' ? 'bg-red-500' : 'bg-[#0CC8A8]'
  const track = status === 'Failed' ? 'bg-red-500/15' : 'bg-[#0CC8A8]/15'
  return (
    <div className="flex items-center gap-2.5">
      <div className={`flex-1 h-1.5 rounded-full ${track} max-w-[100px]`}>
        <div className={`h-full rounded-full ${color}`} style={{ width: `${progress}%` }} />
      </div>
      <span className="text-xs text-gray-400 font-500 w-8">{progress}%</span>
    </div>
  )
}

export default function DashboardPage({ onNavigate }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState(null)
  const [page, setPage] = useState(1)
  const perPage = 15

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const filtered = useMemo(() =>
    mockScans.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase())
    ), [search])

  const paginated = filtered.slice((page - 1) * perPage, page * perPage)
  const totalPages = Math.ceil(filtered.length / perPage)

  return (
    <div className={`flex h-screen overflow-hidden ${isDark ? 'bg-[#111213]' : 'bg-[#f5f6f7]'}`}>
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className={`flex items-center justify-between px-6 py-3.5 border-b flex-shrink-0
          ${isDark ? 'bg-[#111213] border-[#1f2123]' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center gap-2 text-sm">
            <span className={`font-600 ${isDark ? 'text-white' : 'text-gray-900'}`}>Scan</span>
            <ChevronRight size={14} strokeWidth={1.3} className="text-gray-400" />
            <span className={isDark ? 'text-zinc-400' : 'text-gray-500'}>Private Assets</span>
            <ChevronRight size={14} strokeWidth={1.3} className="text-gray-400" />
            <span className="text-[#0CC8A8] font-500">New Scan</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Report exported successfully')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-600 border transition-all
                ${isDark ? 'border-[#2a2d2f] text-zinc-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              <FileDown size={13} strokeWidth={1.8} />
              Export Report
            </button>
            <button
              onClick={() => showToast('Scan stopped')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-600 border border-red-500/40 text-red-500 hover:bg-red-500/5 transition-all"
            >
              <StopCircle size={13} strokeWidth={1.8} />
              Stop Scan
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto font-bold">
          <div className={`px-6 py-3.5 border-b ${isDark ? 'border-[#1f2123]' : 'border-gray-100'}`}>
            <div className="flex items-center gap-6 flex-wrap text-[12.5px] ">
              {[
                { label: 'Org:', value: orgStats.org },
                { label: 'Owner:', value: orgStats.owner },
                { label: 'Total Scans:', value: orgStats.totalScans },
                { label: 'Scheduled:', value: orgStats.scheduled },
                { label: 'Rescans:', value: orgStats.rescans },
                { label: 'Failed Scans:', value: orgStats.failedScans },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 ">
                  <span className={isDark ? 'text-zinc-500' : 'text-gray-400'}>{item.label}</span>
                  
                  <span className={`font-600 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</span>
                  <span className='text-gray-500'>|</span>
                </div>
              ))}
              <div className="ml-auto flex items-center gap-1.5 text-[#0CC8A8]">
                <RefreshCw size={13} strokeWidth={1.8} />
                <span className="text-[12px] font-500">{orgStats.lastUpdated}</span>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-4 border-b ${isDark ? 'border-[#1f2123]' : 'border-gray-100'}`}>
            {severityStats.map((s, i) => (
              <div key={i} className={`px-6 py-4 ${i < 3 ? (isDark ? 'border-r border-[#1f2123]' : 'border-r border-gray-100') : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-500 ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>{s.label}</span>
                  <SeverityIcon type={s.icon} />
                </div>
                <div className={`text-3xl font-700 mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.count}</div>
                <div className={`flex items-center gap-1 text-[11px] font-500
                  ${s.direction === 'up' ? 'text-red-400' : 'text-green-400'}`}>
                  {s.direction === 'up'
                    ? <TrendingUp size={11} strokeWidth={1.8} />
                    : <TrendingDown size={11} strokeWidth={1.8} />
                  }
                  {s.change} {s.direction === 'up' ? 'increase' : 'decrease'} than yesterday
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4">
            <div className="flex items-center gap-3 mb-4">
              <div className={`flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-md border max-w-4xl
                ${isDark ? 'bg-[#18191b] border-[#2a2d2f]' : 'bg-white border-gray-200'}`}>
                <Search size={14} strokeWidth={1.5} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search scans by name or type..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1) }}
                  className={`flex-1 bg-transparent text-sm outline-none
                    ${isDark ? 'text-white placeholder-zinc-500' : 'text-gray-900 placeholder-gray-400'}`}
                />
              </div>
              <button
                onClick={() => showToast('Filters applied')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-500 transition-all
                  ${isDark ? 'border-[#2a2d2f] text-zinc-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                <SlidersHorizontal size={14} strokeWidth={1.6} />
                Filter
              </button>
              <button
                onClick={() => showToast('Column options opened')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-500 transition-all
                  ${isDark ? 'border-[#2a2d2f] text-zinc-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                <Columns3 size={14} strokeWidth={1.6} />
                Column
              </button>
              <button
                onClick={() => showToast('New scan wizard opened')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0CC8A8] text-white text-sm font-600 hover:bg-[#09a98d] transition-all active:scale-[0.98]"
              >
                <Plus size={14} strokeWidth={2} />
                New scan
              </button>
            </div>

            <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-[#1f2123]' : 'border-gray-200'}`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`text-[11.5px] font-600 uppercase tracking-wide border-b
                      ${isDark ? 'bg-[#18191b] border-[#1f2123] text-zinc-500' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                      <th className="px-5 py-3 text-left">Scan Name</th>
                      <th className="px-5 py-3 text-left">Type</th>
                      <th className="px-5 py-3 text-left">Status</th>
                      <th className="px-5 py-3 text-left">Progress</th>
                      <th className="px-5 py-3 text-left">Vulnerability</th>
                      <th className="px-5 py-3 text-right">Last Scan</th>
                    </tr>
                  </thead>
                  <tbody className='font-bold'>
                    {paginated.map((scan, i) => (
                      <tr
                        key={scan.id}
                        onClick={() => onNavigate('scan-detail')}
                        className={`border-b cursor-pointer transition-colors
                          ${isDark
                            ? 'border-[#1f2123] hover:bg-white/[0.02]'
                            : 'border-gray-50 hover:bg-gray-50/80'
                          } ${i === paginated.length - 1 ? 'border-b-0' : ''}`}
                      >
                        <td className={`px-5 py-3.5 text-sm font-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {scan.name}
                        </td>
                        <td className={`px-5 py-3.5 text-sm ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>
                          {scan.type}
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusChip status={scan.status} />
                        </td>
                        <td className="px-5 py-3.5">
                          <ProgressBar progress={scan.progress} status={scan.status} />
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1">
                            {scan.vuln.map((count, idx) => (
                              <VulnBadge key={idx} count={count} level={idx} />
                            ))}
                          </div>
                        </td>
                        <td className={`px-5 py-3.5 text-sm text-right ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>
                          {scan.lastScan}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={`flex items-center justify-between px-5 py-3 border-t
                ${isDark ? 'border-[#1f2123] bg-[#18191b]' : 'border-gray-100 bg-gray-50'}`}>
                <span className={`text-xs ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>
                  Showing {Math.min(paginated.length, perPage)} of {filtered.length} Scans
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all
                      ${isDark ? 'border border-[#2a2d2f] text-zinc-400 hover:bg-white/5 disabled:opacity-30' : 'border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30'}`}
                  >
                    <ChevronLeft size={12} strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all
                      ${isDark ? 'border border-[#2a2d2f] text-zinc-400 hover:bg-white/5 disabled:opacity-30' : 'border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30'}`}
                  >
                    <ChevronRight size={12} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}