import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react'

interface Props {
  slotId: string
  date: string
  time: string
  onClose: () => void
  onSuccess?: () => void
}

const API_URL = '/api/register'

export default function RegistrationModal({ slotId, date, time, onClose, onSuccess }: Props) {
  const [name, setName] = useState('')
  const [telegram, setTelegram] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [business, setBusiness] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const formatDate = (d: string) => {
    try {
      return new Date(d + 'T00:00:00').toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' })
    } catch { return d }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !business.trim() || !city.trim() || !telegram.trim()) return

    setStatus('loading')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotId,
          name: name.trim(),
          phone: [telegram.trim(), email.trim()].filter(Boolean).join(' | '),
          comment: [business.trim(), city.trim() ? `Город: ${city.trim()}` : ''].filter(Boolean).join('. '),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.error === 'Нет свободных мест' ? 'К сожалению, все места заняты' : 'Ошибка отправки, попробуйте ещё раз')
        return
      }
      setStatus('success')
      onSuccess?.()
    } catch {
      setStatus('error')
      setErrorMsg('Ошибка сети, попробуйте ещё раз')
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(22, 11, 82, 0.85)', backdropFilter: 'blur(8px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md rounded-2xl p-6 sm:p-8"
          style={{
            background: 'linear-gradient(170deg, #1E0F6E 0%, #2A168F 100%)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          {/* Закрыть */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full cursor-pointer border-none transition-colors"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
          >
            <X size={18} />
          </button>

          {status === 'success' ? (
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <CheckCircle size={56} style={{ color: '#22c55e' }} className="mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Вы записаны!</h3>
              <p className="text-white/50 text-sm mb-1">{formatDate(date)}, {time} МСК</p>
              <p className="text-white/40 text-xs mt-4">
                Ссылка на встречу придёт в Telegram или на почту
                <br />за час до начала заезда.
                <br /><br />Сохраните себе напоминание в календаре,
                <br />чтобы не пропустить встречу!
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-8 py-2.5 rounded-full font-semibold cursor-pointer border-none text-sm"
                style={{ background: '#6838CE', color: 'white' }}
              >
                Отлично
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-white mb-1">
                {slotId === 'predzapis' ? 'Предзапись на заезд' : 'Запись на заезд'}
              </h3>
              {slotId !== 'predzapis' && (
                <p className="text-sm mb-6" style={{ color: '#B8ACFF' }}>
                  {formatDate(date)}, {time} МСК
                </p>
              )}
              {slotId === 'predzapis' && (
                <p className="text-sm mb-6" style={{ color: '#B8ACFF' }}>
                  Мы свяжемся, когда появится подходящая дата
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: '#B8ACFF' }}>
                    Имя *
                  </label>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Как вас зовут"
                    required
                    className="w-full p-3 rounded-xl text-white text-sm outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: '#B8ACFF' }}>
                    Ваш бизнес *
                  </label>
                  <input
                    value={business}
                    onChange={e => setBusiness(e.target.value)}
                    placeholder="Чем занимаетесь"
                    required
                    className="w-full p-3 rounded-xl text-white text-sm outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: '#B8ACFF' }}>
                    Город *
                  </label>
                  <input
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Ваш город"
                    required
                    className="w-full p-3 rounded-xl text-white text-sm outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: '#B8ACFF' }}>
                    Telegram *
                  </label>
                  <input
                    value={telegram}
                    onChange={e => {
                      let v = e.target.value
                      if (v && !v.startsWith('@')) v = '@' + v.replace(/^@+/, '')
                      setTelegram(v)
                    }}
                    placeholder="@username"
                    required
                    className="w-full p-3 rounded-xl text-white text-sm outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: '#B8ACFF' }}>
                    Электронная почта
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full p-3 rounded-xl text-white text-sm outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-sm p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5' }}>
                    <AlertCircle size={16} />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!name.trim() || !business.trim() || !city.trim() || !telegram.trim() || status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-base cursor-pointer border-none transition-all duration-300 disabled:opacity-40"
                  style={{ background: '#FF8C00', color: 'white' }}
                >
                  {status === 'loading' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
                    />
                  ) : (
                    <>
                      <Send size={16} />
                      Записаться
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-[11px] mt-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Или запишитесь через{' '}
                <a
                  href="https://t.me/SystemPromoBot?start=c1774180920281-ds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  Telegram-бот
                </a>
              </p>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
