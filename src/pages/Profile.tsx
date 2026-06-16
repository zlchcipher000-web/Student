import { Bell } from 'lucide-react'

const personalInfo = [
  { label: 'Full Name', value: 'Maria Santos' },
  { label: 'Student ID', value: '20211534' },
  { label: 'Course', value: 'BS Mathematics' },
  { label: 'Year Level', value: '4th Year' },
  { label: 'Email', value: 'maria.santos@edu.edu.ph' },
  { label: 'Phone', value: '0917 345 6789' },
  { label: 'Address', value: 'La Trinidad, Benguet' },
  { label: 'Date of Birth', value: 'March 15, 2002' },
]

const subjects = ['Mathematics', 'Algebra', 'Calculus', 'Statistics']

export default function Profile() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Profile</h1>
        <button className="relative p-2 rounded-lg hover:bg-white transition-default">
          <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent-red)] rounded-full" />
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm flex items-center gap-6 mb-6">
        <img
          src="/avatars/maria.jpg"
          alt="Maria Santos"
          className="w-20 h-20 rounded-full object-cover border-[3px] border-[var(--border-color)]"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Maria Santos</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Student Tutor</p>
          <span className="inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
            Active
          </span>
        </div>
        <button className="px-5 py-2.5 bg-[var(--accent-blue)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-default">
          Edit Profile
        </button>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">Personal Information</h3>
          <button className="text-sm text-[var(--accent-blue)]">Edit</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {personalInfo.map((item) => (
            <div key={item.label}>
              <p className="text-xs text-[var(--text-secondary)] mb-1">{item.label}</p>
              <p className="text-sm font-medium text-[var(--text-primary)]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subjects I Tutor */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Subjects I Tutor</h3>
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <span
              key={subject}
              className="px-4 py-1.5 bg-[var(--accent-light-blue)] text-[var(--accent-blue)] rounded-full text-sm font-medium"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      {/* About Me */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">About Me</h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          I am a 4th year BS Math student who enjoys teaching and helping students understand mathematical concepts in a simple and fun way.
        </p>
        <button className="mt-4 px-6 py-2.5 bg-[var(--accent-blue)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-default">
          Edit Profile
        </button>
      </div>
    </div>
  )
}
