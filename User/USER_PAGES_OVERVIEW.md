# User App Page Overview

This document describes the pages in the `User` folder of the BorderBus application and the features each page provides.

## Pages and Features

### `LandingPage.jsx`
- Main marketing page for the User app.
- Professional hero section with strong positioning copy.
- Features section outlining booking, payments, seat selection, and digital tickets.
- Booking workflow section with four guided steps.
- Statistics panel, testimonials, trusted operator section, FAQ block, and final CTA.
- Designed to be longer, more polished, and to promote sign-up.

### `Login.jsx`
- User login page with email and password form.
- Validation for required fields.
- Google sign-in placeholder.
- Switch option between user and company login portals.
- Background hero image with overlay and theme-aware styling.

### `Signup.jsx`
- Multi-step signup form for new users.
- Collects name, email, phone, password, and confirmation.
- Step navigation with validation.
- Option to switch between user and company signup portals.
- Background hero styling with signup CTA.

### `Home.jsx`
- Logged-in user home/dashboard page.
- Hero summary of the platform’s main benefits.
- Live departures feed with dynamic route filtering.
- Search filters for price, time, bus type, rating, and seats.
- Call-to-action button to go to search.

### `SearchTrips.jsx`
- Trip search page where users enter departure, destination, and date.
- Auto-saved recent searches and city suggestions.
- Validation and quick route preview count.
- Search form stores last search and navigates to results.
- Recent searches card for fast repeat booking.

### `SearchResults.jsx`
- Displays filtered bus search results.
- Supports price, time, bus type, and sort order.
- Uses search parameters from URL or location state.
- Renders a list of `BusCard` components.

### `SeatSelection.jsx`
- Seat selection page for a chosen bus.
- Visual seat map with available, selected, and booked seats.
- Passenger count controls for adults and children.
- Suggested seat selection and clear selection actions.
- Total price summary and navigation to payment.

### `BookingPayment.jsx`
- Booking and payment checkout page.
- Trip summary with route, date, company, seats, and total.
- Passenger details form and payment fields.
- Option for card payment or pay-on-arrival.
- Confirm booking button directs to the ticket page.

### `TicketPage.jsx`
- Displays a ticket view for a confirmed booking.
- Uses the `Ticket` component.
- Shows travel details, seat assignments, company, payment status, and support info.

### `RoutesPage.jsx`
- Popular routes page with trending route comparisons.
- Filter tabs for cheapest, fastest, most booked, and today.
- Route cards show duration, next departure, trip count, and price.
- Navigation to results for route discovery.

### `OperatorsPage.jsx`
- Operator marketplace page.
- Filter tabs for top rated, on-time, and most routes.
- Operator cards display ratings, location, route count, on-time score, and badges.
- Buttons to view each operator profile.

### `CompanyProfile.jsx`
- Detailed operator/company profile page.
- Displays company hero, rating, metadata, badges, overview, and contact.
- Includes tabs for overview, trips, reviews, fleet, and media.
- Shows top routes, fleet cards, and user reviews.
- Button actions to view seats and contact the operator.

### `OperatorDetail.jsx`
- Lightweight operator detail page.
- Overview of selected operator, rating, routes, on-time score, and price.
- Shows operator highlights and service tags.

### `ProfilePage.jsx`
- User profile page.
- Renders the reusable `Profile` component.
- Shows user details, contact info, location, birthdate, and trip stats.

### `NotificationsPage.jsx`
- Notifications center for booking updates and alerts.
- Filters for all, unread, and important notifications.
- Mark all read and individual read actions.
- Grouped sections for Today, Yesterday, and Earlier.
- Navigation from notifications to ticket, bookings, or search.

### `MyBookings.jsx`
- Booking management page.
- Lists upcoming and completed trips.
- Uses `BookingCard` components for each booking.
- View ticket and cancel booking actions.
- Empty state with prompt to search trips.

### `SettingsPage.jsx`
- User settings and account management.
- Change password workflow with validation hints.
- Notification, theme, language, and region preferences.
- Save and cancel preference changes.
- Account info panel with loyalty and membership details.
- Account actions for sign out, sign out everywhere, and delete account.

## Notes
- All pages are located under `User/src/pages`.
- Existing components and mock data are used across these pages.
- The app currently renders landing, login, and signup as marketing pages outside the main logged-in layout.
