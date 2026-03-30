/**
 * Sample/Dummy Data for the Bus Booking Company Dashboard
 * This file contains dummy data used throughout the application
 */

// Sample Buses Data
export const SAMPLE_BUSES = [
  {
    id: 'BUS001',
    name: 'Express 1',
    type: 'AC',
    capacity: 45,
    registrationNo: 'DL01AB1234',
    status: 'Active',
  },
  {
    id: 'BUS002',
    name: 'Sleeper Premium',
    type: 'Sleeper',
    capacity: 32,
    registrationNo: 'DL01AB5678',
    status: 'Active',
  },
  {
    id: 'BUS003',
    name: 'Non-AC Standard',
    type: 'Non-AC',
    capacity: 50,
    registrationNo: 'DL01AB9012',
    status: 'Inactive',
  },
]

// Sample Routes Data
export const SAMPLE_ROUTES = [
  {
    id: 'RT001',
    departure: 'Delhi',
    destination: 'Mumbai',
    distance: '1400 km',
    duration: '18 hours',
    stops: '5',
    status: 'Active',
  },
  {
    id: 'RT002',
    departure: 'Bangalore',
    destination: 'Chennai',
    distance: '350 km',
    duration: '5.5 hours',
    stops: '2',
    status: 'Active',
  },
  {
    id: 'RT003',
    departure: 'Pune',
    destination: 'Goa',
    distance: '470 km',
    duration: '8 hours',
    stops: '3',
    status: 'Active',
  },
]

// Sample Schedules Data
export const SAMPLE_SCHEDULES = [
  {
    id: 'SCH001',
    busId: 'BUS001',
    routeId: 'RT001',
    date: '2026-04-05',
    departureTime: '22:00',
    arrivalTime: '16:00',
    price: '₹1,500',
    seatsAvailable: '35',
    status: 'Active',
  },
  {
    id: 'SCH002',
    busId: 'BUS002',
    routeId: 'RT002',
    date: '2026-04-06',
    departureTime: '08:00',
    arrivalTime: '13:30',
    price: '₹800',
    seatsAvailable: '28',
    status: 'Active',
  },
]

// Sample Bookings Data
export const SAMPLE_BOOKINGS = [
  {
    id: 'BK001',
    customerName: 'Raj Kumar',
    email: 'raj@example.com',
    route: 'Delhi - Mumbai',
    date: '2026-04-05',
    seats: '2',
    totalAmount: '₹3,000',
    status: 'Confirmed',
    bookingDate: '2026-03-30',
  },
  {
    id: 'BK002',
    customerName: 'Priya Singh',
    email: 'priya@example.com',
    route: 'Bangalore - Chennai',
    date: '2026-04-06',
    seats: '1',
    totalAmount: '₹800',
    status: 'Pending',
    bookingDate: '2026-03-29',
  },
]

// Sample Customers Data
export const SAMPLE_CUSTOMERS = [
  {
    id: 'CUST001',
    name: 'Raj Kumar',
    email: 'raj@example.com',
    phone: '+91 98765 43210',
    totalBookings: '5',
    totalSpent: '₹15,000',
    joinDate: '2026-01-15',
    bookings: [
      { id: 'BK001', route: 'Delhi - Mumbai', date: '2026-04-05', status: 'Confirmed' },
      { id: 'BK005', route: 'Delhi - Jaipur', date: '2026-03-20', status: 'Confirmed' },
    ],
  },
  {
    id: 'CUST002',
    name: 'Priya Singh',
    email: 'priya@example.com',
    phone: '+91 98765 43211',
    totalBookings: '3',
    totalSpent: '₹8,500',
    joinDate: '2026-02-10',
    bookings: [
      { id: 'BK002', route: 'Bangalore - Chennai', date: '2026-04-06', status: 'Pending' },
    ],
  },
]

// Bus Types
export const BUS_TYPES = [
  { label: 'AC', value: 'AC' },
  { label: 'Non-AC', value: 'Non-AC' },
  { label: 'Sleeper', value: 'Sleeper' },
]

// Status Options
export const STATUS_OPTIONS = [
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
]

// Booking Status
export const BOOKING_STATUS = [
  { label: 'Pending', value: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { label: 'Confirmed', value: 'Confirmed', color: 'bg-green-100 text-green-800' },
  { label: 'Cancelled', value: 'Cancelled', color: 'bg-red-100 text-red-800' },
]
