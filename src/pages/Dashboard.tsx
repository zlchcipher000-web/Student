import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js'
import { Link } from 'react-router-dom'
import {
  Wallet,
  CheckCircle,
  Clock,
  Users,
  ChevronRight,
  Info,
  AlertTriangle,
  Calendar,
  Bell,
  Search,
} from 'lucide-react'
import { chartColors, defaultOptions } from '../lib/chartConfig'

const stats = [
  { label: 'Total Earnings', value: '₱12,800', trend: '↑ 16% from last month', icon: Wallet, color: 'bg-indigo-100 text-indigo-600' },
  { label: 'Completed Sessions', value: '28', trend: '↑ 20% from last month', icon: CheckCircle, color: 'bg-green-100 text-green-600' },
  { label: 'Total Hours', value: '56h 30m', trend: '↑ 16% from last month', icon: Clock, color: 'bg-blue-100 text-blue-600' },
  { label: 'Active Students', value: '12', link: 'View all students', icon: Users, color: 'bg-orange-100 text-orange-600' },
]

const upcomingSessions = [
  { name: 'John Dela Cruz', subject: 'Algebra • Grade 10', time: 'Today - 2:00 PM', status: 'Online', avatar: '/avatars/john.jpg', statusColor: 'bg-green-100 text-green-700' },
  { name: 'Ana Reyes', subject: 'Physics • Grade 11', time: 'Today - 5:00 PM', status: 'Online', avatar: '/avatars/ana.jpg', statusColor: 'bg-green-100 text-green-700' },
  { name: 'Mark Joseph Lim', subject: 'Calculus • College', time: 'Tomorrow - 10:00 AM', status: 'In Person', avatar: '/avatars/mark.jpg', statusColor: 'bg-orange-100 text-orange-700' },
  { name: 'Bea Garcia', subject: 'Mathematics • Grade 9', time: 'Jun 4, 2026 - 4:00 PM', status: 'Online', avatar: '/avatars/bea.jpg', statusColor: 'bg-green-100 text-green-700' },
]

const recentActivity = [
  { icon: CheckCircle, color: 'bg-green-100 text-green-600', text: 'Session completed with John Dela Cruz', amount: '+₱700', amountColor: 'text-green-600', date: 'May 31, 2026' },
  { icon: Wallet, color: 'bg-blue-100 text-blue-600', text: 'Payment received', amount: '+₱1,200', amountColor: 'text-green-600', date: 'May 30, 2026' },
  { icon: AlertTriangle, color: 'bg-orange-100 text-orange-600', text: 'Payout request approved', amount: '-₱3,000', amountColor: 'text-red-500', date: 'May 29, 2026' },
  { icon: Users, color: 'bg-purple-100 text-purple-600', text: 'New student enrolled', amount: '+₱2,000', amountColor: 'text-green-600', date: 'May 28, 2026' },
]

const announcements = [
  { icon: Info, color: 'bg-blue-100 text-blue-600', title: 'New Feature: Session recording is now available!', date: 'May 30, 2026' },
  { icon: AlertTriangle, color: 'bg-orange-100 text-orange-600', title: 'System maintenance on June 5, 12:00 AM - 2:00 AM.', date: 'May 28, 2026' },
  { icon: CheckCircle, color: 'bg-green-100 text-green-600', title: 'Reminder: Always complete sessions on time.', date: 'May 25, 2026' },
]

