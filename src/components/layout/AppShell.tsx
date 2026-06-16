import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function AppShell() {
  return (
    <div className="flex min-h-screen bg-[var(--bg-body)]">
      <Sidebar />
      <main className="flex-1 ml-[260px] min-h-screen">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
