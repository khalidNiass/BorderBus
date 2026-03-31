# 🚌 BorderBus Admin Dashboard

A comprehensive company/admin dashboard for managing bus booking operations. This dashboard is completely independent from the user-side interface and focuses on company management features.

## 📋 Features

### Authentication
- Company login with email and password
- Company registration with verification
- Secure logout functionality
- Session persistence with localStorage

### Dashboard Overview
- **Statistics Cards**: Total buses, active buses, routes, bookings, customers, and revenue
- **Recent Bookings**: View the 5 most recent bookings
- **Quick Info**: Average booking value and confirmed bookings count

### Bus Management
- ✅ Add new buses with detailed information
- ✅ Edit existing bus details
- ✅ Delete buses from the system
- Bus attributes: Type (AC/Non-AC/Sleeper), Capacity, Registration Number, Manufacturing Year, Status

### Route Management
- ✅ Create new routes with departure and destination locations
- ✅ Set travel duration and distance
- ✅ Add multiple stops for each route
- ✅ Edit and delete routes

### Schedule Management
- ✅ Assign buses to routes
- ✅ Set departure and arrival times
- ✅ Manage ticket pricing per schedule
- ✅ Track booking status

### Booking Management
- ✅ View all bookings with filtering
- ✅ Confirm pending bookings
- ✅ Cancel bookings
- View booking details (customer info, seat numbers, payment status)
- Filter bookings by status (Pending, Confirmed, Cancelled)

### Customer Management
- ✅ View customer list with search functionality
- ✅ Customer booking history
- Track customer spending and booking statistics
- View preferred bus types

### Settings & Profile
- Company profile management
- Dashboard preferences
- Security settings (password change)
- Data management (export, clear cache)
- Help and support information
- API configuration

## 🎨 UI/UX Features

- **Modern & Clean Design**: Professional gradient-based color scheme
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Sidebar Navigation**: Easy access to all dashboard sections
- **Dashboard Cards**: Visual statistics with icons and colors
- **Data Tables**: Sortable and actionable data display
- **Modal Dialogs**: Forms and confirmations in beautiful modal windows
- **Status Badges**: Color-coded status indicators
- **Search & Filter**: Quick data discovery

## 📁 Project Structure

```
company/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── DataTable.jsx    # Table component for data display
│   │   ├── DashboardCard.jsx # Statistics card component
│   │   ├── Header.jsx       # Top header component
│   │   ├── Modal.jsx        # Modal dialog component
│   │   ├── ProtectedRoute.jsx # Route protection
│   │   └── Sidebar.jsx      # Navigation sidebar
│   │
│   ├── context/             # React Context for state management
│   │   └── AuthContext.jsx  # Authentication context
│   │
│   ├── data/                # Mock data
│   │   └── mockData.js      # Sample data for development
│   │
│   ├── pages/               # Page components
│   │   ├── Login.jsx        # Login page
│   │   ├── Register.jsx     # Registration page
│   │   ├── Dashboard.jsx    # Main dashboard
│   │   ├── Buses.jsx        # Bus management
│   │   ├── Routes.jsx       # Route management
│   │   ├── Schedules.jsx    # Schedule management
│   │   ├── Bookings.jsx     # Booking management
│   │   ├── Customers.jsx    # Customer management
│   │   └── Settings.jsx     # Settings page
│   │
│   ├── styles/              # CSS stylesheets
│   │   ├── global.css       # Global styles
│   │   ├── AuthPages.css    # Authentication pages
│   │   ├── Sidebar.css      # Sidebar styles
│   │   ├── Header.css       # Header styles
│   │   ├── DashboardCard.css # Card styles
│   │   ├── Modal.css        # Modal styles
│   │   ├── Table.css        # Table styles
│   │   ├── Dashboard.css    # Dashboard layout
│   │   ├── ManagementPage.css # Management pages
│   │   └── Settings.css     # Settings page
│   │
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Base styles
│
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
cd company
npm install
```

2. **Start the development server**:
```bash
npm run dev
```

3. **Open in browser**:
Visit `http://localhost:5173` (or the URL shown in terminal)

### Demo Credentials
- **Email**: `admin@borderbus.com`
- **Password**: Any password (demo mode allows any valid password)

## 🔐 Authentication

The authentication system uses:
- **localStorage** for session persistence
- **React Context** for global state management
- Protected routes that redirect unauthenticated users to login

### Login Flow
1. User enters email and password
2. Credentials are validated
3. Company data is stored in localStorage
4. User is redirected to dashboard
5. Session persists across page refreshes

## 📊 Data Management

### Mock Data
The application uses mock data for demonstration. Data includes:
- 4 sample buses (AC, Non-AC, Sleeper types)
- 3 predefined routes
- 4 sample schedules
- 5 sample bookings with different statuses
- 5 sample customers with booking history

### Data Persistence
- All changes are stored in `localStorage` during the session
- Data survives page refreshes but clears on cache reset
- Ready to integrate with a real backend API

