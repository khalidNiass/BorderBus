import { useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/bus.jfif'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Signup({ theme, onToggleTheme }) {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState(0)

  const steps = [
    { key: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
    { key: 'email', label: 'Email address', type: 'email', placeholder: 'you@borderbus.com' },
    { key: 'phone', label: 'Phone number', type: 'tel', placeholder: '+1 555 000 1234' },
    { key: 'password', label: 'Password', type: 'password', placeholder: 'Create a password' },
    { key: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm your password' },
  ]

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

    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email address is required.'
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!form.phone.trim()) {
      nextErrors.phone = 'Phone number is required.'
    }

    if (!form.password.trim()) {
      nextErrors.password = 'Password is required.'
    }

    if (!form.confirmPassword.trim()) {
      nextErrors.confirmPassword = 'Please confirm your password.'
    } else if (form.password.trim() !== form.confirmPassword.trim()) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      console.log('Simulated signup', form)
    }
  }

  const validateStep = (index) => {
    const current = steps[index]
    const value = form[current.key]?.trim()
    const nextErrors = {}

    if (!value) {
      nextErrors[current.key] = `${current.label} is required.`
    } else if (current.key === 'email' && !emailPattern.test(value)) {
      nextErrors.email = 'Please enter a valid email address.'
    } else if (
      current.key === 'confirmPassword' &&
      form.password.trim() !== form.confirmPassword.trim()
    ) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const handleBack = () => {
    setErrors({})
    setStep((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              theme === 'dark'
                ? 'linear-gradient(180deg, rgba(0,0,0,0.82), rgba(0,0,0,0.7), rgba(11,13,18,1))'
                : 'linear-gradient(180deg, rgba(248,250,252,0.92), rgba(248,250,252,0.8), rgba(248,250,252,1))',
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
                Create your account
              </h1>
              <p className="mt-4 max-w-xl text-base text-[var(--text-muted)] sm:text-lg">
                Join BorderBus to book trips faster, save routes, and access
                live updates in seconds.
              </p>
            </div>

            <div className="w-full max-w-md justify-self-start rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.55)] sm:p-8 lg:justify-self-end">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-[var(--text)]">Sign up</h2>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Create your account in minutes
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Step {step + 1} of {steps.length}
                </div>

                <div>
                  <label
                    htmlFor={steps[step].key}
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]"
                  >
                    {steps[step].label}
                  </label>
                  <input
                    id={steps[step].key}
                    name={steps[step].key}
                    type={steps[step].type}
                    value={form[steps[step].key]}
                    onChange={handleChange}
                    placeholder={steps[step].placeholder}
                    className={`mt-2 w-full rounded-xl border bg-[var(--bg-elev)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                      errors[steps[step].key]
                        ? 'border-[var(--danger)] ring-1 ring-[var(--danger)]'
                        : 'border-[var(--border)]'
                    }`}
                  />
                  {errors[steps[step].key] && (
                    <p className="mt-2 text-xs text-[var(--danger)]">
                      {errors[steps[step].key]}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 0}
                    className="w-1/2 rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Back
                  </button>
                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-1/2 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(29,155,240,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(29,155,240,0.45)]"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-1/2 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(29,155,240,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(29,155,240,0.45)]"
                    >
                      Sign Up
                    </button>
                  )}
                </div>

                {step === steps.length - 1 && (
                  <>
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
                  </>
                )}
              </form>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--text-muted)]">
                <Link
                  to="/login"
                  className="text-[var(--text-muted)] transition hover:text-[var(--text)]"
                >
                  Already have an account?{' '}
                  <span className="text-[var(--accent)]">Login</span>
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
