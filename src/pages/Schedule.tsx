import { useState } from 'react'
import { ChevronLeft, ChevronRight, Bell } from 'lucide-react'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const dates = [2, 3, 4, 5, 6, 7, 8]
const hours = Array.from({ length: 13 }, (_, i) => i + 8) // 8 AM to 8 PM

const events = [
  { day: 0, start: 10, duration: 1.5, student: 'Mark Joseph Lim', subject: 'Calculus', type: 'In Person', color: 'bg-orange-100 text-orange-700 border-l-[3px] border-orange-500' },
  { day: 1, start: 14, duration: 2, student: 'John Dela Cruz', subject: 'Algebra', type: 'Online', color: 'bg-indigo-100 text-indigo-700 border-l-[3px] border-indigo-500' },
  { day: 2, start: 16, duration: 1.5, student: 'Bea Garcia', subject: 'Mathematics', type: 'Online', color: 'bg-indigo-100 text-indigo-700 border-l-[3px] border-indigo-500' },
  { day: 3, start: 17, duration: 1.5, student: 'Ana Reyes', subject: 'Physics', type: 'Online', color: 'bg-indigo-100 text-indigo-700 border-l-[3px] border-indigo-500' },
]

export default function Schedule() {
  const [view, setView] = useState<'calendar' | 'list'>('calendar')

  return (
    <div>
      {/* Top Bar */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Schedule</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Manage your availability and tutoring schedule.</p>
          <div className="flex items-center gap-0 mt-3">
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 text-sm rounded-l-lg border ${
                view === 'calendar'
                  ? 'bg-[var(--accent-blue)] text-white border-[var(--accent-blue)]'
                  : 'bg-white text-[var(--text-secondary)] border-[var(--border-color)]'
              }`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 text-sm rounded-r-lg border ${
                view === 'list'
                  ? 'bg-[var(--accent-blue)] text-white border-[var(--accent-blue)]'
                  : 'bg-white text-[var(--text-secondary)] border-[var(--border-color)]'
              }`}
            >
              List View
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full border border-[var(--border-color)] flex items-center justify-center hover:bg-white transition-default">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold">June 2 - 8, 2026</span>
            <button className="w-8 h-8 rounded-full border border-[var(--border-color)] flex items-center justify-center hover:bg-white transition-default">
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 text-xs bg-white border border-[var(--border-color)] rounded-lg ml-2">Today</button>
          </div>
          <button className="px-4 py-2 bg-[var(--accent-blue)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-default">
            Set Availability
          </button>
          <button className="relative p-2 rounded-lg hover:bg-white transition-default">
            <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent-red)] rounded-full" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Day Headers */}
        <div className="grid" style={{ gridTemplateColumns: '80px repeat(7, 1fr)' }}>
          <div className="h-14 border-r border-b border-[var(--border-color)] bg-[#F8FAFC]" />
          {days.map((day, i) => (
            <div key={day} className="h-14 border-r border-b border-[var(--border-color)] bg-[#F8FAFC] flex flex-col items-center justify-center">
              <span className="text-xs text-[var(--text-secondary)]">{day}</span>
              <span className={`text-base font-semibold ${i === 0 ? 'w-8 h-8 rounded-full bg-[var(--accent-blue)] text-white flex items-center justify-center' : 'text-[var(--text-primary)]'}`}>
                {dates[i]}
              </span>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="grid relative" style={{ gridTemplateColumns: '80px repeat(7, 1fr)' }}>
          {/* Time Labels */}
          {hours.map((hour) => (
            <div key={hour} className="contents">
              <div className="h-[60px] border-r border-b border-[var(--border-color)] text-xs text-[var(--text-secondary)] text-right pr-2 pt-1">
                {hour <= 12 ? `${hour}:00 ${hour === 12 ? 'PM' : 'AM'}` : `${hour - 12}:00 PM`}
              </div>
              {days.map((_, di) => (
                <div key={di} className="h-[60px] border-r border-b border-[#F1F5F9] relative" />
              ))}
            </div>
          ))}

          {/* Current Time Indicator */}
          <div
            className="absolute left-[80px] right-0 border-t border-[var(--accent-red)] pointer-events-none z-10"
            style={{ top: `${(14 - 8) * 60 + 30}px` }}
          >
            <div className="absolute -left-1 -top-1 w-2 h-2 bg-[var(--accent-red)] rounded-full" />
          </div>

          {/* Event Blocks */}
          {events.map((event, i) => (
            <div
              key={i}
              className={`absolute rounded-md p-2 text-xs font-medium cursor-pointer hover:brightness-95 transition-default ${event.color}`}
              style={{
                left: `${80 + ((event.day + 1) * (100 / 8))}%`,
                top: `${(event.start - 8) * 60}px`,
                width: `${100 / 8 - 0.5}%`,
                height: `${event.duration * 60 - 4}px`,
              }}
            >
              <p className="font-semibold">{event.student}</p>
              <p className="opacity-80">{event.subject}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        {[
          { dot: 'bg-blue-500', label: 'Scheduled' },
          { dot: 'bg-orange-500', label: 'Pending' },
          { dot: 'bg-green-500', label: 'Available' },
          { dot: 'bg-gray-400', label: 'Unavailable' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${item.dot}`} />
            <span className="text-xs text-[var(--text-secondary)]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
