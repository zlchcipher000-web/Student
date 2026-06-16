import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js'
import { Bell } from 'lucide-react'

const timelineData = [
  { description: 'Tuition Payment', amount: '₱4,000', date: 'May 30, 2026', status: 'Paid', statusColor: 'bg-green-100 text-green-700', dotColor: 'bg-[var(--accent-blue)]' },
  { description: 'Tuition Payment', amount: '₱4,000', date: 'Apr 30, 2026', status: 'Paid', statusColor: 'bg-green-100 text-green-700', dotColor: 'bg-[var(--accent-blue)]' },
  { description: 'Tuition Payment', amount: '₱4,000', date: 'Mar 30, 2026', status: 'Paid', statusColor: 'bg-green-100 text-green-700', dotColor: 'bg-[var(--accent-blue)]' },
  { description: 'Tuition Payment', amount: '₱4,000', date: 'Feb 28, 2026', status: 'Paid', statusColor: 'bg-green-100 text-green-700', dotColor: 'bg-[var(--accent-blue)]' },
  { description: 'Tuition Payment', amount: '₱1,200', date: 'Jan 30, 2026', status: 'Paid', statusColor: 'bg-green-100 text-green-700', dotColor: 'bg-[var(--accent-blue)]' },
  { description: 'Remaining Balance', amount: '₱10,600', date: 'Due: Dec 30, 2026', status: 'Pending', statusColor: 'bg-orange-100 text-orange-700', dotColor: 'bg-[var(--border-color)] border-2 border-[#CBD5E1]' },
]

const goalDetails = [
  { label: 'School', value: 'Benguet State University' },
  { label: 'School Year', value: '2025 - 2026' },
  { label: 'Program', value: 'BSIT - Bachelor of Science in Information Technology' },
  { label: 'Tuition Per Year', value: '₱45,000' },
]

export default function TuitionMonitoring() {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let chart: Chart | null = null
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Paid', 'Remaining'],
            datasets: [{
              data: [62, 38],
              backgroundColor: ['#4F46E5', '#E2E8F0'],
              borderWidth: 0,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '80%',
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
            },
          },
        })
      }
    }
    return () => { chart?.destroy() }
  }, [])

  return (
    <div>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Tuition Monitoring</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Track your tuition goal and payments.</p>
        </div>
        <button className="relative p-2 rounded-lg hover:bg-white transition-default">
          <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent-red)] rounded-full" />
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Tuition Overview */}
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-6 text-left">Tuition Overview</h3>
          <div className="relative w-52 h-52 mx-auto">
            <canvas ref={chartRef} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-[var(--text-primary)]">62%</span>
              <span className="text-xs text-[var(--text-secondary)]">Paid to Date</span>
            </div>
          </div>
          <div className="flex justify-around mt-6">
            <div className="text-center">
              <p className="text-xs text-[var(--text-secondary)]">Tuition Goal</p>
              <p className="text-lg font-bold text-[var(--text-primary)]">₱27,800</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[var(--text-secondary)]">Paid to Date</p>
              <p className="text-lg font-bold text-[var(--text-primary)]">₱17,200</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[var(--text-secondary)]">Remaining</p>
              <p className="text-lg font-bold text-[var(--text-primary)]">₱10,600</p>
            </div>
          </div>
        </div>

        {/* Payment Timeline */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-6">Payment Timeline</h3>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[22px] top-2 bottom-2 w-0.5 bg-[var(--border-color)]" />
            <div className="space-y-4">
              {timelineData.map((item, i) => (
                <div key={i} className="flex items-center gap-4 relative z-10">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.dotColor}`} />
                  <div className="flex-1 bg-white border border-[var(--border-color)] rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{item.description}</p>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{item.amount}</p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-[var(--text-secondary)]">{item.date}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${item.statusColor}`}>{item.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="text-sm text-[var(--accent-blue)] mt-4">View Full Payment History</button>
        </div>
      </div>

      {/* Goal Details */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Goal Details</h3>
        <div className="grid grid-cols-4 gap-6">
          {goalDetails.map((item) => (
            <div key={item.label}>
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-base font-semibold text-[var(--text-primary)]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
