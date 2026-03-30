# 🎯 Features Documentation

## Complete Feature List for BorderBus Dashboard

### 1. Authentication System

#### 1.1 Company Registration
- **Location**: Login Page
- **Fields**:
  - Company Name (required)
  - Email Address (required, validated)
  - Password (minimum 6 characters, required)
  - Confirm Password (must match, required)
- **Features**:
  - Real-time form validation
  - Error messages for each field
  - Smooth transition to login form
  - Secure password handling

#### 1.2 Company Login
- **Location**: Login Page
- **Fields**:
  - Email Address (required)
  - Password (required)
- **Features**:
  - Email format validation
  - Session persistence using localStorage
  - Redirect to dashboard on success
  - Error handling for invalid credentials

#### 1.3 Logout
- **Location**: Sidebar footer
- **Features**:
  - Confirmation dialog before logout
  - Clears session data
  - Redirects to login page
  - Protects against accidental logout

### 2. Dashboard

#### 2.1 Statistics Overview
- **Total Buses**: Shows count of all buses in fleet
- **Total Bookings**: Shows count of all bookings received
- **Total Routes**: Shows count of active routes
- **Total Revenue**: Shows cumulative revenue from confirmed bookings

#### 2.2 Dashboard Cards
- **Recent Bookings**:
  - Display latest 3 bookings
  - Shows booking ID, route, status, and date
  - Color-coded status indicators
  - Quick reference for pending actions

- **Quick Stats**:
  - Confirmed Bookings count (green)
  - Pending Bookings count (yellow)
  - Cancelled Bookings count (red)
  - Active Routes count (blue)

### 3. Bus Management

#### 3.1 Add Bus
**Modal Form with fields**:
- Bus Name (text, required)
- Bus Type dropdown (AC, Non-AC, Sleeper - required)
- Capacity (number, required)
- Registration Number (text, required)
- Status dropdown (Active, Inactive - required)

**Validations**:
- All required fields must be filled
- Capacity must be greater than 0
- Registration number cannot be empty

**Actions**:
- Add Bus button saves new bus
- Cancel button closes modal
- Auto-generate Bus ID (BUS001, etc.)

#### 3.2 View Buses
- Table view with all buses
- Columns: Bus ID, Name, Type, Capacity, Registration No., Status
- Color-coded status badges
- Sortable and scrollable table

#### 3.3 Edit Bus
- Click "Edit" button on any bus row
- Opens modal with existing bus data
- Update button saves changes
- All validation rules apply

#### 3.4 Delete Bus
- Click "Delete" button on any bus row
- Confirmation dialog appears
- Removes bus from list if confirmed
- Cannot be undone

### 4. Route Management

#### 4.1 Add Route
**Modal form with fields**:
- Departure Location (text, required)
- Destination (text, required)
- Distance (text, required, e.g., "1400 km")
- Duration (text, required, e.g., "18 hours")
- Number of Stops (number, optional)
- Status (Active, Inactive)

**Validations**:
- Departure and destination must be different
- All required fields must be filled
- Auto-generate Route ID (RT001, etc.)

#### 4.2 View Routes
- Comprehensive table with all routes
- Columns: Route ID, Departure, Destination, Distance, Duration, Stops, Status
- Color-coded status indicators
- Full scrolling capability

#### 4.3 Edit/Delete Routes
- Edit opens modal with current data
- Delete asks for confirmation
- Same validations as add route

### 5. Schedule Management

#### 5.1 Add Schedule
**Modal form with fields**:
- Bus ID (text, required, e.g., "BUS001")
- Route ID (text, required, e.g., "RT001")
- Date (date picker, required)
- Departure Time (time picker, required)
- Arrival Time (time picker, required)
- Ticket Price (number, required)
- Available Seats (number, required)
- Status (Active, Inactive)

**Validations**:
- All required fields must be filled
- Price must be greater than 0
- Available seats must be greater than 0
- Auto-generate Schedule ID (SCH001, etc.)

#### 5.2 View Schedules
- Detailed table with scrollable columns
- Columns: Schedule ID, Bus ID, Route ID, Date, Departure Time, Arrival Time, Price, Seats, Status
- All information visible at a glance
- Status badges for easy identification

#### 5.3 Edit/Delete Schedules
- Edit allows updating all fields
- Delete removes schedule after confirmation
- All validations enforced

### 6. Booking Management

#### 6.1 View Bookings
**Statistics Dashboard**:
- Confirmed Bookings count (green card)
- Pending Bookings count (yellow card)
- Cancelled Bookings count (red card)

**Bookings Table** with columns:
- Booking ID
- Customer Name
- Customer Email
- Route
- Travel Date
- Seats Booked
- Total Amount
- Booking Status (color-coded)
- Actions (View, Accept, Cancel)

#### 6.2 Accept Booking
- Only available for pending bookings
- Click "Accept" button in actions
- Changes status to "Confirmed"
- Updates instantly in table