export default function Dashboard() {
  const earningsChartRef = useRef<HTMLCanvasElement>(null)
  const tuitionChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let earningsChart: Chart | null = null
    let tuitionChart: Chart | null = null

    if (earningsChartRef.current) {
      const ctx = earningsChartRef.current.getContext('2d')
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 300)
        gradient.addColorStop(0, 'rgba(79, 70, 229, 0.2)')
        gradient.addColorStop(1, 'rgba(79, 70, 229, 0)')

        earningsChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['May 1', 'May 8', 'May 15', 'May 22', 'May 29', 'Jun 2'],
            datasets: [{
              data: [0, 2000, 4500, 7000, 10000, 12800],
              borderColor: chartColors.blue,
              backgroundColor: gradient,
              borderWidth: 2,
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#FFFFFF',
              pointBorderColor: chartColors.blue,
              pointBorderWidth: 2,
              pointRadius: 4,
            }],
          },
          options: {
            ...defaultOptions,
            plugins: {
              ...defaultOptions.plugins,
              tooltip: {
                backgroundColor: '#0B1120',
                padding: 10,
                cornerRadius: 8,
                callbacks: {
                  label: (ctx) => `₱${(ctx.parsed.y ?? 0).toLocaleString()}`,
                },
              },
            },
            scales: {
              ...defaultOptions.scales,
              y: {
                ...defaultOptions.scales.y,
                ticks: {
                  ...defaultOptions.scales.y.ticks,
                  callback: (val) => `₱${Number(val).toLocaleString()}`,
                },
              },
            },
          },
        })
      }
    }

    if (tuitionChartRef.current) {
      const ctx = tuitionChartRef.current.getContext('2d')
      if (ctx) {
        tuitionChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Paid', 'Remaining'],
            datasets: [{
              data: [62, 38],
              backgroundColor: [chartColors.blue, chartColors.gray],
              borderWidth: 0,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
            },
          },
        })
      }
    }

    return () => {
      earningsChart?.destroy()
      tuitionChart?.destroy()
    }
  }, [])

  return (
    <div>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Calendar className="w-4 h-4" />
            <span>June 2, 2026</span>
          </div>
          <button className="relative p-2 rounded-lg hover:bg-white transition-default">
            <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent-red)] rounded-full" />
          </button>
          <button className="p-2 rounded-lg hover:bg-white transition-default">
            <Search className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>
      </div>

      {/* Greeting */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Good morning, Maria! 👋</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Here's what's happening with your tutoring.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-default">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs text-[var(--text-secondary)]">{stat.label}</span>
              </div>
              <p className="text-xl font-bold text-[var(--text-primary)]">{stat.value}</p>
              {stat.trend && (
                <p className="text-xs text-[var(--accent-green)] mt-1">{stat.trend}</p>
              )}
              {stat.link && (
                <Link to="/students" className="text-xs text-[var(--accent-blue)] mt-1 inline-block">{stat.link}</Link>
              )}
            </div>
          )
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Upcoming Sessions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Upcoming Sessions</h3>
            <Link to="/sessions" className="text-xs text-[var(--accent-blue)]">View all</Link>
          </div>
          <div className="space-y-2">
            {upcomingSessions.map((session) => (
              <div key={session.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--accent-light-blue)] transition-default">
                <img src={session.avatar} alt={session.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{session.name}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{session.subject}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-[var(--text-secondary)]">{session.time}</p>
                  <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full mt-1 ${session.statusColor}`}>
                    {session.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Earnings Overview */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Earnings Overview</h3>
              <button className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                This Month <ChevronRight className="w-3 h-3 rotate-90" />
              </button>
            </div>
            <div className="h-48">
              <canvas ref={earningsChartRef} />
            </div>
          </div>

          {/* Tuition Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Tuition Progress</h3>
              <span className="text-xs text-[var(--text-secondary)]">School Year 2025 - 2026</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative w-40 h-40 flex-shrink-0">
                <canvas ref={tuitionChartRef} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-[var(--text-primary)]">62%</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Tuition Goal</span>
                  <span className="font-medium">₱27,800</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Paid to Date</span>
                  <span className="font-medium">₱17,200</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Remaining</span>
                  <span className="font-bold">₱17,200</span>
                </div>
                <Link to="/tuition" className="text-xs text-[var(--accent-blue)]">View Details</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Recent Activity</h3>
            <button className="text-xs text-[var(--accent-blue)]">View all</button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--text-primary)] truncate">{item.text}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-sm font-semibold ${item.amountColor}`}>{item.amount}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{item.date}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Announcements</h3>
          <div className="space-y-3">
            {announcements.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-default cursor-pointer">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{item.title}</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{item.date}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--text-secondary)] flex-shrink-0 mt-1" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
