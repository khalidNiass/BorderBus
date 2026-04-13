import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMoon, FiSun, FiMenu } from 'react-icons/fi'

export default function Navbar({ theme = 'dark', onToggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const companyLink = import.meta.env.VITE_COMPANY_LOGIN_URL || '/company/login'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClass =
    'relative text-sm text-[var(--text-muted)] transition hover:text-[var(--text)] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[var(--accent)] after:transition after:duration-300 hover:after:scale-x-100'

  return (
    <header
      className={`fixed top-0 z-30 w-full border-b border-[var(--border)] backdrop-blur-lg transition ${
        isScrolled ? 'shadow-[0_16px_40px_rgba(0,0,0,0.35)]' : ''
      }`}
      style={{
        backgroundColor:
          theme === 'dark'
            ? isScrolled
              ? 'rgba(8,11,18,0.92)'
              : 'rgba(8,11,18,0.65)'
            : isScrolled
            ? 'rgba(248,250,252,0.96)'
            : 'rgba(248,250,252,0.75)',
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 text-[var(--text)] sm:px-6 sm:py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-semibold tracking-wide">
            BorderBus
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-[var(--text-muted)] md:flex">
            <Link to="/" className={linkClass}>
              Home
            </Link>
            <a href="/#about" className={linkClass}>
              About
            </a>
            <a href="/#features" className={linkClass}>
              Features
            </a>
            <a href="/#contact" className={linkClass}>
              Contact
            </a>
          </nav>
        </div>

        <div className="hidden items-center justify-end gap-3 text-sm text-[var(--text-muted)] md:flex md:w-auto">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <Link
            to="/login"
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
          >
            Login
          </Link>
          <a
            href={companyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
          >
            Company Portal
          </a>
          <Link
            to="/signup"
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(29,155,240,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(29,155,240,0.45)]"
          >
            Sign Up
          </Link>
        </div>

        <div className="flex items-center justify-end gap-2 md:hidden">
          <Link
            to="/login"
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
          >
            Sign In
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            aria-label="Open menu"
          >
            <FiMenu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-[var(--border)] bg-[var(--bg-card)]/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] text-[var(--text)] md:hidden">
          <nav className="flex flex-col gap-3">
            <Link
              to="/"
              className="rounded-2xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="/#about"
              className="rounded-2xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="/#features"
              className="rounded-2xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="/#contact"
              className="rounded-2xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Link
              to="/signup"
              className="rounded-2xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
            <a
              href={companyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Company Portal
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
