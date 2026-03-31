export const companies = [
  {
    id: 'atlantic-express',
    name: 'Atlantic Express',
    rating: 4.6,
    ratingCount: 1240,
    joined: 2014,
    tripsCompleted: 48210,
    location: 'Dakar, Senegal',
    phone: '+221 555 0131',
    email: 'support@atlanticexpress.com',
    address: 'Terminal 4, Port Autonome de Dakar, Senegal',
    about:
      'Premium coastal routes with modern coaches, Wi-Fi, and reliable departures across West Africa.',
    routes: 18,
    onTime: 94,
    support: '24/7 Border Support',
    highlights: ['Wi-Fi', 'Snacks', 'USB Charging'],
  },
  {
    id: 'sahel-starline',
    name: 'Sahel Starline',
    rating: 4.2,
    ratingCount: 860,
    joined: 2012,
    tripsCompleted: 39120,
    location: 'Accra, Ghana',
    phone: '+233 555 0182',
    email: 'hello@sahelstarline.com',
    address: 'Main Station, Osu, Accra, Ghana',
    about:
      'Fast intercity connections across the Sahel with budget-friendly fares and frequent departures.',
    routes: 24,
    onTime: 91,
    support: 'Live Chat + Call Center',
    highlights: ['AC', 'Recliner Seats', 'Live Tracking'],
  },
  {
    id: 'borderbus-premium',
    name: 'BorderBus Premium',
    rating: 4.9,
    ratingCount: 2140,
    joined: 2019,
    tripsCompleted: 28440,
    location: 'Dakar, Senegal',
    phone: '+221 555 0199',
    email: 'premium@borderbus.com',
    address: 'BorderBus Lounge, Plateau, Dakar, Senegal',
    about:
      'Flagship BorderBus fleet with priority boarding, extra legroom, and concierge support.',
    routes: 12,
    onTime: 97,
    support: 'Priority Support',
    highlights: ['Priority Boarding', 'Extra Legroom', 'Premium Lounge'],
  },
  {
    id: 'coastal-ride',
    name: 'Coastal Ride',
    rating: 4.0,
    ratingCount: 540,
    joined: 2010,
    tripsCompleted: 33590,
    location: 'Banjul, Gambia',
    phone: '+220 555 0114',
    email: 'contact@coastalride.com',
    address: 'Serrekunda Terminal, Banjul, Gambia',
    about:
      'Reliable everyday routes with flexible schedules for commuters and families.',
    routes: 16,
    onTime: 88,
    support: 'Local Terminal Support',
    highlights: ['Budget Seats', 'Multiple Stops', '24/7 Support'],
  },
]

export const companyReviews = [
  {
    id: 'rv-1',
    name: 'Fatou D.',
    rating: 5,
    comment: 'Clean bus, smooth ride, and on-time arrival.',
  },
  {
    id: 'rv-2',
    name: 'Michael K.',
    rating: 4,
    comment: 'Great support team and comfortable seats.',
  },
  {
    id: 'rv-3',
    name: 'Aisha L.',
    rating: 5,
    comment: 'Loved the premium lounge and quick boarding.',
  },
]

export const recentSearches = [
  { from: 'Dakar', to: 'Banjul', date: '2026-04-03' },
  { from: 'Accra', to: 'Lome', date: '2026-04-05' },
  { from: 'Abidjan', to: 'Bamako', date: '2026-04-09' },
]

export const popularRoutes = [
  { from: 'Dakar', to: 'Bissau', price: 38, duration: '6h 45m' },
  { from: 'Accra', to: 'Cotonou', price: 52, duration: '7h 10m' },
  { from: 'Conakry', to: 'Freetown', price: 28, duration: '4h 35m' },
  { from: 'Abuja', to: 'Calabar', price: 66, duration: '8h 20m' },
]

export const buses = [
  {
    id: 'bb-101',
    companyId: 'atlantic-express',
    company: 'Atlantic Express',
    from: 'Dakar',
    to: 'Banjul',
    depart: '06:30',
    arrive: '11:15',
    duration: '4h 45m',
    price: 32,
    seats: 18,
    rating: 4.6,
    type: 'Luxury',
    amenities: ['Wi-Fi', 'Snacks', 'USB Charging'],
    stops: ['Dakar', 'Thies', 'Kaolack', 'Banjul'],
    images: ['bus-placeholder.svg', 'bus-placeholder.svg', 'bus-placeholder.svg'],
  },
  {
    id: 'bb-102',
    companyId: 'sahel-starline',
    company: 'Sahel Starline',
    from: 'Dakar',
    to: 'Banjul',
    depart: '08:10',
    arrive: '13:05',
    duration: '4h 55m',
    price: 26,
    seats: 24,
    rating: 4.2,
    type: 'AC',
    amenities: ['AC', 'Recliner Seats', 'Live Tracking'],
    stops: ['Dakar', 'Mbour', 'Banjul'],
    images: ['bus-placeholder.svg', 'bus-placeholder.svg', 'bus-placeholder.svg'],
  },
  {
    id: 'bb-103',
    companyId: 'borderbus-premium',
    company: 'BorderBus Premium',
    from: 'Dakar',
    to: 'Banjul',
    depart: '10:45',
    arrive: '15:40',
    duration: '4h 55m',
    price: 29,
    seats: 12,
    rating: 4.9,
    type: 'Luxury',
    amenities: ['Priority Boarding', 'Extra Legroom', 'Premium Lounge'],
    stops: ['Dakar', 'Banjul'],
    images: ['bus-placeholder.svg', 'bus-placeholder.svg', 'bus-placeholder.svg'],
  },
  {
    id: 'bb-104',
    companyId: 'coastal-ride',
    company: 'Coastal Ride',
    from: 'Dakar',
    to: 'Banjul',
    depart: '12:15',
    arrive: '17:25',
    duration: '5h 10m',
    price: 22,
    seats: 30,
    rating: 4.0,
    type: 'Non-AC',
    amenities: ['Budget Seats', 'Multiple Stops', '24/7 Support'],
    stops: ['Dakar', 'Fatick', 'Banjul'],
    images: ['bus-placeholder.svg', 'bus-placeholder.svg', 'bus-placeholder.svg'],
  },
]

export const bookings = [
  {
    id: 'BK-44512',
    from: 'Dakar',
    to: 'Banjul',
    date: '2026-04-03',
    status: 'Upcoming',
  },
  {
    id: 'BK-44090',
    from: 'Accra',
    to: 'Cotonou',
    date: '2026-03-12',
    status: 'Completed',
  },
  {
    id: 'BK-43822',
    from: 'Abidjan',
    to: 'Bamako',
    date: '2026-02-18',
    status: 'Completed',
  },
]

export const notifications = [
  {
    id: 'NT-01',
    title: 'Booking Confirmed',
    description: 'Your seat on Atlantic Express is confirmed for 03 Apr 2026.',
    time: '2h ago',
  },
  {
    id: 'NT-02',
    title: 'Travel Reminder',
    description: 'Remember to arrive 30 minutes before departure.',
    time: 'Yesterday',
  },
  {
    id: 'NT-03',
    title: 'Schedule Update',
    description: 'Sahel Starline now departs at 08:10 for the Dakar route.',
    time: '2 days ago',
  },
]

export const seatMap = Array.from({ length: 40 }, (_, i) => i + 1)

export const bookedSeats = [2, 5, 7, 8, 14, 15, 19, 20, 25, 28, 33, 36]
