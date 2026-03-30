# 🚌 BorderBus - Company/Admin Dashboard

A modern, responsive Bus Booking Company Dashboard built with React, Vite, and Tailwind CSS. This application allows bus companies to manage their operations including buses, routes, schedules, bookings, and customers.

## Features

### ✅ Authentication
- Company Registration
- Company Login
- Secure logout with confirmation
- Demo credentials for testing

### 📊 Dashboard
- Real-time statistics (Total Buses, Bookings, Routes, Revenue)
- Recent bookings overview
- Quick stats cards
- Responsive layout

### 🚌 Bus Management
- Add new buses
- Edit bus details
- Delete buses with confirmation
- Bus types (AC, Non-AC, Sleeper)
- Track bus capacity and registration numbers
- Status management (Active/Inactive)

### 🗺️ Route Management
- Add departure and destination locations
- Set travel duration and distance
- Define number of stops
- Create and manage multiple routes
- Status tracking

### ⏰ Schedule Management
- Assign buses to routes
- Set departure and arrival times
- Define dates for travel
- Set ticket prices
- Track available seats
- Schedule status management

### 📋 Booking Management
- View all customer bookings
- Accept pending bookings
- Cancel bookings
- Track booking status (Pending, Confirmed, Cancelled)
- View booking details modal
- Booking statistics dashboard

### 👥 Customer Management
- View customer list
- Track customer booking history
- Monitor total spending
- View customer details
- Customer statistics (total customers, bookings, revenue)

### ⚙️ Settings
- Company profile management
- Update company information
- Address and license details
- Notification preferences
- Data export functionality

## Technology Stack

- **React 19.2.4** - UI Library
- **React Router DOM 6.28.0** - Routing and navigation
- **Vite 8.0.1** - Build tool and dev server
- **Tailwind CSS 4.2.2** - Utility-first CSS framework
- **React Icons 5.0.1** - Icon library

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ProtectedRoute.jsx   # Route protection
│   ├── Sidebar.jsx          # Navigation sidebar
│   ├── StatCard.jsx         # Statistics cards
│   ├── Modal.jsx            # Modal/Dialog component
│   ├── Button.jsx           # Custom button component
│   ├── FormInput.jsx        # Form input component
│   └── Table.jsx            # Data table component
├── pages/               # Page components
│   ├── LoginPage.jsx        # Authentication page
│   ├── Dashboard.jsx        # Main dashboard
│   ├── ManageBuses.jsx      # Bus management
│   ├── ManageRoutes.jsx     # Route management
│   ├── ManageSchedules.jsx  # Schedule management
│   ├── BookingsPage.jsx     # Booking management
│   ├── CustomersPage.jsx    # Customer management
│   └── SettingsPage.jsx     # Settings page
├── utils/               # Utility functions
├── context/             # React context (for future use)
├── App.jsx              # Main app component
├── App.css              # Global styles
├── index.css            # Tailwind CSS imports
└── main.jsx             # Entry point
```

## Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd BorderBus/company/company
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm build
```

5. **Preview production build**
```bash
npm run preview
```

## Demo Credentials

- **Email:** demo@company.com
- **Password:** demo123

You can use these credentials to test the login functionality.

## Usage Guide

### Login
1. Navigate to the login page
2. Choose between Login or Register
3. Enter your credentials
4. Click Login/Register button
5. You'll be redirected to the dashboard

### Managing Buses
1. Click "Manage Buses" in the sidebar
2. Click "Add Bus" button
3. Fill in bus details (name, type, capacity, registration number)
4. Click "Add Bus" to save
5. Edit or delete buses using the action buttons

### Managing Routes
1. Navigate to "Manage Routes"
2. Click "Add Route" to create a new route
3. Enter departure location, destination, distance, and duration
4. Optionally add number of stops
5. Click "Add Route" to save

### Creating Schedules
1. Go to "Manage Schedules"
2. Click "Add Schedule"
3. Select bus and route
4. Set date, departure/arrival times
5. Set ticket price and available seats
6. Click "Add Schedule" to save

### Managing Bookings
1. Navigate to "Bookings"
2. View all booking requests
3. Accept pending bookings with the checkmark button
4. Cancel bookings with the X button
5. Click "View" to see detailed booking information

### Managing Customers
1. Go to "Customers"
2. Browse customer cards with their statistics
3. Click "View Details" to see customer information and booking history
4. Track customer spending and loyalty metrics

### Settings
1. Click "Settings" in the sidebar
2. Click "Edit" to modify company profile
3. Update company information, address, and license details
4. Configure notification preferences
5. Click "Save Changes" to update

## Features Explanation

### Responsive Design
- Mobile-friendly layout with hamburger menu
- Adapts to tablet and desktop screens
- Sidebar collapses on mobile devices
- Touch-friendly buttons and interactions

### Data Management
- Dummy data for demonstration
- Local state management with React hooks
- Data persists during session
- Easy to integrate with backend API

### UI Components
- Modern card-based design
- Smooth animations and transitions
- Color-coded status indicators
- Intuitive form validation
- Modal dialogs for actions

### Security Features
- Protected routes for authenticated users
- Session-based authentication using localStorage
- Logout confirmation dialog
- Input validation on forms

## Customization

### Adding New Features
1. Create new page component in `src/pages/`
2. Add route in `App.jsx`
3. Update sidebar navigation in `src/components/Sidebar.jsx`
4. Create reusable components as needed

### Styling
- All styling uses Tailwind CSS utility classes
- Global styles in `src/App.css`
- Component-specific styling via Tailwind classes
- Easy to customize colors and themes

### Connecting to Backend
1. Replace dummy data with API calls
2. Use fetch or axios for HTTP requests
3. Update state management accordingly
4. Handle loading and error states

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Code splitting with React Router
- Lazy loading of routes
- Optimized CSS with Tailwind
- Efficient re-renders using React best practices
- Responsive images and assets

## Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
npm run dev -- --port 3000
```

### Dependencies Issues
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Development Server Not Starting
Clear Vite cache:
```bash
rm -rf .vite
npm run dev
```

## Future Enhancements

- Real backend API integration
- Database connectivity
- Payment gateway integration
- Email notifications
- SMS alerts
- Advanced reporting and analytics
- Mobile app version
- Real-time updates with WebSocket
- User roles and permissions
- Inventory management
- Driver management
- Staff performance tracking

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please create an issue in the repository or contact the development team.

---

**Note:** This is a demo application using dummy data. To use in production, connect it with a proper backend API and database.
