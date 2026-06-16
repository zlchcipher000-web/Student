import { useState } from 'react'
import { Clock, Wallet, CheckCircle, UserPlus, AlertTriangle } from 'lucide-react'

const tabs = ['All', 'Unread', 'Announcements', 'Sessions', 'Payments']

const notifications = [
  { id: 1, icon: Clock, color: 'bg-indigo-100 text-indigo-600', title: 'Session Reminder', description: 'You have a session with John Dela Cruz today at 2:00 PM.', time: '2 minutes ago', category: 'Sessions', unread: true },
  { id: 2, icon: Wallet, color: 'bg-green-100 text-green-600', title: 'Payment Received', description: '₱700 payment for your completed session.', time: '10 minutes ago', category: 'Payments', unread: true },
  { id: 3, icon: CheckCircle, color: 'bg-green-100 text-green-600', title: 'Payout Request Approved', description: 'Your payout request of ₱3,000 has been approved.', time: '1 hour ago', category: 'Payments', unread: false },
  { id: 4, icon: UserPlus, color: 'bg-purple-100 text-purple-600', title: 'New Student Request', description: 'A new student request for a tutor for Mathematics.', time: '3 hours ago', category: 'Sessions', unread: false },
  { id: 5, icon: AlertTriangle, color: 'bg-orange-100 text-orange-600', title: 'System Announcement', description: 'System maintenance on June 5, 12:00 AM - 2:00 AM.', time: '1 day ago', category: 'Announcements', unread: false },
  { id: 6, icon: CheckCircle, color: 'bg-indigo-100 text-indigo-600', title: 'Session Completed', description: 'Your session with Ana Reyes has been completed.', time: '2 days ago', category: 'Sessions', unread: false },
]

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('All')
  const [notifs, setNotifs] = useState(notifications)

  const filteredNotifs = notifs.filter(n => {
    if (activeTab === 'All') return true
    if (activeTab === 'Unread') return n.unread
    return n.category === activeTab
  })

  const markAsRead = (id: number) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n))
  }

  const markAllAsRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, unread: false })))
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Notifications</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Stay updated with important alerts.</p>
        </div>
        <button onClick={markAllAsRead} className="text-sm text-[var(--accent-blue)] hover:underline">
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--border-color)] mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-medium transition-default ${
              activeTab === tab
                ? 'text-[var(--text-primary)] border-b-2 border-[var(--accent-blue)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-2">
        {filteredNotifs.map((notif) => {
          const Icon = notif.icon
          return (
            <div
              key={notif.id}
              className={`flex items-start gap-4 p-4 rounded-2xl transition-default hover:bg-[#F8FAFC] ${
                notif.unread ? 'bg-white' : 'bg-white'
              }`}
            >
              {/* Unread dot */}
              <div className="pt-1.5">
                {notif.unread ? (
                  <div className="w-2 h-2 bg-[var(--accent-blue)] rounded-full" />
                ) : (
                  <div className="w-2 h-2" />
                )}
              </div>
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{notif.title}</p>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">{notif.description}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs text-[var(--text-secondary)]">{notif.time}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{notif.category}</span>
                </div>
              </div>
              {/* Actions */}
              {notif.unread && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  className="text-xs text-[var(--accent-blue)] hover:underline flex-shrink-0 pt-1"
                >
                  Mark as read
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Load More */}
      <div className="text-center mt-6">
        <button className="px-6 py-3 border border-[var(--border-color)] rounded-lg text-sm text-[var(--accent-blue)] hover:bg-white transition-default">
          Load more
        </button>
      </div>
    </div>
  )
}
