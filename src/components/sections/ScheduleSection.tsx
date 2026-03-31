import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

interface GameSlot {
  id: string
  date: string
  time: string
  spots: number
}

const STORAGE_KEY = 'game-schedule'

const defaultSlots: GameSlot[] = [
  { id: '1', date: '2026-04-10', time: '12:00', spots: 6 },
  { id: '2', date: '2026-04-10', time: '15:00', spots: 6 },
]

export function getSchedule(): GameSlot[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : defaultSlots
  } catch {
    return defaultSlots
  }
}

export function saveSchedule(slots: GameSlot[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slots))
}

function formatDate(dateStr: string): string {
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']
  const d = new Date(dateStr + 'T00:00:00')
  return `${d.getDate()} ${months[d.getMonth()]}, ${days[d.getDay()]}`
}

export default function ScheduleSection() {
  const [slots, setSlots] = useState<GameSlot[]>([])

  useEffect(() => {
    setSlots(getSchedule())
  }, [])

  const fireConfetti = () => {
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 }, colors: ['#4338DF', '#FFD700', '#A977FA', '#6838CE', '#B8ACFF'] })
  }

  if (slots.length === 0) return null

  return (
    <section id="schedule" className="py-16 px-4 sm:py-24" style={{ background: 'linear-gradient(180deg, #F9F7FF 0%, #F3EEFF 100%)' }}>
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl font-bold sm:text-3xl lg:text-[2.5rem] mb-3 leading-tight"
          style={{ color: '#2A168F' }}
        >
          Ближайшие заезды
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center mb-10 text-sm"
          style={{ color: '#8B7BAE' }}
        >
          Выберите удобную дату и запишитесь
        </motion.p>

        <div className="space-y-3">
          {slots.map((slot, i) => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 sm:p-5 transition-all duration-500 hover:shadow-xl hover:shadow-[#6838CE]/6 gap-3"
              style={{ border: '1px solid rgba(169,119,250,0.06)' }}
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(104,56,206,0.06), rgba(169,119,250,0.1))', color: '#6838CE' }}>
                  <Calendar size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: '#2A168F' }}>{formatDate(slot.date)}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock size={12} style={{ color: '#B8ACFF' }} strokeWidth={2} />
                    <span className="text-xs" style={{ color: '#8B7BAE' }}>{slot.time} (МСК)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
                <p className="text-[11px]" style={{ color: '#B8ACFF' }}>{slot.spots > 0 ? `${slot.spots} мест` : 'Мест нет'}</p>
                <a
                  href="https://t.me/SystemPromoBot?start=c1774180920281-ds" target="_blank" rel="noopener noreferrer"
                  onClick={fireConfetti}
                  className="inline-block rounded-full px-5 py-1.5 text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#FF8C00]/20 text-center"
                  style={{ background: '#FF8C00', color: 'white', pointerEvents: slot.spots > 0 ? 'auto' : 'none', opacity: slot.spots > 0 ? 1 : 0.4 }}
                >
                  {slot.spots > 0 ? 'Записаться' : 'В лист ожидания'}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-4 text-center rounded-2xl bg-white/60 backdrop-blur-sm p-5"
          style={{ border: '1px dashed rgba(169,119,250,0.12)' }}
        >
          <p className="text-sm mb-3" style={{ color: '#8B7BAE' }}>Нет подходящей даты? Запишитесь заранее</p>
          <a
            href="https://t.me/SystemPromoBot?start=c1774180920281-ds" target="_blank" rel="noopener noreferrer"
            onClick={fireConfetti}
            className="inline-block rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#FF8C00]/20"
            style={{ background: '#FF8C00', color: 'white' }}
          >
            Предзапись на заезд
          </a>
        </motion.div>
      </div>
    </section>
  )
}
