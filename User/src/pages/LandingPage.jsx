import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiCreditCard,
  FiGlobe,
  FiGrid,
  FiMapPin,
  FiClock,
  FiMap,
  FiStar,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiMoreHorizontal,
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

const stats = [
  { value: '10K+', label: 'Bookings per month' },
  { value: '98%', label: 'On-time departures' },
  { value: '24/7', label: 'Support coverage' },
  { value: '4.9/5', label: 'Average rating' },
]

const testimonials = [
  {
    name: 'Amina Diop',
    title: 'Frequent commuter',
    quote:
      'BorderBus makes international travel simple, reliable, and surprisingly fast. I never worry about seats anymore.',
  },
  {
    name: 'Samuel Toure',
    title: 'Business traveler',
    quote:
      'I can compare operators in one place, book instantly, and get on my way without the hassle of long lines.',
  },
  {
    name: 'Nadia Cissé',
    title: 'Holiday planner',
    quote:
      'The seat selection and digital ticketing are game changers. My family trip was smooth from start to finish.',
  },
]

const partners = [
  'TransAfrique',
  'Coastal Express',
  'Atlas Routes',
  'Sunline Travels',
]

const faqs = [
  {
    question: 'Can I book cross-border routes with one ticket?',
    answer:
      'Yes, BorderBus supports regional routes across multiple countries with a single seamless checkout experience.',
  },
  {
    question: 'Is my payment information secure?',
    answer:
      'Absolutely. We use encrypted payment processing and protect card details with trusted providers.',
  },
  {
    question: 'How do I get help during travel?',
    answer:
      'Our support team is available 24/7, and you can access live chat or phone support from your account dashboard.',
  },
]

const steps = [
  'Find your route',
  'Choose your bus',
  'Reserve your seat',
  'Complete payment',
]

const stepDetails = [
  'Browse schedules, operators, and travel times with confidence.',
  'Compare buses by comfort, amenities, and availability.',
  'Select the exact seat you want with live real-time updates.',
  'Pay securely and receive your ticket instantly to your inbox.',
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
  {
    route: 'Lagos → Cotonou',
    duration: '8h 10m',
    price: '$42',
    seats: '21 seats left',
  },
  {
    route: 'Niamey → Ouagadougou',
    duration: '9h 30m',
    price: '$39',
    seats: '14 seats left',
  },
]

const companyLoginUrl = import.meta.env.VITE_COMPANY_LOGIN_URL || '/company/login'

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
  viewport: { once: true, amount: 0.2 },
}

