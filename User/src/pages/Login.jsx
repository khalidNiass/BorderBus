import { useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/bus.jfif'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const initialState = {
  email: '',
  password: '',
}

export default function Login({ theme, onToggleTheme }) {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}

    if (!form.email.trim()) {
      nextErrors.email = 'Email address is required.'
    }

    if (!form.password.trim()) {
      nextErrors.password = 'Password is required.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      console.log('Simulated login', form)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            opacity: theme === 'dark' ? 0.35 : 1,
            filter:
              theme === 'dark'
                ? 'saturate(1.1)'
                : 'saturate(1.45) contrast(1.15) brightness(1.08)',
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              theme === 'dark'
                ? 'linear-gradient(180deg, rgba(0,0,0,0.82), rgba(0,0,0,0.7), rgba(11,13,18,1))'
                : 'linear-gradient(180deg, rgba(248,250,252,0.35), rgba(248,250,252,0.25), rgba(248,250,252,0.55))',
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              theme === 'dark'
                ? 'radial-gradient(circle at 20% 20%, rgba(29,155,240,0.15), transparent 55%)'
                : 'radial-gradient(circle at 20% 20%, rgba(29,155,240,0.18), transparent 60%)',
          }}
        ></div>
        <Navbar theme={theme} onToggleTheme={onToggleTheme} />

        <section className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                BorderBus
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
                Welcome back
              </h1>
              <p className="mt-4 max-w-xl text-base text-[var(--text-muted)] sm:text-lg">
                Sign in to manage bookings, track tickets, and stay on schedule.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.55)] sm:p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-[var(--text)]">Login</h2>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Use your BorderBus account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@borderbus.com"
                    className={`mt-2 w-full rounded-xl border bg-[var(--bg-elev)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                      errors.email
                        ? 'border-[var(--danger)] ring-1 ring-[var(--danger)]'
                        : 'border-[var(--border)]'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-xs text-[var(--danger)]">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`mt-2 w-full rounded-xl border bg-[var(--bg-elev)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                      errors.password
                        ? 'border-[var(--danger)] ring-1 ring-[var(--danger)]'
                        : 'border-[var(--border)]'
                    }`}
                  />
                  {errors.password && (
                    <p className="mt-2 text-xs text-[var(--danger)]">
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(29,155,240,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(29,155,240,0.45)]"
                >
                  Login
                </button>

                <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                  <span className="h-px flex-1 bg-[var(--border)]"></span>
                  or
                  <span className="h-px flex-1 bg-[var(--border)]"></span>
                </div>

                <button
                  type="button"
                  className="w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Continue with Google
                </button>
              </form>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--text-muted)]">
                <a
                  href="#"
                  className="text-[var(--accent)] transition hover:underline"
                >
                  Forgot Password?
                </a>
                <Link
                  to="/signup"
                  className="text-[var(--text-muted)] transition hover:text-[var(--text)]"
                >
                  Don&apos;t have an account?{' '}
                  <span className="text-[var(--accent)]">Sign Up</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
