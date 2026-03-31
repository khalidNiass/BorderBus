# BorderBus User App — Features

This document lists the current features and behavior implemented in the user app.

## Search & Discovery
- Search Trips page with validation, suggestions, recent searches, and swap action.
- Search Results page filters by user input (from/to) and supports refresh via URL params.
- Live Departures on Home with filters for price, time of day, bus type, rating, and seats.

## Booking Flow
- Seat Selection with:
  - Per‑bus booked seats (deterministic placeholder data)
  - Passenger counts (adults/children) and price calculation
  - Seat selection validation (seats must match passenger count)
  - Persistence to localStorage
  - Suggested seat selection and clear action

## Tickets
- Ticket page shows:
  - Booking details (route, time, seats, operator, terminal, gate)
  - QR code (generated client‑side)
  - Payment status and amount
  - Boarding instructions and cancellation policy
  - Actions: download, share, add to calendar, call support

## Profiles & Settings
- Profile page:
  - Editable personal info
  - Avatar upload (client‑side preview)
  - Account stats and payment preview
  - Two‑factor toggle
  - Profile persistence to localStorage
- Settings page:
  - Theme toggle with persistence
  - Preferences (notifications, language, region)
  - Password form with validation hints
  - Account info + account actions (sign out, delete)

## Notifications & Bookings
- Notifications page:
  - Read/unread state, filters, and grouping
  - Type‑based icons and actions
  - Empty state
- My Bookings:
  - Upcoming vs completed sections
  - Cancel action for upcoming trips
  - Ticket navigation

## Operators
- Company Profile page:
  - Overview, trips, reviews, fleet, media tabs
  - Route highlights and service area panel
  - Contact actions and safety highlights

## Notes / Mock Data
- All data is currently mocked via `src/data/mockData.js`.
- Some actions (e.g., sign out) are UI‑only and not wired to a backend.