#### 6.3 Cancel Booking
- Available for non-cancelled bookings
- Click "Cancel" button in actions
- Confirmation dialog appears
- Changes status to "Cancelled"

#### 6.4 View Booking Details
**Modal showing**:
- Booking ID
- Booking Date
- Customer Information (Name, Email, ID)
- Journey Information (Route, Date, Seats, Amount)
- Booking Status with indicator
- Action buttons for accept/cancel

### 7. Customer Management

#### 7.1 Customer Cards View
**Grid layout displaying**:
- Customer Name
- Email Address
- Phone Number
- Total Bookings
- Total Amount Spent
- Join Date
- View Details button

#### 7.2 Customer Statistics
- Total Customers count
- Total Bookings count
- Total Revenue from all customers

#### 7.3 View Customer Details
**Modal showing**:
- Personal Information (Name, ID, Email, Phone, Join Date, Total Spent)
- Booking History (Booking ID, Route, Date, Status)
- Color-coded status indicators for bookings

### 8. Settings

#### 8.1 Company Profile Management
**Basic Information section**:
- Company Name (editable)
- Email Address (editable)
- Phone Number (editable)

**Address Information section**:
- Address (editable)
- City (editable)
- State (editable)

**License and Registration section**:
- Registration Number (display only)
- License Number (display only)

#### 8.2 Edit Profile
- Click "Edit" button to enable form
- All fields become editable
- "Save Changes" and "Cancel" buttons appear
- Saves to localStorage and shows success message

#### 8.3 Preferences
- Email Notifications toggle (default ON)
- SMS Notifications toggle (default ON)
- Data Export button

#### 8.4 Account Management
- Delete Account button in danger zone
- Warning message about irreversible action

### 9. User Interface Features

#### 9.1 Sidebar Navigation
- **Desktop**: Fixed sidebar on left (64 width)
- **Mobile**: Collapsible sidebar with hamburger menu
- Navigation items with icons
- Active page highlighting
- Smooth transitions
- Logout button at bottom

#### 9.2 Responsive Design
- **Mobile** (< 768px): Single column, stacked layout
- **Tablet** (768px - 1024px): Two column layout
- **Desktop** (> 1024px): Full multi-column layout
- Hamburger menu on mobile
- Touch-friendly buttons

#### 9.3 Forms and Inputs
- Consistent styling across all forms
- Real-time validation
- Error messages below fields
- Required field indicators (red asterisk)
- Disabled state for locked fields
- Focus states for accessibility

#### 9.4 Color Scheme
- **Primary Color**: Blue (#2563eb, #1d4ed8)
- **Success Color**: Green (#16a34a, #15803d)
- **Warning Color**: Yellow (#ca8a04, #b45309)
- **Danger Color**: Red (#dc2626, #b91c1c)
- **Background**: Light gray (#f3f4f6)
- **Text**: Dark gray (#1f2937)

#### 9.5 Data Tables
- Header row with light gray background
- Hover effect on rows
- Action buttons (Edit, Delete, View)
- Proper text alignment
- Color-coded status badges
- Responsive overflow scrolling

### 10. Component Features

#### 10.1 Modal Component
- Centered overlay
- Close button (X) in header
- Backdrop click to close
- Multiple size options (sm, md, lg, xl)
- Smooth animations

#### 10.2 Button Component
- Multiple variants (primary, secondary, danger, success, outline)
- Multiple sizes (sm, md, lg)
- Disabled state with reduced opacity
- Hover effects
- Icon-friendly layout

#### 10.3 Form Input Component
- Label with required indicator
- Placeholder support
- Error message display
- Disabled state
- Border highlighting on error (red)
- Focus state with blue border

#### 10.4 StatCard Component
- Icon display
- Title and value
- Color theming (blue, green, purple, orange)
- Shadow on hover
- Responsive sizing

#### 10.5 Table Component
- Header with column labels
- Dynamic row rendering
- Edit and Delete action buttons
- Empty state message
- Loading state indicator

## Data Persistence

- Company authentication data stored in localStorage
- Session-based data management
- Data persists during browsing session
- Cleared on logout

## Validations

### Form Validations
- Email format validation (RFC standard)
- Password minimum length (6 characters)
- Required field validation
- Numeric field validation
- Confirmation matching (passwords)

### Business Validations
- Departure ≠ Destination (routes)
- Capacity > 0 (buses)
- Price > 0 (schedules)
- Available seats ≥ 0 (schedules)

## Accessibility Features

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Color contrast compliance
- Focus indicators
- Alt text for icons

## Performance Features

- Component-based architecture
- Efficient re-rendering with React
- Tailwind CSS for optimized styling
- Fast routing with React Router
- Lazy loading ready

## Future Enhancements

- Backend API integration
- Real database connectivity
- Payment processor integration
- Email notification system
- SMS gateway integration
- Advanced analytics dashboard
- Reporting and exports
- Multi-language support
- Dark mode theme
- Advanced search and filtering
