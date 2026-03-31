# 🚀 Quick Start Guide - BorderBus Admin Dashboard

## What's Included

Your BorderBus Admin Dashboard comes with:

✅ **Complete Authentication System**
- Login & Registration pages
- Session management with localStorage
- Protected dashboard routes

✅ **Management Pages**
- Dashboard with statistics overview
- Bus management (Add, Edit, Delete)
- Route management with stops
- Schedule assignment with pricing
- Booking management with status control
- Customer management with booking history
- Settings & profile configuration

✅ **Reusable Components**
- DataTable for displaying records
- Modal for forms and dialogs
- DashboardCards for statistics
- Header with company info
- Sidebar navigation

✅ **Sample Data**
- 4 buses with different types
- 3 routes with stops
- 4 active schedules
- 5 bookings with customers
- Full booking history

---

## Quick Setup (2 minutes)

### Step 1: Install Dependencies
```bash
cd company
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to `http://localhost:5173`

### Step 4: Login with Demo Credentials
- **Email**: `admin@borderbus.com`
- **Password**: Any password (demo mode)

---

## Dashboard Overview

### 📊 Dashboard Page
Shows:
- Total buses (4)
- Active buses (3)
- Total routes (3)
- Total bookings (5)
- Total customers (5)
- Total revenue ($5,640)
- Recent 5 bookings table

### 🚌 Manage Buses
- View all buses in table format
- ✏️ Edit bus details
- 🗑️ Delete buses
- ➕ Add new buses

**Bus Information:**
- Bus Number (e.g., DB-001)
- Type (AC, Non-AC, Sleeper)
- Capacity (seats)
- Registration Number
- Manufacturing Year
- Status (Active, Maintenance, Inactive)

### 🛣️ Manage Routes
- Create routes with departure/destination locations
- Add travel duration and distance
- Add multiple stops
- Edit and delete routes

**Example Route:**
- Name: City A to City B
- Departure: City A Central Station
- Destination: City B Bus Depot
- Duration: 4 hours 30 minutes
- Distance: 320 km
- Stops: Station 1, Station 2, Station 3

### 📅 Manage Schedules
- Assign buses to routes
- Set departure dates and times
- Set arrival times
- Management ticket prices
- Track booked seats

### 🎫 Bookings
- View all bookings
- Filter by status (Pending, Confirmed, Cancelled)
- Click ✏️ to view full booking details
- Confirm/Cancel bookings from detail modal

**Booking Actions:**
- View customer information
- Check seat assignments
- See payment status
- Update booking status

### 👥 Customers
- Search customers by name or email
- View booking history
- Track total spending
- See preferred bus types
- View registration date

### ⚙️ Settings
- Company profile (view)
- Dashboard preferences
- Security (password change)
- Data management
- API configuration
- Help & support

---

## Key Features You Can Try

### 1. Add a New Bus
1. Go to "Manage Buses" page
2. Click "+ Add New Bus" button
3. Fill in the form:
   - Bus Number: DB-005
   - Type: Choose from dropdown
   - Capacity: 48
   - Registration Number: REG-BUS-005
   - Year: 2024
4. Click "Add Bus"
5. New bus appears in table instantly!

### 2. Create a Schedule
1. Navigate to "Manage Schedules"
2. Click "+ Add New Schedule"
3. Select route and bus from dropdowns
4. Set departure date (any date)
5. Set times and ticket price
6. Click "Add Schedule"

### 3. Manage Bookings
1. Go to "Bookings" page
2. Filter by status if needed
3. Click ✏️ on any booking
4. View full customer details
5. Change booking status:
   - Click "✓ Confirm Booking" - marks as confirmed
   - Click "✕ Cancel Booking" - marks as cancelled

### 4. Search Customers
1. Go to "Customers" page
2. Type customer name or email in search box
3. Click ✏️ on a customer
4. See their booking history and statistics

---

## Data & Storage

### How Data is Stored
- All changes are saved to **localStorage**
- Data persists when you refresh the page
- Data clears when you clear browser cache

### Reset Data
To restore original data:
1. Go to Settings page
2. Click "🗑️ Reset Dashboard" button
3. Data will reset to original sample data

### Switching Companies (Login/Logout)
- Click "🚪 Logout" in sidebar footer
- You'll be taken to login page
- Register a new company or login again
- Each company session has separate data

---

## Project Structure

