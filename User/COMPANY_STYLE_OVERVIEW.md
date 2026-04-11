# Company-Style Page Overview

This document converts the `User` overview into company-style page descriptions for the BorderBus operator/admin side.

## Pages and Features

### `Dashboard.jsx`
- Main company dashboard showing business KPIs and operational analytics.
- Displays total revenue, total bookings, occupancy rate, and customer metrics.
- Includes period selection (Today, This Week, This Month, All Time).
- Supports export action and refresh animation.
- Shows KPI cards and additional stats for active buses, total routes, confirmed bookings, and pending bookings.
- Includes recent bookings table rendered via `DataTable`.

### `Bookings.jsx`
- Booking management page for company operators.
- Lists bookings with status filters: All, Pending, Confirmed, Cancelled.
- Uses `DataTable` to display booking details.
- Opens modal with booking details and actions to update status.
- Supports status transitions: Confirmed, Pending, Cancelled.
- Saves status updates back into the app state.

### `Buses.jsx`
- Fleet management page for company buses.
- Displays active bus counts, maintenance status, total capacity, and fleet details.
- Supports adding, editing, and deleting bus records via modal.
- Uses `DataTable` for fleet data display.
- Persists changes to app data context.

### `Customers.jsx`
- Customer management page for viewing passenger profiles.
- Searchable customer list by name or email.
- Displays customer bookings, spent totals, and join dates.
- Opens modal with full customer profile and booking history.
- Aggregates customer booking stats from the app state.

### `Routes.jsx`
- Route management page for company routes.
- Lists route details including departure, destination, duration, distance, and stops.
- Supports add, edit, and delete route actions via modal.
- Uses `DataTable` and form-driven route management.
- Persists route updates to the app state.

### `Schedules.jsx`
- Schedule management page for company departures.
- Lists schedules with route, bus, departure date, time, and price.
- Supports add, edit, and delete schedule actions via modal.
- Uses route and bus references for schedule selection.
- Maintains schedule updates in app state.

### `Settings.jsx`
- Company settings page for profile and preferences.
- Company profile section with name, email, phone, address, and registration number.
- Dashboard preferences for analytics, booking visibility, notifications, and dark mode.
- Security section with password update placeholders.
- Saves preferences and settings to the company app state context.

### `Login.jsx`
- Company admin login page.
- Validates email and password fields.
- Uses auth context to authenticate company users.
- Includes demo credentials and link to register.

### `Register.jsx`
- Company registration page.
- Collects company name, email, password, confirm password, phone, address, and registration number.
- Validates required fields and password matching.
- Uses auth context to register new company accounts.
- Redirects to the dashboard after successful registration.

## Notes
- This file is a company-style conversion of the User-side overview.
- It follows the same format as the User overview but describes company/admin pages and flows.
- Place this file in the `User` folder as a reference for how the company side operates.
