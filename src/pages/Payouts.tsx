import { useState } from 'react'
import { Bell, ChevronDown, Download } from 'lucide-react'

const tabs = ['Overview', 'Payout History']

const payoutStats = [
  { label: 'Total Payouts', value: '₱24,400', sub: 'All Time' },
  { label: 'This Month', value: '₱3,000', sub: '' },
  { label: 'Pending Requests', value: '₱3,000', sub: '' },
  { label: '', value: '₱2,000', sub: '' },
]

const recentPayouts = [
  { date: 'May 26, 2026', amount: '₱3,000', method: 'GCash', account: '0917 345 6789', status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
  { date: 'May 18, 2026', amount: '₱3,000', method: 'Bank Transfer', account: '**** 1234', status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
  { date: 'Apr 30, 2026', amount: '₱3,000', method: 'GCash', account: '0917 345 6789', status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
  { date: 'Apr 15, 2026', amount: '₱3,000', method: 'Bank Transfer', account: '**** 1234', status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
]

const payoutMethods = [
  { name: 'GCash', account: '0917 345 6789', badge: 'Primary', badgeColor: 'bg-blue-100 text-blue-700', icon: 'G' },
  { name: 'BDO Bank', account: '**** 1234', badge: 'Verified', badgeColor: 'bg-green-100 text-green-700', icon: 'B' },
]

export default function Payouts() {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <div>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Payouts</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Request and track your payouts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 px-3 py-2 border border-[var(--border-color)] bg-white rounded-lg text-sm hover:bg-gray-50 transition-default">
            This Month <ChevronDown className="w-3 h-3" />
          </button>
          <button className="flex items-center gap-1 px-3 py-2 border border-[var(--border-color)] bg-white rounded-lg text-sm hover:bg-gray-50 transition-default">
            <Download className="w-4 h-4" /> Export
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

      {activeTab === 'Overview' && (
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Balance Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-[var(--text-secondary)] mb-2">Available Balance</p>
              <p className="text-3xl font-bold text-[var(--text-primary)] mb-2">₱5,200</p>
              <p className="text-xs text-[var(--text-secondary)] mb-4">You can request a payout of your available balance.</p>
              <button className="w-full py-3 bg-[var(--accent-blue)] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-default">
                Request Payout
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {payoutStats.map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                  <p className="text-xs text-[var(--text-secondary)] mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-[var(--text-primary)]">{stat.value}</p>
                  {stat.sub && <p className="text-xs text-[var(--text-secondary)] mt-1">{stat.sub}</p>}
                </div>
              ))}
            </div>

            {/* Payout Methods */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Payout Methods</h3>
              <div className="space-y-3">
                {payoutMethods.map((method) => (
                  <div key={method.name} className="flex items-center gap-3 p-3 border border-[var(--border-color)] rounded-lg">
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
              <button className="w-full mt-3 py-3 border border-dashed border-[var(--border-color)] rounded-lg text-sm text-[var(--accent-blue)] hover:bg-[var(--accent-light-blue)] transition-default">
                + Add New Method
              </button>
            </div>
          </div>

          {/* Right Column - Recent Payouts */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Recent Payouts</h3>
            <table className="w-full">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-secondary)] uppercase">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-secondary)] uppercase">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-secondary)] uppercase">Method</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-secondary)] uppercase">Account</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-secondary)] uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayouts.map((payout, i) => (
                  <tr key={i} className="border-b border-[var(--border-color)] hover:bg-[#F8FAFC] transition-default">
                    <td className="px-4 py-4 text-sm">{payout.date}</td>
                    <td className="px-4 py-4 text-sm font-semibold">{payout.amount}</td>
                    <td className="px-4 py-4 text-sm">{payout.method}</td>
                    <td className="px-4 py-4 text-xs text-[var(--text-secondary)]">{payout.account}</td>
                    <td className="px-4 py-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${payout.statusColor}`}>{payout.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-[var(--text-secondary)] mt-4">Payouts are processed within 1-3 business days.</p>
          </div>
        </div>
      )}

      {activeTab === 'Payout History' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Payout History</h3>
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8FAFC]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-secondary)] uppercase">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-secondary)] uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-secondary)] uppercase">Method</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-secondary)] uppercase">Account</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-secondary)] uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPayouts.map((payout, i) => (
                <tr key={i} className="border-b border-[var(--border-color)] hover:bg-[#F8FAFC] transition-default">
                  <td className="px-4 py-4 text-sm">{payout.date}</td>
                  <td className="px-4 py-4 text-sm font-semibold">{payout.amount}</td>
                  <td className="px-4 py-4 text-sm">{payout.method}</td>
                  <td className="px-4 py-4 text-xs text-[var(--text-secondary)]">{payout.account}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${payout.statusColor}`}>{payout.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