export default function LandingPage({ theme, onToggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const MotionLink = motion(Link)
  const MotionAnchor = motion.a

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
                ? 'linear-gradient(180deg, rgba(0,0,0,0.75), rgba(10,12,18,0.95) 65%)'
                : 'linear-gradient(180deg, rgba(255,255,255,0.85), rgba(247,249,254,0.95) 65%)',
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
              Seamless cross-border travel, booked in minutes.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-[var(--text-muted)] sm:text-lg">
              BorderBus connects verified operators, real-time availability,
              and secure checkout so your next international route is smooth from
              search to boarding.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/70 px-4 py-3 text-center text-sm text-[var(--text-muted)] shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                Verified routes & operators
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/70 px-4 py-3 text-center text-sm text-[var(--text-muted)] shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                Easy seat selection
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/70 px-4 py-3 text-center text-sm text-[var(--text-muted)] shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                24/7 travel support
              </div>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <MotionLink
                to="/login"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] md:hidden"
              >
                Sign In
              </MotionLink>

              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 text-[var(--text)] transition hover:border-[var(--accent)] md:hidden"
                aria-label="More actions"
              >
                <FiMoreHorizontal className="h-5 w-5" />
              </button>

              <div className="hidden items-center gap-3 md:flex">
                <MotionLink
                  to="/login"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Login
                </MotionLink>
                <MotionAnchor
                  href={companyLoginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Operator Portal
                </MotionAnchor>
                <MotionLink
                  to="/signup"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full bg-gradient-to-r from-[#1d9bf0] via-[#3bb2ff] to-[#1d9bf0] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(29,155,240,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(29,155,240,0.55)]"
                >
                  Sign Up
                </MotionLink>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">Operator partner</p>
                  <h2 className="mt-2 text-xl font-semibold text-[var(--text)]">
                    Manage routes, schedules, and bookings in one place.
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-[var(--text-muted)]">
                    The operator portal gives your company a streamlined dashboard for route planning, seat inventory, and booking analytics.
                  </p>
                </div>
                <MotionAnchor
                  href={companyLoginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Open Operator Portal
                </MotionAnchor>
              </div>
            </div>

            {isMenuOpen && (
              <div className="mt-3 flex flex-col gap-3 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)]/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:hidden">
                <MotionLink
                  to="/login"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Login
                </MotionLink>
                <MotionAnchor
                  href={companyLoginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Operator Portal
                </MotionAnchor>
                <MotionLink
                  to="/signup"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full bg-gradient-to-r from-[#1d9bf0] via-[#3bb2ff] to-[#1d9bf0] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(29,155,240,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(29,155,240,0.55)]"
                >
                  Sign Up
                </MotionLink>
              </div>
            )}
            <div className="mt-10 grid gap-4 text-xs uppercase tracking-[0.3em] text-[var(--text-muted)] sm:grid-cols-3">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/70 px-4 py-3 text-center">
                Trusted by professional travelers
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/70 px-4 py-3 text-center">
                50+ vetted operators
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/70 px-4 py-3 text-center">
                Coverage across 8 countries
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
            Professional tools for modern travel
          </h2>
          <p className="text-[var(--text-muted)]">
            Manage cross-border journeys with instant availability, secure
            checkout, and digital tickets designed for frequent travelers.
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
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                For operators
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Operator tools for route partners and fleet managers
              </h2>
              <p className="mt-4 max-w-3xl text-sm text-[var(--text-muted)] sm:text-base">
                Manage availability, set schedules, review bookings, and keep your
                fleet running smoothly with a dedicated dashboard built for
                operators.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <MotionAnchor
                  href={companyLoginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(29,155,240,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(29,155,240,0.55)]"
                >
                  Operator Login
                </MotionAnchor>
                <MotionAnchor
                  href="#features"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Learn more
                </MotionAnchor>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev)] p-6 text-[var(--text-muted)] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <h3 className="text-lg font-semibold text-[var(--text)]">Fleet & Schedule Control</h3>
                <p className="mt-3 text-sm leading-relaxed">
                  Update routes, assignments, and bus availability from one place.
                </p>
              </div>
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev)] p-6 text-[var(--text-muted)] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <h3 className="text-lg font-semibold text-[var(--text)]">Live Booking Insights</h3>
                <p className="mt-3 text-sm leading-relaxed">
                  Track reservations, seat fills, and revenue trends in real time.
                </p>
              </div>
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev)] p-6 text-[var(--text-muted)] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <h3 className="text-lg font-semibold text-[var(--text)]">Operator Performance</h3>
                <p className="mt-3 text-sm leading-relaxed">
                  Monitor on-time rates, cancellations, and consistency across trips.
                </p>
              </div>
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev)] p-6 text-[var(--text-muted)] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <h3 className="text-lg font-semibold text-[var(--text)]">Trusted Partner Network</h3>
                <p className="mt-3 text-sm leading-relaxed">
                  Join the platform and get access to more cross-border travelers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="mx-auto w-full max-w-6xl px-4 pb-24" {...fadeUp}>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Streamlined booking process
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev)] p-6 text-[var(--text-muted)] shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Step {index + 1}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-[var(--text)]">
                  {step}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {stepDetails[index]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="mx-auto w-full max-w-6xl px-4 pb-24" {...fadeUp}>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Why travelers choose us
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Travel smarter with BorderBus
              </h2>
              <p className="mt-4 max-w-3xl text-sm text-[var(--text-muted)] sm:text-base">
                From route planning to seat selection, we give you the tools to
                book faster, travel safer, and stay informed every step of the
                journey.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev)] p-5 text-center"
                >
                  <div className="text-3xl font-semibold text-[var(--text)]">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="mx-auto w-full max-w-6xl px-4 pb-24" {...fadeUp}>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Customer stories
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Real travelers, real journeys
            </h2>
          </div>
          <div className="grid gap-6 xl:grid-cols-3">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
              >
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  “{testimonial.quote}”
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-[var(--text)]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {testimonial.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="mx-auto w-full max-w-6xl px-4 pb-24" {...fadeUp}>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Trusted operators
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Partnered with reliable operators
              </h2>
              <p className="mt-4 max-w-3xl text-sm text-[var(--text-muted)] sm:text-base">
                We work with top bus companies across West Africa to ensure every
                route is covered by experienced staff, safe vehicles, and
                predictable schedules.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--text-muted)]">
                {partners.map((partner) => (
                  <span
                    key={partner}
                    className="rounded-full border border-[var(--border)] bg-[var(--bg-elev)] px-4 py-2"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev)] p-5">
                <div className="flex items-center gap-3 text-[var(--accent)]">
                  <FiShield />
                  <span className="font-semibold">Safety first</span>
                </div>
                <p className="mt-3 text-sm text-[var(--text-muted)]">
                  We screen operators for cleaner buses, valid licenses, and
                  punctual departures.
                </p>
              </div>
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev)] p-5">
                <div className="flex items-center gap-3 text-[var(--accent)]">
                  <FiTrendingUp />
                  <span className="font-semibold">Transparent fares</span>
                </div>
                <p className="mt-3 text-sm text-[var(--text-muted)]">
                  Prices include fees and seat details so there are no surprises
                  at checkout.
                </p>
              </div>
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev)] p-5">
                <div className="flex items-center gap-3 text-[var(--accent)]">
                  <FiUsers />
                  <span className="font-semibold">Support anytime</span>
                </div>
                <p className="mt-3 text-sm text-[var(--text-muted)]">
                  Our team is available around the clock to answer questions
                  before and during your trip.
                </p>
              </div>
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev)] p-5">
                <div className="flex items-center gap-3 text-[var(--accent)]">
                  <FiStar />
                  <span className="font-semibold">Highly rated</span>
                </div>
                <p className="mt-3 text-sm text-[var(--text-muted)]">
                  Thousands of travelers rate our platform excellent for cross-border travel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="mx-auto w-full max-w-6xl px-4 pb-24" {...fadeUp}>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <div className="mt-8 grid gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-3xl border border-[var(--border)] bg-[var(--bg-elev)] p-6"
              >
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm text-[var(--text-muted)]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="mx-auto w-full max-w-6xl px-4 pb-24" {...fadeUp}>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Ready to travel
              </p>
              <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Launch your next international trip with confidence
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-[var(--text-muted)] sm:text-base">
                Join thousands of travelers booking cross-border bus travel on a
                platform built for fast search, full transparency, and modern
                travel convenience.
              </p>
            </div>
            <MotionLink
              to="/signup"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#1d9bf0] via-[#3bb2ff] to-[#1d9bf0] px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(29,155,240,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgba(29,155,240,0.45)]"
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
