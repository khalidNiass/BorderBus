# BorderBus User App

Frontend for the BorderBus user experience, built with React + Vite.

## Features
- Trip search and results filtering
- Seat selection with passenger counts
- Bookings and tickets
- Company profiles and notifications
- Settings and profile management

## Requirements
- Node.js 18+
- npm

## Setup
```bash
npm install
```

## Run
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Scripts
- `npm run dev` запускает дев‑сервер Vite
- `npm run build` собирает production‑билд
- `npm run preview` предпросмотр production‑сборки
- `npm run lint` запускает ESLint

## Project Structure
- `src/pages` — page routes
- `src/components` — reusable UI components
- `src/data/mockData.js` — mock data
- `src/App.jsx` — app shell + routing

## Notes
- Ticket QR codes are generated client‑side.
- Some pages rely on mock data until a backend is connected.
