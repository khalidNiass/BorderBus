/**
 * Helper Functions for the Bus Booking Company Dashboard
 */

/**
 * Format date to readable format
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format time to 12-hour format
 */
export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (10 digits)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\d{10}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

/**
 * Generate unique ID
 */
export const generateId = (prefix = 'ID') => {
  return `${prefix}${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

/**
 * Parse currency string to number
 */
export const parseCurrency = (currencyString) => {
  return parseInt(currencyString.replace(/[^\d]/g, ''))
}

/**
 * Format number to currency
 */
export const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`
}

/**
 * Get status badge color
 */
export const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
    case 'Confirmed':
      return 'bg-green-100 text-green-800'
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'Inactive':
    case 'Cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

/**
 * Calculate booking revenue from bookings array
 */
export const calculateRevenue = (bookings) => {
  return bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((total, booking) => {
      const amount = parseCurrency(booking.totalAmount)
      return total + amount
    }, 0)
}

/**
 * Get current date in YYYY-MM-DD format
 */
export const getTodayDate = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

/**
 * Check if date is today
 */
export const isToday = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

/**
 * Check if date is in past
 */
export const isPastDate = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()
  return date < today
}

/**
 * Check if date is future
 */
export const isFutureDate = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()
  return date > today
}

/**
 * Sort array of objects by property
 */
export const sortBy = (array, property, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (a[property] < b[property]) return order === 'asc' ? -1 : 1
    if (a[property] > b[property]) return order === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Filter array by multiple conditions
 */
export const filterBy = (array, conditions) => {
  return array.filter((item) => {
    return Object.keys(conditions).every((key) => {
      if (typeof conditions[key] === 'function') {
        return conditions[key](item[key])
      }
      return item[key] === conditions[key]
    })
  })
}

/**
 * Search in array
 */
export const searchArray = (array, query, searchFields = []) => {
  const lowerQuery = query.toLowerCase()
  return array.filter((item) => {
    return searchFields.some((field) => {
      const value = item[field]?.toString().toLowerCase()
      return value?.includes(lowerQuery)
    })
  })
}

/**
 * Group array by property
 */
export const groupBy = (array, property) => {
  return array.reduce((grouped, item) => {
    const key = item[property]
    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(item)
    return grouped
  }, {})
}

/**
 * Get count statistics
 */
export const getCountStats = (array, property) => {
  const grouped = groupBy(array, property)
  return Object.keys(grouped).map((key) => ({
    name: key,
    count: grouped[key].length,
  }))
}
