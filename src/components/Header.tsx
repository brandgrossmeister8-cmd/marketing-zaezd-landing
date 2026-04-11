import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Этапы заезда', href: '#how-it-works' },
  { label: 'Демо', href: '#demo' },
  { label: 'Расписание', href: '#schedule' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Отзывы', href: '#testimonials' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(42,22,143,0.92)' : 'rgba(42,22,143,0.8)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        borderBottom: scrolled ? '1px solid rgba(169,119,250,0.12)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(30,15,110,0.3)' : 'none',
      }}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-5 py-3.5 lg:px-8">
        <a href="/" className="text-sm font-bold tracking-[0.08em] text-white lg:text-[15px] whitespace-nowrap">
          ИМШИНЕЦКАЯ И ПАРТНЕРЫ
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="text-[13px] text-white/60 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-all duration-300 cursor-pointer bg-transparent border-none"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#schedule')}
            className="ml-3 rounded-full px-5 py-2 text-[13px] font-bold transition-all duration-300 cursor-pointer border-none hover:shadow-lg hover:shadow-[#FF8C00]/25 hover:brightness-110"
            style={{ background: '#FF8C00', color: 'white' }}
          >
            Записаться
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white bg-transparent border-none cursor-pointer p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(30,15,110,0.98)', borderTop: '1px solid rgba(169,119,250,0.1)' }}
          >
            <div className="px-5 py-4 space-y-1">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNav(l.href)}
                  className="block w-full text-left py-3 px-3 rounded-xl text-white/70 hover:text-white hover:bg-white/[0.05] transition-all bg-transparent border-none cursor-pointer text-[15px]"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('#schedule')}
                className="mt-3 w-full rounded-full px-5 py-3 text-[15px] font-bold transition-all duration-300 cursor-pointer border-none"
                style={{ background: '#FF8C00', color: 'white' }}
              >
                Записаться на заезд
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
