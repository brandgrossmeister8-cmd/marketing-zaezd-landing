import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      className="py-10 px-5"
      style={{ background: '#2A168F', borderTop: '1px solid rgba(169,119,250,0.1)' }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-bold tracking-[0.08em] text-white/70">
            &copy; 2026 ИМШИНЕЦКАЯ И ПАРТНЕРЫ
          </p>
          <p className="text-xs text-white/30 leading-relaxed">
            ИП Архипов Владимир Владимирович &middot; ИНН 590301045341 &middot; ОГРН 307590422600013
          </p>
          <div
            className="w-12 h-px rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(169,119,250,0.3), transparent)' }}
          />
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/oferta"
              className="text-xs text-white/40 hover:text-white/70 transition-colors duration-300 no-underline"
            >
              Оферта
            </Link>
            <Link
              to="/privacy"
              className="text-xs text-white/40 hover:text-white/70 transition-colors duration-300 no-underline"
            >
              Политика конфиденциальности
            </Link>
            <Link
              to="/cookies"
              className="text-xs text-white/40 hover:text-white/70 transition-colors duration-300 no-underline"
            >
              Политика cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
