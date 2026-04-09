import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMoon, FiSun } from 'react-icons/fi'

export default function Navbar({ theme = 'dark', onToggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false)

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
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 text-[var(--text)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between gap-6">
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
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
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
          <Link
            to="/signup"
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(29,155,240,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(29,155,240,0.45)]"
          >
            Sign Up
          </Link>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)] md:hidden">
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
    </header>
  )
}
