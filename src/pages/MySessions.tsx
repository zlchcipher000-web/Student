import { useState } from 'react'
import { Search, SlidersHorizontal, Bell } from 'lucide-react'

const tabs = ['Upcoming', 'Completed', 'Cancelled']

const sessionsData = {
  Upcoming: [
    { name: 'John Dela Cruz', subject: 'Algebra', grade: 'Grade 10', time: '2:00 PM', duration: '2h', date: 'Today', status: 'Online', avatar: '/avatars/john.jpg', statusColor: 'bg-green-100 text-green-700' },
    { name: 'Ana Reyes', subject: 'Physics', grade: 'Grade 11', time: '5:00 PM', duration: '1.5h', date: 'Today', status: 'Online', avatar: '/avatars/ana.jpg', statusColor: 'bg-green-100 text-green-700' },
    { name: 'Mark Joseph Lim', subject: 'Calculus', grade: 'College', time: '10:00 AM', duration: '1.5h', date: 'Tomorrow', status: 'In Person', avatar: '/avatars/mark.jpg', statusColor: 'bg-orange-100 text-orange-700' },
    { name: 'Bea Garcia', subject: 'Mathematics', grade: 'Grade 9', time: '4:00 PM', duration: '1.5h', date: 'Jun 4, 2026', status: 'Online', avatar: '/avatars/bea.jpg', statusColor: 'bg-green-100 text-green-700' },
  ],
  Completed: [
    { name: 'John Dela Cruz', subject: 'Algebra', grade: 'Grade 10', time: '2:00 PM', duration: '2h', date: 'May 31, 2026', status: 'Completed', avatar: '/avatars/john.jpg', statusColor: 'bg-blue-100 text-blue-700' },
    { name: 'Ana Reyes', subject: 'Physics', grade: 'Grade 11', time: '5:00 PM', duration: '1.5h', date: 'May 30, 2026', status: 'Completed', avatar: '/avatars/ana.jpg', statusColor: 'bg-blue-100 text-blue-700' },
    { name: 'Mark Joseph Lim', subject: 'Calculus', grade: 'College', time: '10:00 AM', duration: '1h', date: 'May 29, 2026', status: 'Completed', avatar: '/avatars/mark.jpg', statusColor: 'bg-blue-100 text-blue-700' },
    { name: 'Bea Garcia', subject: 'Mathematics', grade: 'Grade 9', time: '4:00 PM', duration: '1.5h', date: 'May 28, 2026', status: 'Completed', avatar: '/avatars/bea.jpg', statusColor: 'bg-blue-100 text-blue-700' },
  ],
  Cancelled: [
    { name: 'John Dela Cruz', subject: 'Algebra', grade: 'Grade 10', time: '2:00 PM', duration: '2h', date: 'May 25, 2026', status: 'Cancelled', avatar: '/avatars/john.jpg', statusColor: 'bg-red-100 text-red-700' },
  ],
}

export default function MySessions() {
  const [activeTab, setActiveTab] = useState('Upcoming')

  return (
    <div>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">My Sessions</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">View and manage your tutoring sessions.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search sessions..."
              className="h-10 pl-9 pr-4 border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent-blue)] w-56"
            />
          </div>
          <button className="h-10 px-4 border border-[var(--border-color)] rounded-lg text-sm flex items-center gap-2 hover:bg-white transition-default">
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
          <button className="relative p-2 rounded-lg hover:bg-white transition-default">
            <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent-red)] rounded-full" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--border-color)] mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium transition-default ${
              activeTab === tab
                ? 'text-[var(--text-primary)] border-b-2 border-[var(--accent-blue)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Session List */}
      <div className="space-y-4">
        {sessionsData[activeTab as keyof typeof sessionsData]?.map((session, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-default">
            <img src={session.avatar} alt={session.name} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-[var(--text-primary)]">{session.name}</p>
              <p className="text-sm text-[var(--text-secondary)]">{session.subject} • {session.grade}</p>
            </div>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${session.statusColor}`}>
              {session.status}
            </span>
            <div className="flex items-center gap-2">
              {session.status === 'Online' && activeTab === 'Upcoming' && (
                <button className="px-4 py-2 bg-[var(--accent-blue)] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-default">
                  Join Session
                </button>
              )}
              <button className="px-4 py-2 text-[var(--accent-blue)] text-sm font-medium rounded-lg hover:bg-[var(--accent-light-blue)] transition-default">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Session Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mt-8 flex justify-around">
        {[
          { value: '28', label: 'Completed Sessions' },
          { value: '56h 30m', label: 'Total Hours' },
          { value: '₱12,800', label: 'Total Earnings' },
          { value: '★ 4.9', label: 'Avg. Rating' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
