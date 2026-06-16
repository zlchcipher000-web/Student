import { useState } from 'react'
import { User, Bell, Lock, Shield, CreditCard } from 'lucide-react'

const settingsNav = [
  { id: 'account', icon: User, label: 'Account Settings' },
  { id: 'notifications', icon: Bell, label: 'Notification Settings' },
  { id: 'privacy', icon: Lock, label: 'Privacy Settings' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'payment', icon: CreditCard, label: 'Payment Methods' },
]

const toggles = [
  { label: 'Session Reminders', description: '30 minutes before session', enabled: true },
  { label: 'Email Notifications', description: '', enabled: true },
  { label: 'SMS Notifications', description: '', enabled: false },
]

const notifToggles = [
  { label: 'New Session Request', enabled: true },
  { label: 'Session Cancellation', enabled: true },
  { label: 'Payment Received', enabled: true },
  { label: 'Payout Status Updates', enabled: true },
  { label: 'System Announcements', enabled: true },
  { label: 'Marketing Emails', enabled: false },
]

function ToggleSwitch({ enabled, onChange }: { enabled: boolean; onChange?: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-default ${
        enabled ? 'bg-[var(--accent-blue)]' : 'bg-[var(--border-color)]'
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-default ${
          enabled ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  )
}

export default function Settings() {
  const [activePanel, setActivePanel] = useState('account')
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    'Session Reminders': true,
    'Email Notifications': true,
    'SMS Notifications': false,
    'New Session Request': true,
    'Session Cancellation': true,
    'Payment Received': true,
    'Payout Status Updates': true,
    'System Announcements': true,
    'Marketing Emails': false,
    'Profile Visibility': true,
    'Show Earnings': false,
  })

  const handleToggle = (label: string) => {
    setToggleStates(prev => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Settings</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Manage your account and preferences.</p>
      </div>

      <div className="grid grid-cols-[240px_1fr] gap-8">
        {/* Settings Navigation */}
        <div className="bg-white rounded-2xl p-4 shadow-sm h-fit">
          {settingsNav.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActivePanel(item.id)}
                className={`flex items-center gap-3 w-full h-10 px-3 rounded-lg text-sm font-medium transition-default ${
                  activePanel === item.id
                    ? 'bg-[#F1F5F9] text-[var(--text-primary)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:bg-[#F8FAFC]'
                }`}
              >
                <Icon className="w-[18px] h-[18px]" />
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Settings Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {activePanel === 'account' && (
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-6">Account Settings</h3>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-[var(--text-primary)] block mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="maria.santos@edu.edu.ph"
                    className="w-full h-10 px-3 border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent-blue)]"
                  />
                  <p className="text-xs text-[var(--text-secondary)] mt-1">This email will be used for notifications.</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--text-primary)] block mb-2">Password</label>
                  <input
                    type="password"
                    defaultValue="********"
                    className="w-full h-10 px-3 border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent-blue)]"
                  />
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Last changed 30 days ago. <button className="text-[var(--accent-blue)]">Change Password</button>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[var(--text-primary)] block mb-2">Language</label>
                    <select className="w-full h-10 px-3 border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent-blue)] bg-white">
                      <option>English</option>
                      <option>Filipino</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[var(--text-primary)] block mb-2">Timezone</label>
                    <select className="w-full h-10 px-3 border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent-blue)] bg-white">
                      <option>(GMT+08:00) Asia/Manila</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
                {toggles.map((toggle) => (
                  <div key={toggle.label} className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{toggle.label}</p>
                      {toggle.description && <p className="text-xs text-[var(--text-secondary)]">{toggle.description}</p>}
                    </div>
                    <ToggleSwitch
                      enabled={toggleStates[toggle.label] ?? toggle.enabled}
                      onChange={() => handleToggle(toggle.label)}
                    />
                  </div>
                ))}
              </div>

              <button className="mt-6 px-6 py-3 bg-[var(--accent-blue)] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-default">
                Save Changes
              </button>
            </div>
          )}

          {activePanel === 'notifications' && (
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-6">Notification Settings</h3>
              <div className="space-y-4">
                {notifToggles.map((toggle) => (
                  <div key={toggle.label} className="flex items-center justify-between py-3">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{toggle.label}</p>
                    <ToggleSwitch
                      enabled={toggleStates[toggle.label] ?? toggle.enabled}
                      onChange={() => handleToggle(toggle.label)}
                    />
                  </div>
                ))}
              </div>
              <button className="mt-6 px-6 py-3 bg-[var(--accent-blue)] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-default">
                Save Changes
              </button>
            </div>
          )}

          {activePanel === 'privacy' && (
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-6">Privacy Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Profile Visibility</p>
                    <p className="text-xs text-[var(--text-secondary)]">Make your profile visible to other tutors</p>
                  </div>
                  <ToggleSwitch
                    enabled={toggleStates['Profile Visibility'] ?? true}
                    onChange={() => handleToggle('Profile Visibility')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Show Earnings on Profile</p>
                    <p className="text-xs text-[var(--text-secondary)]">Display your earnings publicly</p>
                  </div>
                  <ToggleSwitch
                    enabled={toggleStates['Show Earnings'] ?? false}
                    onChange={() => handleToggle('Show Earnings')}
                  />
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-[var(--border-color)] space-y-4">
                <button className="w-full py-3 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-gray-50 transition-default">
                  Download My Data
                </button>
                <button className="w-full py-3 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-default">
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {activePanel === 'security' && (
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-6">Security</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-[var(--border-color)] rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Two-Factor Authentication</p>
                    <p className="text-xs text-[var(--text-secondary)]">Add an extra layer of security</p>
                  </div>
                  <button className="px-4 py-2 bg-[var(--accent-blue)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-default">
                    Set Up
                  </button>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-3">Login History</p>
                  <div className="space-y-2">
                    {[
                      { device: 'Chrome on Windows', location: 'La Trinidad, PH', date: 'Jun 2, 2026', status: 'Current' },
                      { device: 'Safari on iPhone', location: 'Baguio City, PH', date: 'May 30, 2026', status: '' },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
                        <div>
                          <p className="text-sm text-[var(--text-primary)]">{session.device}</p>
                          <p className="text-xs text-[var(--text-secondary)]">{session.location} • {session.date}</p>
                        </div>
                        {session.status ? (
                          <span className="text-xs text-[var(--accent-green)] font-medium">{session.status}</span>
                        ) : (
                          <button className="text-xs text-[var(--accent-red)] hover:underline">Revoke</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePanel === 'payment' && (
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-6">Payment Methods</h3>
              <div className="space-y-3">
                {[
                  { name: 'GCash', account: '0917 345 6789', badge: 'Primary', badgeColor: 'bg-blue-100 text-blue-700', icon: 'G' },
                  { name: 'BDO Bank', account: '**** 1234', badge: 'Verified', badgeColor: 'bg-green-100 text-green-700', icon: 'B' },
                ].map((method) => (
                  <div key={method.name} className="flex items-center gap-3 p-4 border border-[var(--border-color)] rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent-light-blue)] flex items-center justify-center text-[var(--accent-blue)] font-bold text-sm">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{method.name}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{method.account}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${method.badgeColor}`}>{method.badge}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-3 border border-dashed border-[var(--border-color)] rounded-lg text-sm text-[var(--accent-blue)] hover:bg-[var(--accent-light-blue)] transition-default">
                + Add New Method
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
