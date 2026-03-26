import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="py-10 px-4" style={{ background: '#2A168F', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-4 text-center text-sm text-white/50">
        <p>&copy; 2026 ИМШИНЕЦКАЯ И ПАРТНЕРЫ</p>
        <p className="text-xs text-white/40">ИП Архипов Владимир Владимирович &middot; ИНН 590301045341 &middot; ОГРН 307590422600013</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/oferta" className="text-white/60 hover:text-white transition-colors underline cursor-pointer relative z-10">
            Оферта
          </Link>
          <Link to="/privacy" className="text-white/60 hover:text-white transition-colors underline cursor-pointer relative z-10">
            Политика конфиденциальности
          </Link>
          <Link to="/cookies" className="text-white/60 hover:text-white transition-colors underline cursor-pointer relative z-10">
            Политика cookies
          </Link>
        </div>
      </div>
    </footer>
  )
}
