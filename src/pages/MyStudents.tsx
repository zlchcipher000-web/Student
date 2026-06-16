import { Search, SlidersHorizontal, Bell } from 'lucide-react'
import { useState } from 'react'

const students = [
  { name: 'John Dela Cruz', grade: 'Grade 10', sessions: 8, nextSession: 'Today 2:00 PM', subject: 'Algebra', progress: 85, avatar: '/avatars/john.jpg' },
  { name: 'Ana Reyes', grade: 'Grade 11', sessions: 6, nextSession: 'Today 5:00 PM', subject: 'Physics', progress: 70, avatar: '/avatars/ana.jpg' },
  { name: 'Mark Joseph Lim', grade: 'College', sessions: 10, nextSession: 'Tomorrow 10:00 AM', subject: 'Calculus', progress: 90, avatar: '/avatars/mark.jpg' },
  { name: 'Bea Garcia', grade: 'Grade 9', sessions: 4, nextSession: 'Jun 4 4:00 PM', subject: 'Mathematics', progress: 60, avatar: '/avatars/bea.jpg' },
]

const performanceData = [
  { label: 'Excellent', count: 2, color: 'bg-green-500' },
  { label: 'Good', count: 1, color: 'bg-blue-500' },
  { label: 'Needs Improvement', count: 1, color: 'bg-red-500' },
]

export default function MyStudents() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">My Students</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Manage and view your students.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 pl-9 pr-4 border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent-blue)] w-56"
            />
          </div>
          <button className="h-10 px-4 border border-[var(--border-color)] bg-white rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50 transition-default">
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
          <button className="h-10 px-4 bg-[var(--accent-blue)] text-white rounded-lg text-sm font-medium flex items-center gap-1 hover:opacity-90 transition-default">
            + Add Student
          </button>
          <button className="relative p-2 rounded-lg hover:bg-white transition-default">
            <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent-red)] rounded-full" />
          </button>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[3fr_1fr_2fr_2fr_2fr] gap-4 px-6 py-3 bg-[#F8FAFC] border-b border-[var(--border-color)]">
          <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Name</span>
          <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider text-center">Sessions</span>
          <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Next Session</span>
          <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Subject</span>
          <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Progress</span>
        </div>
        {/* Table Rows */}
        {filteredStudents.map((student) => (
          <div key={student.name} className="grid grid-cols-[3fr_1fr_2fr_2fr_2fr] gap-4 px-6 py-4 border-b border-[var(--border-color)] hover:bg-[#F8FAFC] transition-default items-center">
            <div className="flex items-center gap-3">
              <img src={student.avatar} alt={student.name} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{student.name}</p>
                <p className="text-xs text-[var(--text-secondary)]">{student.grade}</p>
              </div>
            </div>
            <p className="text-sm text-center text-[var(--text-primary)]">{student.sessions}</p>
            <p className="text-sm text-[var(--text-primary)]">{student.nextSession}</p>
            <p className="text-sm text-[var(--text-primary)]">{student.subject}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--accent-blue)] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${student.progress}%` }}
                />
              </div>
              <span className="text-sm font-semibold min-w-[36px]">{student.progress}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Student Performance Overview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Student Performance Overview</h3>
        <div className="flex items-center gap-6 mb-6">
          {[
            { dot: 'bg-green-500', label: 'Excellent (90-100%)' },
            { dot: 'bg-blue-500', label: 'Good (60-79%)' },
            { dot: 'bg-red-500', label: 'Needs Improvement (<60%)' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${item.dot}`} />
              <span className="text-xs text-[var(--text-secondary)]">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-end justify-around h-48 gap-8">
          {performanceData.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 flex-1">
              <span className="text-sm font-bold text-[var(--text-primary)]">{item.count}</span>
              <div
                className={`w-16 ${item.color} rounded-t-md transition-all duration-500 ease-out`}
                style={{ height: `${item.count * 60}px` }}
              />
              <span className="text-xs text-[var(--text-secondary)] text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
