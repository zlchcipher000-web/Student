import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js'
import { Bell, ChevronDown } from 'lucide-react'
import { chartColors, defaultOptions } from '../lib/chartConfig'

const stats = [
  { label: 'Total Earnings', value: '₱12,800', trend: '↑ 16% from last month' },
  { label: 'Session Earnings', value: '₱11,300', trend: '' },
  { label: 'Bonus', value: '₱1,500', trend: '' },
  { label: 'Total Hours', value: '56h 30m', trend: '' },
  { label: 'Completed Sessions', value: '28', trend: '' },
]

const breakdownData = [
  { subject: 'Algebra', amount: '₱4,800', percent: '40%', color: '#4F46E5' },
  { subject: 'Physics', amount: '₱3,600', percent: '30%', color: '#22C55E' },
  { subject: 'Calculus', amount: '₱2,400', percent: '20%', color: '#F59E0B' },
  { subject: 'Mathematics', amount: '₱1,200', percent: '10%', color: '#EF4444' },
]

const recentEarnings = [
  { date: 'Jun 2, 2026', description: 'Session Payment', student: 'John Dela Cruz', session: '2h', amount: '+₱700' },
  { date: 'May 31, 2026', description: 'Session Payment', student: 'Ana Reyes', session: '1.5h', amount: '+₱600' },
  { date: 'May 30, 2026', description: 'Session Payment', student: 'Mark Joseph Lim', session: '1h', amount: '+₱500' },
  { date: 'May 29, 2026', description: 'Session Payment', student: 'Bea Garcia', session: '1.5h', amount: '+₱400' },
  { date: 'May 28, 2026', description: 'Bonus', student: 'System', session: '-', amount: '+₱300' },
]

export default function Earnings() {
  const trendChartRef = useRef<HTMLCanvasElement>(null)
  const breakdownChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let trendChart: Chart | null = null
    let breakdownChart: Chart | null = null

    if (trendChartRef.current) {
      const ctx = trendChartRef.current.getContext('2d')
      if (ctx) {
        trendChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['May 1', 'May 5', 'May 10', 'May 15', 'May 20', 'May 25', 'May 30', 'Jun 2'],
            datasets: [{
              data: [0, 1500, 3200, 4800, 6500, 9000, 11300, 12800],
              borderColor: chartColors.blue,
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.4,
              pointBackgroundColor: chartColors.blue,
              pointBorderColor: '#FFFFFF',
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

    if (breakdownChartRef.current) {
      const ctx = breakdownChartRef.current.getContext('2d')
      if (ctx) {
        breakdownChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: breakdownData.map(d => d.subject),
            datasets: [{
              data: [40, 30, 20, 10],
              backgroundColor: breakdownData.map(d => d.color),
              borderWidth: 0,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#0B1120',
                padding: 10,
                cornerRadius: 8,
              },
            },
          },
        })
      }
    }

    return () => {
      trendChart?.destroy()
      breakdownChart?.destroy()
    }
  }, [])

  return (
    <div>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Earnings</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Track your earnings and tutoring performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 px-3 py-2 border border-[var(--border-color)] bg-white rounded-lg text-sm hover:bg-gray-50 transition-default">
            This Month <ChevronDown className="w-3 h-3" />
          </button>
          <button className="relative p-2 rounded-lg hover:bg-white transition-default">
            <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent-red)] rounded-full" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-default">
            <p className="text-xs text-[var(--text-secondary)] mb-1">{stat.label}</p>
            <p className="text-xl font-bold text-[var(--text-primary)]">{stat.value}</p>
            {stat.trend && <p className="text-xs text-[var(--accent-green)] mt-1">{stat.trend}</p>}
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Earnings Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Earnings Trend</h3>
          <div className="h-56">
            <canvas ref={trendChartRef} />
          </div>
        </div>

        {/* Earnings Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Earnings Breakdown</h3>
          <div className="flex items-center gap-8">
            <div className="relative w-44 h-44 flex-shrink-0">
              <canvas ref={breakdownChartRef} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold">₱12,800</span>
                <span className="text-xs text-[var(--text-secondary)]">Total</span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {breakdownData.map((item) => (
                <div key={item.subject} className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-sm flex-1">{item.subject}</span>
                  <span className="text-sm font-semibold">{item.amount}</span>
                  <span className="text-xs text-[var(--text-secondary)] w-10 text-right">{item.percent}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Earnings Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">Recent Earnings</h3>
          <button className="text-xs text-[var(--accent-blue)]">View All</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-[#F8FAFC]">
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-secondary)] uppercase">Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-secondary)] uppercase">Description</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-secondary)] uppercase">Student</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-secondary)] uppercase">Session</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--text-secondary)] uppercase">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentEarnings.map((item, i) => (
              <tr key={i} className="border-b border-[var(--border-color)] hover:bg-[#F8FAFC] transition-default">
                <td className="px-4 py-4 text-sm">{item.date}</td>
                <td className="px-4 py-4 text-sm">{item.description}</td>
                <td className="px-4 py-4 text-sm">{item.student}</td>
                <td className="px-4 py-4 text-sm">{item.session}</td>
                <td className="px-4 py-4 text-sm font-semibold text-green-600 text-right">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
