import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'
import MySessions from './pages/MySessions'
import MyStudents from './pages/MyStudents'
import Schedule from './pages/Schedule'
import Earnings from './pages/Earnings'
import Payouts from './pages/Payouts'
import TuitionMonitoring from './pages/TuitionMonitoring'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sessions" element={<MySessions />} />
        <Route path="/students" element={<MyStudents />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/payouts" element={<Payouts />} />
        <Route path="/tuition" element={<TuitionMonitoring />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}

export default App
