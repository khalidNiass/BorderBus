# Admin Component Styling & Data Integration Guide

## Overview

Your Admin Dashboard has been updated with styling from your partner's User Side design system and data structures that align for seamless integration.

---

## 🎨 Styling Integration

### Design System
All new Admin components now use the **User Side Design System** with CSS variables:

#### Color Palette (Dark Mode - Default)
```css
--bg: #0b0d12              /* Main background */
--bg-elev: #111521         /* Elevated elements */
--bg-card: #151b2a         /* Card backgrounds */
--text: #f1f5f9            /* Primary text */
--text-muted: #9aa4b2      /* Secondary text */
--accent: #1d9bf0          /* Primary accent (Twitter blue) */
--accent-soft: rgba(29, 155, 240, 0.15)  /* Accent background */
--border: rgba(148, 163, 184, 0.2)        /* Border color */
--shadow: 0 10px 30px rgba(3, 6, 14, 0.6) /* Elevation shadow */
--success: #22c55e         /* Success state */
--warning: #f97316         /* Warning state */
--danger: #ef4444          /* Danger/Error state */
--radius: 18px             /* Border radius */
```

#### Light Mode
The system automatically switches to light theme when `data-theme="light"` is set on the body element. All components support both themes.

### Typography
- **Sans Serif**: Manrope (UI text) - family: var(--sans)
- **Monospace**: Space Grotesk (headings) - family: var(--mono)

---

## 📁 New Admin Components

### 1. AdminLogin.jsx
**Location**: `src/components/Admin/AdminLogin.jsx`

**Features**:
- Styled with User Side design system
- Light/Dark theme toggle
- Form validation
- Smooth animations (slideIn)

**Usage in App.jsx**:
```jsx
import AdminLogin from './components/Admin/AdminLogin';
<Route path="/login" element={<AdminLogin />} />
```

**Styling**: `src/components/Admin/AdminAuth.css`

---

### 2. AddRouteForm.jsx
**Location**: `src/components/Admin/AddRouteForm.jsx`

**Features**:
- Standalone form component with validation
- Responsive grid layout
- Error handling per field
- Matches User Side data structure

**Data Structure** (Output Schema):
```javascript
{
  // Admin-specific fields
  departureLocation: "City A Central Station",
  destinationLocation: "City B Bus Depot",
  routeName: "City A to City B",
  
  // User-side compatible aliases
  from: "City A",
  to: "City B",
  price: 500,
  
  // Additional fields
  travelDuration: "4h 30m",
  distance: 320,
  stops: ["Station 1", "Station 2"]
}
```

**Styling**: `src/components/Admin/AddRouteForm.css`

---

## 🔄 Data Structure Alignment

### Routes Data Model

Your routes now include both Admin and User-Side fields:

```javascript
{
  id: 1,
  routeName: "City A to City B",           // Admin field
  departureLocation: "City A Central",     // Admin field (full name)
  destinationLocation: "City B Bus Depot", // Admin field (full name)
  
  // User Side aliases (for search/display)
  from: "City A",                          // User Side field
  to: "City B",                            // User Side field
  price: 500,                              // User Side field
  
  // Shared fields
  travelDuration: "4h 30m",
  distance: 320,
  stops: ["Station 1", "Station 2"],
  createdDate: "2024-01-15"
}
```

### Mock Data Updates
Updated `src/data/mockData.js` with price and alias fields:

```javascript
routes: [
  {
    id: 1,
    routeName: "City A to City B",
    departureLocation: "City A Central Station",
    destinationLocation: "City B Bus Depot",
    from: "City A",        // NEW
    to: "City B",          // NEW
    price: 500,            // NEW
    travelDuration: "4h 30m",
    distance: 320,
    stops: ["Station 1", "Station 2"]
  }
  // ... more routes
]
```

---

## 🔀 App-Level Conditional Rendering

**App.jsx** now includes admin-side separation:

```jsx
const IS_ADMIN_SIDE = true; // Toggle to switch sides

if (!IS_ADMIN_SIDE) {
  return <div>User Side App would load here</div>;
}

// Otherwise render Admin Dashboard
return (
  <AuthProvider>
    <Router>
      {/* Admin Routes */}
    </Router>
  </AuthProvider>
);
```

**Purpose**: Allows you to easily switch which side of the app loads when both are in the same codebase (future monolith integration).

---

## 🔗 Data Flow Between Admin & User

### Route Creation (Admin → User)
1. Admin creates route in `Routes.jsx` modal
2. Route saved with structure: `{ from, to, price, ... }`
3. Data stored in `localStorage` via `AuthContext`
4. User side can fetch from same API endpoint

### Search Integration (User Side)
The User side `SearchTrips` component expects:
```javascript
const popularRoutes = [
  { from: 'Dakar', to: 'Banjul', price: 38, duration: '6h 45m' }
]
```

Your admin routes match this structure via the new fields!

---

## 🎨 Responsive Design

All Admin components are responsive:
- **Desktop** (1200px+): Full width with multi-column forms
- **Tablet** (768px-1199px): Adjusted spacing
- **Mobile** (<768px): Single column, stacked buttons

---

## 🔧 Customization

### Change Primary Color
Update in `global.css`:
```css
:root {
  --accent: #your-color;      /* Changes all accent elements */
}
```

### Change Theme
```jsx
document.body.dataset.theme = 'light'; // or 'dark'
```

### Font Family
Change in component CSS:
```css
font-family: var(--sans);   /* Manrope */
font-family: var(--mono);   /* Space Grotesk */
```

---

## 📝 Routes Page Updates

The `Manage Routes` page (Routes.jsx) now includes:
- **Price field** - Base price for the route
- **from/to fields** - Short location names for User compatibility
- Routes display in table with all fields

---

## ✅ Files Created/Modified

### Created:
- ✅ `src/components/Admin/AdminLogin.jsx`
- ✅ `src/components/Admin/AdminAuth.css`
- ✅ `src/components/Admin/AddRouteForm.jsx`
- ✅ `src/components/Admin/AddRouteForm.css`

### Modified:
- ✅ `src/App.jsx` - Uses AdminLogin, added conditional rendering
- ✅ `src/styles/global.css` - Added User Side color system
- ✅ `src/data/mockData.js` - Added from/to/price to routes
- ✅ `src/pages/Routes.jsx` - Updated form to include price/from/to

---

## 🚀 Next Steps for Integration

1. **Backend API**: Replace localStorage with API calls
   - POST `/api/routes` - Create route
   - GET `/api/routes` - Fetch all routes
   - PUT `/api/routes/:id` - Update route

2. **User Side Integration**: Have your partner fetch routes:
   ```javascript
   const routes = await fetch('/api/routes').then(r => r.json());
   ```

3. **Authentication**: Implement JWT tokens for secure data sharing

---

## 📞 Troubleshooting

| Issue | Solution |
|-------|----------|
| Colors look different | Check `data-theme` attribute on body |
| Forms not validating | Check browser console for validation errors |
| Data not syncing | Verify AuthContext is properly updating localStorage |
| Mobile looks broken | Check viewport meta tag in index.html |

---

**Last Updated**: March 31, 2026  
**Design System**: User Side Compatible  
**Status**: Ready for Integration
