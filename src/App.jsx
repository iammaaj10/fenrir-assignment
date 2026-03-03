import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ScanDetailPage from './pages/ScanDetailPage'

export default function App() {
  const [page, setPage] = useState('login')

  const navigate = (target) => setPage(target)

  return (
    <ThemeProvider>
      {page === 'login' && <LoginPage onLogin={() => navigate('dashboard')} />}
      {page === 'dashboard' && <DashboardPage onNavigate={navigate} />}
      {page === 'scan-detail' && <ScanDetailPage onNavigate={navigate} />}
    </ThemeProvider>
  )
}