import { FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[var(--border)] bg-[var(--bg-card)]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 text-sm text-[var(--text-muted)] md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <h3 className="text-base font-semibold text-[var(--text)]">BorderBus</h3>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            BorderBus makes inter-state and international bus travel seamless,
            with real-time updates and secure booking.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[var(--text)]">Company</h4>
          <div className="mt-3 grid gap-2 text-sm">
            <a href="/about" className="transition hover:text-[var(--text)]">
              About
            </a>
            <a href="/routes" className="transition hover:text-[var(--text)]">
              Routes
            </a>
            <a href="/operators" className="transition hover:text-[var(--text)]">
              Partners
            </a>
            <a href="/contact" className="transition hover:text-[var(--text)]">
              Contact
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[var(--text)]">Contact</h4>
          <p className="mt-3 text-sm text-[var(--text-muted)]">support@borderbus.com</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">+1 (212) 555-0147</p>
          <div className="mt-4 flex items-center gap-3 text-lg text-[var(--text-muted)]">
            <a
              href="#"
              className="rounded-full border border-[var(--border)] p-2 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              aria-label="Follow BorderBus on Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="rounded-full border border-[var(--border)] p-2 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              aria-label="Follow BorderBus on Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="rounded-full border border-[var(--border)] p-2 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              aria-label="Follow BorderBus on LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[var(--text)]">Newsletter</h4>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            Get new routes, promo fares, and travel tips.
          </p>
          <form className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-full border border-[var(--border)] bg-[var(--bg-elev)] px-4 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <button
              type="submit"
              className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(29,155,240,0.35)]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-[var(--text-muted)] sm:flex-row">
          <span>© {new Date().getFullYear()} BorderBus. All rights reserved.</span>
          <span>Travel smarter across borders.</span>
        </div>
      </div>
    </footer>
  )
}
