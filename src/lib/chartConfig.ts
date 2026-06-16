import { Chart as ChartJS, registerables } from 'chart.js'

ChartJS.register(...registerables)

export const chartColors = {
  blue: '#4F46E5',
  green: '#22C55E',
  orange: '#F59E0B',
  red: '#EF4444',
  purple: '#8B5CF6',
  gray: '#E2E8F0',
  textSecondary: '#475569',
}

export const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: chartColors.textSecondary,
        font: { size: 11 },
      },
    },
    y: {
      grid: {
        color: chartColors.gray,
      },
      ticks: {
        color: chartColors.textSecondary,
        font: { size: 11 },
      },
    },
  },
}