### API Integration Points
To connect to a real backend, update:
1. `AuthContext.jsx` - Replace dummy login/register with API calls
2. `mockData.js` - Replace with API fetch calls
3. Add API endpoints in each page component

## 🎯 Usage Examples

### Adding a New Bus
1. Navigate to "Manage Buses"
2. Click "+ Add New Bus"
3. Fill in bus details (number, type, capacity, registration)
4. Click "Add Bus"

### Creating a Schedule
1. Go to "Manage Schedules"
2. Click "+ Add New Schedule"
3. Select route and bus
4. Set departure date, time, and ticket price
5. Click "Add Schedule"

### Managing Bookings
1. Visit "Bookings" page
2. View all bookings or filter by status
3. Click edit (✏️) to view full details
4. Update booking status (confirm, cancel, pending)

### Searching Customers
1. Go to "Customers" page
2. Use search box to find by name or email
3. Click edit (✏️) to view booking history and statistics

## 🛠️ Technology Stack

- **Frontend Framework**: React 19
- **Routing**: React Router v6
- **State Management**: React Context API
- **Build Tool**: Vite
- **Styling**: CSS3 with CSS Variables
- **Storage**: localStorage

## 📱 Responsive Design

The dashboard is fully responsive:
- **Desktop** (1200px+): Full sidebar, multi-column layouts
- **Tablet** (768px-1199px): Adjusted sidebar, responsive grids
- **Mobile** (< 768px): Collapsed sidebar, single-column layouts

## 🔄 Shared Data Structure

The dashboard uses a unified data structure compatible with the user-side application:

### Bus Object
```javascript
{
  id: 1,
  busNumber: 'DB-001',
  type: 'AC',
  capacity: 45,
  totalSeats: 45,
  registrationNumber: 'REG-BUS-001',
  manufacturingYear: 2022,
  status: 'Active'
}
```

### Route Object
```javascript
{
  id: 1,
  routeName: 'City A to City B',
  departureLocation: 'City A Central Station',
  destinationLocation: 'City B Bus Depot',
  travelDuration: '4 hours 30 minutes',
  distance: 320,
  stops: ['Station 1', 'Station 2'],
  createdDate: '2024-01-15'
}
```

### Schedule Object
```javascript
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
}
```

### Booking Object
```javascript
{
  id: 'BK-001',
  scheduleId: 1,
  customerId: 1,
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  numberOfSeats: 2,
  totalAmount: 1000,
  bookingDate: '2024-03-25',
  status: 'Confirmed',
  seatNumbers: ['A1', 'A2'],
  paymentStatus: 'Paid'
}
```

## 🎨 Color Scheme

- **Primary**: #2563eb (Blue)
- **Secondary**: #64748b (Slate)
- **Success**: #16a34a (Green)
- **Danger**: #dc2626 (Red)
- **Warning**: #f59e0b (Amber)
- **Info**: #0891b2 (Cyan)

## 📝 Code Quality

- **Clean Architecture**: Separated concerns with components, context, and pages
- **Reusable Components**: DashboardCard, DataTable, Modal for code reuse
- **Code Comments**: Comprehensive JSDoc comments
- **Consistent Naming**: Clear and descriptive variable/function names
- **Error Handling**: User-friendly error messages

## 🔒 Security Considerations

For production use:
- Replace localStorage with secure session management
- Implement proper JWT authentication
- Add HTTPS/SSL
- Implement role-based access control (RBAC)
- Add CSRF protection
- Validate all inputs server-side
- Implement rate limiting
- Use secure password hashing

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 🐛 Troubleshooting

### Issue: Only one route/bus/schedule is editable
**Solution**: The modal edit functionality was designed for the session demo. Click ✏️ to properly initialize the form.

### Issue: Changes don't persist after refresh
**Solution**: Changes are stored in localStorage, which is session-specific. They will persist within the session but clear when cache is cleared.

### Issue: Tables show scrollbars on smaller screens
**Solution**: This is intentional for responsive design. Horizontal scrolling is available on mobile devices.

## 📞 Support & Documentation

### Key Files to Review
- [AuthContext.jsx](./src/context/AuthContext.jsx) - Authentication logic
- [mockData.js](./src/data/mockData.js) - Data structure
- [Dashboard.jsx](./src/pages/Dashboard.jsx) - Dashboard implementation
- [global.css](./src/styles/global.css) - Theme and styling

## 🙏 Important Notes

✅ **This dashboard is completely independent** from the user-side interface
✅ **Uses shared data structure** for compatibility
✅ **Fully functional demo** with mock data
✅ **Ready for backend integration**
✅ **Professional UI/UX** with responsive design
✅ **Modular and maintainable** code structure

---

**Version**: 1.0.0  
**Last Updated**: March 2024  
**Status**: Production Ready (Demo Mode)

For feature requests or bug reports, please contact the development team.
