/**
 * Mock Data for Company Dashboard
 * Contains sample data for buses, routes, schedules, bookings, and customers
 * This data is used until a backend API is implemented
 */

// Initial mock data
export const initialData = {
  // Authentication
  company: {
    id: 1,
    name: 'BorderBus Transport',
    email: 'admin@borderbus.com',
    phone: '+1-234-567-8900',
    address: '123 Main Street, City, Country',
    registrationNumber: 'REG-2024-001'
  },

  // Buses
  buses: [
    {
      id: 1,
      busNumber: 'DB-001',
      type: 'AC',
      capacity: 45,
      totalSeats: 45,
      registrationNumber: 'REG-BUS-001',
      manufacturingYear: 2022,
      status: 'Active'
    },
    {
      id: 2,
      busNumber: 'DB-002',
      type: 'Non-AC',
      capacity: 50,
      totalSeats: 50,
      registrationNumber: 'REG-BUS-002',
      manufacturingYear: 2021,
      status: 'Active'
    },
    {
      id: 3,
      busNumber: 'DB-003',
      type: 'Sleeper',
      capacity: 30,
      totalSeats: 30,
      registrationNumber: 'REG-BUS-003',
      manufacturingYear: 2023,
      status: 'Maintenance'
    },
    {
      id: 4,
      busNumber: 'DB-004',
      type: 'AC',
      capacity: 48,
      totalSeats: 48,
      registrationNumber: 'REG-BUS-004',
      manufacturingYear: 2022,
      status: 'Active'
    }
  ],

  // Routes
  routes: [
    {
      id: 1,
      routeName: 'City A to City B',
      departureLocation: 'City A Central Station',
      destinationLocation: 'City B Bus Depot',
      travelDuration: '4 hours 30 minutes',
      distance: 320,
      stops: ['Station 1', 'Station 2', 'Station 3'],
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      routeName: 'City B to City C',
      departureLocation: 'City B Bus Depot',
      destinationLocation: 'City C Terminal',
      travelDuration: '6 hours',
      distance: 420,
      stops: ['Checkpoint A', 'Checkpoint B'],
      createdDate: '2024-01-16'
    },
    {
      id: 3,
      routeName: 'City A to City C',
      departureLocation: 'City A Central Station',
      destinationLocation: 'City C Terminal',
      travelDuration: '9 hours 15 minutes',
      distance: 640,
      stops: ['City B', 'Station X', 'Station Y'],
      createdDate: '2024-01-17'
    }
  ],

  // Schedules
  schedules: [
    {
      id: 1,
      routeId: 1,
      busId: 1,
      departureDate: '2024-03-31',
      departureTime: '08:00',
      estimatedArrivalTime: '12:30',
      ticketPrice: 500,
      bookedSeats: 35,
      totalSeats: 45,
      status: 'Active'
    },
    {
      id: 2,
      routeId: 1,
      busId: 2,
      departureDate: '2024-04-01',
      departureTime: '14:00',
      estimatedArrivalTime: '18:30',
      ticketPrice: 480,
      bookedSeats: 48,
      totalSeats: 50,
      status: 'Active'
    },
    {
      id: 3,
      routeId: 2,
      busId: 4,
      departureDate: '2024-04-02',
      departureTime: '06:00',
      estimatedArrivalTime: '12:00',
      ticketPrice: 650,
      bookedSeats: 25,
      totalSeats: 48,
      status: 'Active'
    },
    {
      id: 4,
      routeId: 3,
      busId: 1,
      departureDate: '2024-04-03',
      departureTime: '09:30',
      estimatedArrivalTime: '18:45',
      ticketPrice: 799,
      bookedSeats: 40,
      totalSeats: 45,
      status: 'Active'
    }
  ],

  // Bookings
  bookings: [
    {
      id: 'BK-001',
      scheduleId: 1,
      customerId: 1,
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '+1-111-222-3333',
      numberOfSeats: 2,
      totalAmount: 1000,
      bookingDate: '2024-03-25',
      status: 'Confirmed',
      seatNumbers: ['A1', 'A2'],
      paymentStatus: 'Paid'
    },
    {
      id: 'BK-002',
      scheduleId: 1,
      customerId: 2,
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      customerPhone: '+1-222-333-4444',
      numberOfSeats: 1,
      totalAmount: 500,
      bookingDate: '2024-03-26',
      status: 'Pending',
      seatNumbers: ['B5'],
      paymentStatus: 'Pending'
    },
    {
      id: 'BK-003',
      scheduleId: 2,
      customerId: 3,
      customerName: 'Robert Johnson',
      customerEmail: 'robert@example.com',
      customerPhone: '+1-333-444-5555',
      numberOfSeats: 3,
      totalAmount: 1440,
      bookingDate: '2024-03-27',
      status: 'Confirmed',
      seatNumbers: ['C10', 'C11', 'C12'],
      paymentStatus: 'Paid'
    },
    {
      id: 'BK-004',
      scheduleId: 2,
      customerId: 4,
      customerName: 'Sarah Williams',
      customerEmail: 'sarah@example.com',
      customerPhone: '+1-444-555-6666',
      numberOfSeats: 2,
      totalAmount: 960,
      bookingDate: '2024-03-28',
      status: 'Cancelled',
      seatNumbers: ['D15', 'D16'],
      paymentStatus: 'Refunded'
    },
    {
      id: 'BK-005',
      scheduleId: 3,
      customerId: 5,
      customerName: 'Michael Brown',
      customerEmail: 'michael@example.com',
      customerPhone: '+1-555-666-7777',
      numberOfSeats: 1,
      totalAmount: 650,
      bookingDate: '2024-03-29',
      status: 'Confirmed',
      seatNumbers: ['E20'],
      paymentStatus: 'Paid'
    }
  ],

  // Customers
  customers: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1-111-222-3333',
      registrationDate: '2024-01-10',
      totalBookings: 5,
      totalSpent: 3500,
      preferredBusType: 'AC'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1-222-333-4444',
      registrationDate: '2024-02-05',
      totalBookings: 2,
      totalSpent: 1200,
      preferredBusType: 'Non-AC'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '+1-333-444-5555',
      registrationDate: '2024-01-20',
      totalBookings: 8,
      totalSpent: 5400,
      preferredBusType: 'AC'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+1-444-555-6666',
      registrationDate: '2024-02-15',
      totalBookings: 3,
      totalSpent: 1800,
      preferredBusType: 'Sleeper'
    },
    {
      id: 5,
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+1-555-666-7777',
      registrationDate: '2024-03-01',
      totalBookings: 1,
      totalSpent: 650,
      preferredBusType: 'AC'
    }
  ]
};

