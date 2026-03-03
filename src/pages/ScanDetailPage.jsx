import { useState, useEffect, useRef } from 'react'
import {
  FileDown,
  StopCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  Loader2,
  Dot,
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import Sidebar from '../components/layout/Sidebar'
import { SeverityBadge, Toast } from '../components/ui/Badges'
import { activityLog, verificationLoops, findingLog, scanDetail } from '../data/mockData'

function CircularProgress({ progress }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const r = 52
  const circ = 2 * Math.PI * r
  const dash = (progress / 100) * circ

  return (
    <div className="relative w-36 h-36 flex-shrink-0">
      <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
        <circle cx="72" cy="72" r={r} stroke={isDark ? '#1f2123' : '#e5e7eb'} strokeWidth="8" fill="none"/>
        <circle
          cx="72" cy="72" r={r}
          stroke="#0CC8A8"
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-700 ${isDark ? 'text-white' : 'text-gray-900'}`}>{progress}%</span>
        <span className={`text-[11px] font-500 ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>In Progress</span>
      </div>
    </div>
  )
}

function StepTracker({ steps, current }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const currentIdx = steps.indexOf(current)

  return (
    <div className="flex items-center gap-0 flex-1">
      {steps.map((step, i) => {
        const isActive = i === currentIdx
        const isDone = i < currentIdx

        return (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all
                ${isActive
                  ? 'bg-[#0CC8A8] shadow-[0_0_16px_#0CC8A830]'
                  : isDone
                    ? 'bg-[#0CC8A8]/20 border-2 border-[#0CC8A8]'
                    : isDark ? 'bg-[#1f2123] border-2 border-[#2a2d2f]' : 'bg-gray-100 border-2 border-gray-200'
                }`}>
                {isActive ? (
                  <Loader2 size={14} strokeWidth={2} className="text-white animate-spin" />
                ) : isDone ? (
                  <Check size={14} strokeWidth={2.5} className="text-[#0CC8A8]" />
                ) : (
                  <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-zinc-600' : 'bg-gray-300'}`} />
                )}
              </div>
              <span className={`text-[11px] font-500 mt-1.5 whitespace-nowrap
                ${isActive ? 'text-[#0CC8A8]' : isDark ? 'text-zinc-500' : 'text-gray-400'}`}>
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-[2px] mx-1 mb-4
                ${isDone ? 'bg-[#0CC8A8]/40' : isDark ? 'bg-[#1f2123]' : 'bg-gray-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function LogLine({ entry }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="mb-3">
      <span className={`console-text ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>[{entry.time}] </span>
      {entry.text && (
        <span className={`console-text ${isDark ? 'text-zinc-300' : 'text-gray-600'}`}>{entry.text}</span>
      )}
      {entry.highlight && (
        <span className={`console-text font-500
          ${entry.highlight.color === 'teal' ? 'text-[#0CC8A8]' : entry.highlight.color === 'green' ? 'text-green-400' : 'text-amber-400'}`}>
          {entry.highlight.text}
        </span>
      )}
      {entry.suffix && (
        <span className={`console-text ${isDark ? 'text-zinc-300' : 'text-gray-600'}`}>{entry.suffix}</span>
      )}
      {entry.badge && (
        <span className={`console-text px-1.5 py-0.5 rounded text-xs mx-0.5
          ${isDark ? 'bg-zinc-700 text-zinc-200' : 'bg-gray-200 text-gray-700'}`}>
          {entry.badge}
        </span>
      )}
      {entry.end && (
        <span className={`console-text ${isDark ? 'text-zinc-300' : 'text-gray-600'}`}>{entry.end}</span>
      )}
      {entry.block && (
        <div className={`console-text border-l-2 border-[#0CC8A8]/40 pl-3 mt-1 mb-1 ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>
          {entry.block}
        </div>
      )}
      {entry.bold && (
        <span className="console-text font-700 text-[#0CC8A8]">{entry.bold.replace(/\*\*/g, '')}</span>
      )}
    </div>
  )
}

function FindingCard({ finding }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`p-4 rounded-xl border mb-3 animate-fade-in transition-all
      ${isDark ? 'bg-[#18191b] border-[#2a2d2f] hover:border-[#3a3d40]' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
      <div className="flex items-center justify-between mb-2">
        <SeverityBadge severity={finding.severity} />
        <span className={`text-[11px] font-500 ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>{finding.time}</span>
      </div>
      <div className={`text-sm font-600 mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{finding.title}</div>
      <div className="text-[12px] text-[#0CC8A8] font-500 mb-2">{finding.endpoint}</div>
      <p className={`text-[12px] leading-relaxed ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>{finding.description}</p>
    </div>
  )
}

export default function ScanDetailPage({ onNavigate }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeNav, setActiveNav] = useState('Scans')
  const [activeTab, setActiveTab] = useState('Activity Log')
  const [toast, setToast] = useState(null)
  const [consoleCollapsed, setConsoleCollapsed] = useState(false)
  const consoleRef = useRef(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight
    }
  }, [activeTab])

  const statusBar = scanDetail.statusBar

  return (
    <div className={`flex h-screen overflow-hidden ${isDark ? 'bg-[#111213]' : 'bg-[#f5f6f7]'}`}>
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <div className={`flex items-center justify-between px-6 py-3.5 border-b flex-shrink-0
          ${isDark ? 'bg-[#111213] border-[#1f2123]' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center gap-2 text-sm">
            <span className={`font-600 ${isDark ? 'text-white' : 'text-gray-900'}`}>Scan</span>
            <ChevronRight size={14} strokeWidth={1.3} className="text-gray-400" />
            <button onClick={() => onNavigate('dashboard')} className={`hover:underline ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>
              Private Assets
            </button>
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

        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          <div className={`px-6 py-5 border-b flex-shrink-0 ${isDark ? 'border-[#1f2123]' : 'border-gray-100 bg-white'}`}>
            <div className="flex items-start gap-6">
              <CircularProgress progress={scanDetail.progress} />
              <div className="flex-1 min-w-0">
                <StepTracker steps={scanDetail.steps} current={scanDetail.currentStep} />
                <div className={`grid grid-cols-6 gap-x-6 mt-5 pt-4 border-t ${isDark ? 'border-[#1f2123]' : 'border-gray-100'}`}>
                  {[
                    { label: 'Scan Type', value: scanDetail.type },
                    { label: 'Targets', value: scanDetail.targets },
                    { label: 'Started At', value: scanDetail.startedAt },
                    { label: 'Credentials', value: scanDetail.credentials },
                    { label: 'Files', value: scanDetail.files },
                    { label: 'Checklists', value: scanDetail.checklists, accent: true },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className={`text-[11px] font-500 mb-1 ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>{item.label}</div>
                      <div className={`text-sm font-600 ${item.accent ? 'text-[#0CC8A8]' : isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden min-h-0">
            <div className={`flex flex-col flex-1 min-w-0 border-r overflow-hidden
              ${isDark ? 'border-[#1f2123]' : 'border-gray-100'}`}>
              <div className={`flex items-center justify-between px-5 py-3 border-b flex-shrink-0
                ${isDark ? 'border-[#1f2123] bg-[#111213]' : 'border-gray-100 bg-white'}`}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0CC8A8] animate-pulse-dot" />
                  <span className={`text-sm font-600 ${isDark ? 'text-white' : 'text-gray-900'}`}>Live Scan Console</span>
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-500
                    ${isDark ? 'bg-[#1f2123] text-zinc-400' : 'bg-gray-100 text-gray-500'}`}>
                    <Loader2 size={10} strokeWidth={2} className="animate-spin opacity-60" />
                    Running...
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setConsoleCollapsed(c => !c)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all
                      ${isDark ? 'text-zinc-500 hover:bg-white/5' : 'text-gray-400 hover:bg-gray-100'}`}
                  >
                    {consoleCollapsed
                      ? <ChevronDown size={14} strokeWidth={1.5} />
                      : <ChevronUp size={14} strokeWidth={1.5} />
                    }
                  </button>
                  <button className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all
                    ${isDark ? 'text-zinc-500 hover:bg-white/5' : 'text-gray-400 hover:bg-gray-100'}`}>
                    <X size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {!consoleCollapsed && (
                <>
                  <div className={`flex border-b flex-shrink-0 ${isDark ? 'border-[#1f2123]' : 'border-gray-100'}`}>
                    {['Activity Log', 'Verification Loops'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2.5 text-[13px] font-500 border-b-2 transition-all
                          ${activeTab === tab
                            ? 'border-[#0CC8A8] text-[#0CC8A8]'
                            : `border-transparent ${isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-gray-400 hover:text-gray-600'}`
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div
                    ref={consoleRef}
                    className={`flex-1 overflow-y-auto p-5 ${isDark ? 'bg-[#0e0f10]' : 'bg-gray-50'}`}
                  >
                    {activeTab === 'Activity Log' && activityLog.map((entry, i) => (
                      <LogLine key={i} entry={entry} />
                    ))}
                    {activeTab === 'Verification Loops' && verificationLoops.map((entry, i) => (
                      <div key={i} className="mb-3">
                        <span className={`console-text ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>[{entry.time}] </span>
                        <span className={`console-text ${isDark ? 'text-zinc-300' : 'text-gray-600'}`}>{entry.text} </span>
                        <span className={`console-text text-xs px-1.5 py-0.5 rounded font-600
                          ${entry.status === 'confirmed'
                            ? 'text-green-500 bg-green-400/10'
                            : 'text-amber-400 bg-amber-400/10'}`}>
                          {entry.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className={`w-80 flex-shrink-0 flex flex-col overflow-hidden ${isDark ? 'bg-[#111213]' : 'bg-[#f5f6f7]'}`}>
              <div className={`px-5 py-3 border-b flex-shrink-0 ${isDark ? 'border-[#1f2123]' : 'border-gray-100 bg-white'}`}>
                <span className={`text-sm font-600 ${isDark ? 'text-white' : 'text-gray-900'}`}>Finding Log</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {findingLog.map(finding => (
                  <FindingCard key={finding.id} finding={finding} />
                ))}
              </div>
            </div>
          </div>

          <div className={`flex items-center gap-6 px-6 py-2.5 border-t flex-shrink-0 text-[12px]
            ${isDark ? 'border-[#1f2123] bg-[#0e0f10]' : 'border-gray-100 bg-white'}`}>
            {[
              { label: 'Sub-Agents', value: statusBar.subAgents },
              { label: 'Parallel Executions', value: statusBar.parallelExecutions },
              { label: 'Operations', value: statusBar.operations },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Dot size={16} className={isDark ? 'text-zinc-600' : 'text-gray-300'} />
                <span className={isDark ? 'text-zinc-500' : 'text-gray-400'}>{item.label}:</span>
                <span className={`font-600 ${isDark ? 'text-zinc-300' : 'text-gray-600'}`}>{item.value}</span>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-4">
              {[
                { label: 'Critical', value: statusBar.critical, color: 'text-red-400' },
                { label: 'High', value: statusBar.high, color: 'text-orange-400' },
                { label: 'Medium', value: statusBar.medium, color: 'text-amber-400' },
                { label: 'Low', value: statusBar.low, color: 'text-green-400' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Dot size={16} className={isDark ? 'text-zinc-600' : 'text-gray-300'} />
                  <span className={isDark ? 'text-zinc-500' : 'text-gray-400'}>{item.label}:</span>
                  <span className={`font-700 ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}