```
company/src/
├── pages/
│   ├── Login.jsx           ← Login form
│   ├── Register.jsx        ← Registration form
│   ├── Dashboard.jsx       ← Main dashboard
│   ├── Buses.jsx           ← Bus management
│   ├── Routes.jsx          ← Route management
│   ├── Schedules.jsx       ← Schedule management
│   ├── Bookings.jsx        ← Booking management
│   ├── Customers.jsx       ← Customer management
│   └── Settings.jsx        ← Settings page
│
├── components/
│   ├── Sidebar.jsx         ← Navigation
│   ├── Header.jsx          ← Top header
│   ├── DataTable.jsx       ← Table component
│   ├── Modal.jsx           ← Form/Dialog component
│   ├── DashboardCard.jsx   ← Stats card
│   └── ProtectedRoute.jsx  ← Route protection
│
├── context/
│   └── AuthContext.jsx     ← Authentication
│
├── data/
│   └── mockData.js         ← Sample data
│
├── styles/
│   ├── global.css          ← Global styles
│   └── [component].css     ← Component styles
│
└── App.jsx                 ← Main routing
```

---

## Colors & Theme

| Element | Color | RGB |
|---------|-------|-----|
| Primary | Blue | #2563eb |
| Success | Green | #16a34a |
| Danger | Red | #dc2626 |
| Warning | Orange | #f59e0b |
| Info | Cyan | #0891b2 |
| Background | Light | #f8fafc |
| Text | Dark | #1e293b |

---

## Common Tasks

### Add a Route
1. Manage Routes → + Add New Route
2. Enter: Route name, departure location, destination
3. Add travel duration and distance
4. Add stops (comma-separated)
5. Click "Add Route"

### Create a Booking (Manual in Data)
Edit `src/data/mockData.js` to manually add bookings for testing.

### Change Theme
Edit CSS variables in `src/styles/global.css`:
```css
:root {
  --primary-color: #2563eb; /* Change this */
}
```

### Add a Custom Dashboard Card
1. Create new card component
2. Import in Dashboard.jsx
3. Add to stats-grid
4. Style with existing CSS classes

---

## Responsive Design

The dashboard works on:
- ✅ Desktop (1200px+) - Full sidebar and multi-column
- ✅ Tablet (768px-1199px) - Adjusted sidebar
- ✅ Mobile (< 768px) - Collapsed sidebar

Try resizing your browser window to see responsive behavior!

---

## Next Steps

### To Integrate with Backend:
1. **Authentication**: Update `AuthContext.jsx` with API calls
2. **Data Fetching**: Replace mock data with API endpoints
3. **Create Operations**: Connect form submissions to API
4. **Update Operations**: Link edit/delete buttons to API
5. **Error Handling**: Add error messages for API failures

### Sample API Integration Point:
```javascript
// In AuthContext.jsx - Replace with real API:
const login = async (email, password) => {
  // const response = await fetch('/api/login', {...})
  // const data = await response.json()
  // setIsAuthenticated(true)
  // setCompanyData(data)
}
```

### Environment Variables:
Create `.env` file:
```
VITE_API_URL=https://api.borderbus.local
VITE_API_KEY=your-api-key
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5173 in use | Change in vite.config.js or use different port |
| Data not saving | Check browser localStorage is enabled |
| Styling looks broken | Clear browser cache and reload |
| Routes not working | Make sure React Router is installed |
| Modal won't open | Check browser console for JS errors |

---

## Build for Production

```bash
# Build optimized version
npm run build

# Preview production build
npm run preview

# The built files will be in 'dist/' folder
```

---

## Support & Documentation

### Read These Files First:
1. **Architecture**: See `README.md` for full documentation
2. **Data Structure**: Check `src/data/mockData.js` for data format
3. **Components**: Review `src/components/` for component usage
4. **Styling**: Look at `src/styles/global.css` for theme

### For Help:
- Check the console for error messages (F12)
- Review comments in component files
- Check mock data structure in `mockData.js`
- Refer to React Router and React Context docs

---

## Tips & Tricks

💡 **Pro Tips:**
- Try adding 10+ buses and use the table scroll feature
- Create overlapping schedules and see seat calculations
- Test pagination by adding many customers
- Use browser DevTools to inspect localStorage data
- Try the search feature with partial names

🎯 **Best Practices:**
- Always confirm before deleting records
- Consistent bus types: AC, Non-AC, Sleeper
- Use real-looking seat numbers in bookings
- Set logical travel durations for routes
- Always assign active buses to schedules

---

## Version Info

- **React**: 19.2.4
- **React Router**: 6.26.0
- **Vite**: 8.0.1
- **Dashboard Version**: 1.0.0
- **Last Updated**: March 2024

---

**Everything is ready to use! Start the server with `npm run dev` and login to explore the dashboard. 🎉**
