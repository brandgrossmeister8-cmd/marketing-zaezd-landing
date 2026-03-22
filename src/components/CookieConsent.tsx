import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-consent')
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-xl rounded-2xl bg-white backdrop-blur-xl p-5 shadow-2xl"
          style={{ border: '1px solid #A977FA' }}
        >
          <p className="text-sm mb-3" style={{ color: '#6838CE' }}>
            Мы используем файлы cookie для улучшения работы сайта.
            Продолжая использовать сайт, вы соглашаетесь с{' '}
            <Link to="/cookies" className="underline" style={{ color: '#A977FA' }}>
              политикой использования cookie
            </Link>.
          </p>
          <button
            onClick={accept}
            className="rounded-full px-6 py-2 text-sm font-semibold text-white hover:opacity-90 transition-colors cursor-pointer border-none"
            style={{ background: '#6838CE' }}
          >
            Принять
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
