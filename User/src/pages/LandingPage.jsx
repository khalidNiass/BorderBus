import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiCreditCard,
  FiGlobe,
  FiGrid,
  FiMapPin,
  FiClock,
  FiMap,
} from 'react-icons/fi'
import heroImage from '../assets/bus.jfif'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const features = [
  {
    title: 'Easy Bus Booking',
    description: 'Search routes, compare operators, and lock in seats in minutes.',
    icon: FiMapPin,
  },
  {
    title: 'Secure Online Payments',
    description: 'Trusted checkout with encrypted transactions and saved cards.',
    icon: FiCreditCard,
  },
  {
    title: 'Live Seat Selection',
    description: 'Pick your exact seat with real-time availability updates.',
    icon: FiGrid,
  },
  {
    title: 'Digital Tickets',
    description: 'Go paperless with QR tickets delivered instantly to your inbox.',
    icon: FiGlobe,
  },
]

const steps = [
  'Search Trips',
  'Choose Bus',
  'Select Seat',
  'Pay & Travel',
]

const routes = [
  {
    route: 'Dakar → Bamako',
    duration: '10h 25m',
    price: '$48',
    seats: '18 seats left',
  },
  {
    route: 'Casablanca → Tangier',
    duration: '5h 10m',
    price: '$34',
    seats: '12 seats left',
  },
  {
    route: 'Abidjan → Accra',
    duration: '7h 45m',
    price: '$55',
    seats: '9 seats left',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
  viewport: { once: true, amount: 0.2 },
}

export default function LandingPage({ theme, onToggleTheme }) {
  const MotionLink = motion(Link)

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(29,155,240,0.25),transparent_55%)]"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              theme === 'dark'
                ? 'linear-gradient(180deg, rgba(0,0,0,0.7), rgba(0,0,0,0.75), rgba(11,13,18,1))'
                : 'linear-gradient(180deg, rgba(248,250,252,0.85), rgba(248,250,252,0.7), rgba(248,250,252,1))',
          }}
        ></div>
        <Navbar theme={theme} onToggleTheme={onToggleTheme} />

        <motion.section
          className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-4 pb-24 pt-28 lg:flex-row lg:items-start lg:pt-32"
          {...fadeUp}
        >
          <div className="relative z-10 flex-1">
            <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--text-muted)]">
              BorderBus
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-[var(--text)] sm:text-6xl lg:text-6xl">
              Travel Across Borders with Ease
            </h1>
            <p className="mt-5 max-w-xl text-base text-[var(--text-muted)] sm:text-lg">
              Book inter-state and international bus trips quickly and securely
              with BorderBus.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <MotionLink
                to="/login"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Login
              </MotionLink>
              <MotionLink
                to="/signup"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full bg-gradient-to-r from-[#1d9bf0] via-[#3bb2ff] to-[#1d9bf0] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(29,155,240,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(29,155,240,0.55)]"
              >
                Sign Up
              </MotionLink>
            </div>
            <div className="mt-10 grid gap-4 text-xs uppercase tracking-[0.3em] text-[var(--text-muted)] sm:grid-cols-3">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/70 px-4 py-3 text-center">
                Trusted by 10,000+ travelers
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/70 px-4 py-3 text-center">
                50+ bus companies
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/70 px-4 py-3 text-center">
                8 countries connected
              </div>
            </div>
          </div>

          <div className="relative z-10 flex-1">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--bg-card)]/70 p-4 shadow-[0_35px_90px_rgba(0,0,0,0.55)] backdrop-blur"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
              <img
                src={heroImage}
                alt="Modern bus travel"
                className="relative h-[320px] w-full rounded-2xl object-cover sm:h-[380px]"
              />
              <div className="mt-4 grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)]/80 p-4 text-sm text-[var(--text-muted)] backdrop-blur sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Next Trip
                  </p>
                  <p className="mt-2 text-base text-[var(--text)]">Dakar → Rabat</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Departure
                  </p>
                  <p className="mt-2 text-base text-[var(--text)]">Fri, 08:45 AM</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>

      <motion.section
        id="features"
        className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6"
        {...fadeUp}
      >
        <div className="flex flex-col gap-3 text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Features
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Everything you need to ride
          </h2>
          <p className="text-[var(--text-muted)]">
            BorderBus delivers premium booking tools for busy travelers.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/80 p-6 text-[var(--text-muted)] shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition hover:border-[var(--accent)] hover:shadow-[0_24px_60px_rgba(29,155,240,0.25)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)] transition group-hover:scale-105">
                  <Icon />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[var(--text)]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      <motion.section className="mx-auto w-full max-w-6xl px-4 pb-24" {...fadeUp}>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Book in four easy steps
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-5 text-[var(--text-muted)]"
              >
                <div className="text-sm font-semibold text-[var(--accent)]">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-[var(--text)]">
                  {step}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Move from search to boarding with guided booking flows.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="mx-auto w-full max-w-6xl px-4 pb-24" {...fadeUp}>
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Popular routes
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Curated cross-border journeys
            </h2>
          </div>
          <div className="hidden items-center gap-2 text-sm text-[var(--text-muted)] md:flex">
            <FiMap />
            Updated daily
          </div>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {routes.map((route) => (
            <motion.div
              key={route.route}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/85 p-6 shadow-[0_20px_55px_rgba(0,0,0,0.35)] transition hover:border-[var(--accent)]"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  {route.route}
                </h3>
                <span className="rounded-full border border-[var(--border)] bg-[var(--bg-elev)] px-3 py-1 text-xs text-[var(--text-muted)]">
                  {route.seats}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <FiClock />
                  {route.duration}
                </div>
                <div className="text-base font-semibold text-[var(--text)]">
                  {route.price}
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                View details
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="about"
        className="mx-auto w-full max-w-6xl px-4 pb-24"
        {...fadeUp}
      >
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            About BorderBus
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Built for borderless travel
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-[var(--text-muted)] sm:text-base">
            BorderBus connects travelers with reliable cross-border operators,
            delivering fast bookings, transparent pricing, and real-time travel
            updates. Our mission is to make international bus travel feel as
            effortless as a local commute.
          </p>
          <div className="mt-6">
            <MotionLink
              to="/signup"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-[#1d9bf0] via-[#3bb2ff] to-[#1d9bf0] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(29,155,240,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(29,155,240,0.5)]"
            >
              Start booking today
            </MotionLink>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}
