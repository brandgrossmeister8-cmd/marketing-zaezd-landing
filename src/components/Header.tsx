import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Как работает', href: '#how-it-works' },
  { label: 'Результаты', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Отзывы', href: '#testimonials' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: 'rgba(42,22,143,0.95)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 lg:px-8">
        <a href="/" className="text-sm font-bold tracking-wide text-white lg:text-base whitespace-nowrap">
          ИМШИНЕЦКАЯ И ПАРТНЕРЫ
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => window.open('https://t.me/SystemPromoBot?start=c1774180920281-ds', '_blank')}
            className="ml-2 rounded-full px-5 py-2 text-sm font-bold hover:opacity-90 transition-colors cursor-pointer border-none"
            style={{ background: '#FFD700', color: '#6838CE' }}
          >
            Записаться на игру
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white bg-transparent border-none cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden backdrop-blur-xl px-4 pb-4" style={{ background: 'rgba(42,22,143,0.95)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="block w-full text-left py-3 text-white/70 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-base"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => window.open('https://t.me/SystemPromoBot?start=c1774180920281-ds', '_blank')}
            className="mt-2 w-full rounded-full px-5 py-3 text-sm font-bold hover:opacity-90 transition-colors cursor-pointer border-none"
            style={{ background: '#FFD700', color: '#6838CE' }}
          >
            Записаться на игру
          </button>
        </div>
      )}
    </header>
  )
}
