import React from 'react'

/**
 * StatCard Component
 * Displays statistics on the dashboard
 */
const StatCard = ({ title, value, icon, color = 'blue' }) => {
  const colorClasses = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      border: 'border-blue-200',
      text: 'text-blue-600',
      icon: 'text-blue-400',
      accent: 'from-blue-500 to-blue-600'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-50 to-green-100',
      border: 'border-green-200',
      text: 'text-green-600',
      icon: 'text-green-400',
      accent: 'from-green-500 to-green-600'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      border: 'border-purple-200',
      text: 'text-purple-600',
      icon: 'text-purple-400',
      accent: 'from-purple-500 to-purple-600'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
      border: 'border-orange-200',
      text: 'text-orange-600',
      icon: 'text-orange-400',
      accent: 'from-orange-500 to-orange-600'
    },
  }

  const colors = colorClasses[color]

  return (
    <div
      className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group`}
    >
      {/* Background accent */}
      <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${colors.accent} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className={`${colors.text} text-sm font-semibold uppercase tracking-wide opacity-75`}>
            {title}
          </p>
          <p className="text-4xl font-bold text-slate-800 mt-3 tracking-tight">{value}</p>
        </div>
        <div className={`${colors.icon} text-5xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}>
          {icon}
        </div>
      </div>
      
      {/* Bottom accent bar */}
      <div className={`h-1 w-12 bg-gradient-to-r ${colors.accent} rounded-full mt-4 group-hover:w-20 transition-all duration-300`}></div>
    </div>
  )
}

export default StatCard