/**
 * Helper function to calculate dashboard statistics
 * @param {Object} data - The data object containing all information
 * @returns {Object} Dashboard statistics
 */
export const calculateStats = (data) => {
  const confirmedBookings = data.bookings.filter(b => b.status === 'Confirmed');
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const activeBuses = data.buses.filter(b => b.status === 'Active').length;

  return {
    totalBuses: data.buses.length,
    activeBuses: activeBuses,
    totalRoutes: data.routes.length,
    totalBookings: data.bookings.length,
    confirmedBookings: confirmedBookings.length,
    totalRevenue: totalRevenue,
    totalCustomers: data.customers.length
  };
};

/**
 * Helper function to get recent bookings
 * @param {Array} bookings - Array of booking objects
 * @param {number} limit - Number of recent bookings to return
 * @returns {Array} Array of recent bookings
 */
export const getRecentBookings = (bookings, limit = 5) => {
  return bookings
    .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
    .slice(0, limit);
};

/**
 * Helper function to get schedule details with route and bus information
 * @param {Object} schedule - The schedule object
 * @param {Array} routes - Array of route objects
 * @param {Array} buses - Array of bus objects
 * @returns {Object} Enhanced schedule with route and bus details
 */
export const getScheduleDetails = (schedule, routes, buses) => {
  const route = routes.find(r => r.id === schedule.routeId);
  const bus = buses.find(b => b.id === schedule.busId);

  return {
    ...schedule,
    route: route || {},
    bus: bus || {}
  };
};
