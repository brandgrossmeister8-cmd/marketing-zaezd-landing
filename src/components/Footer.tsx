import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="py-10 px-4" style={{ background: '#2A168F', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-4 text-center text-sm text-white/50">
        <p>&copy; 2026 ИМШИНЕЦКАЯ И ПАРТНЕРЫ</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/privacy" className="hover:text-white transition-colors underline">
            Политика конфиденциальности
          </Link>
          <Link to="/cookies" className="hover:text-white transition-colors underline">
            Политика cookies
          </Link>
        </div>
      </div>
    </footer>
  )
}
