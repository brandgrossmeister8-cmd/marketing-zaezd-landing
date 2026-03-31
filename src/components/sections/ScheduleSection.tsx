import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
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
    <section
      id="schedule"
      className="py-24 px-5 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDFBFF 0%, #F5F0FF 50%, #EDE5FF 100%)' }}
    >
      {/* Decorative orb */}
      <div
        className="absolute top-20 left-0 w-[350px] h-[350px] rounded-full blur-[100px] opacity-20"
        style={{ background: 'radial-gradient(circle, #B8ACFF, transparent 70%)' }}
      />

      <div className="mx-auto max-w-2xl relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: '#A977FA' }}
          >
            Расписание
          </p>
          <h2
            className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem] leading-[1.15] mb-4"
            style={{ color: '#2A168F' }}
          >
            Ближайшие заезды
          </h2>
          <p className="text-[15px]" style={{ color: '#8B7BAE' }}>
            Выберите удобную дату и запишитесь
          </p>
        </motion.div>

        <div className="space-y-4">
          {slots.map((slot, i) => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-5 sm:p-6 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(104,56,206,0.08)] hover:-translate-y-0.5 gap-4"
              style={{ border: '1px solid rgba(169,119,250,0.08)' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(104,56,206,0.06), rgba(169,119,250,0.1))', color: '#6838CE' }}
                >
                  <Calendar size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[15px] font-bold" style={{ color: '#2A168F' }}>
                    {formatDate(slot.date)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={13} style={{ color: '#B8ACFF' }} strokeWidth={2} />
                    <span className="text-sm" style={{ color: '#8B7BAE' }}>{slot.time} (МСК)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                <p className="text-xs font-medium" style={{ color: '#B8ACFF' }}>
                  {slot.spots > 0 ? `${slot.spots} мест` : 'Мест нет'}
                </p>
                <a
                  href="https://t.me/SystemPromoBot?start=c1774180920281-ds"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={fireConfetti}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#FF8C00]/20 hover:brightness-105"
                  style={{
                    background: '#FF8C00',
                    color: 'white',
                    pointerEvents: slot.spots > 0 ? 'auto' : 'none',
                    opacity: slot.spots > 0 ? 1 : 0.4,
                  }}
                >
                  {slot.spots > 0 ? 'Записаться' : 'В лист ожидания'}
                  <ArrowRight size={14} strokeWidth={2} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pre-registration card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-5 text-center rounded-2xl bg-white/70 backdrop-blur-sm p-6"
          style={{ border: '1px dashed rgba(169,119,250,0.15)' }}
        >
          <p className="text-sm mb-4" style={{ color: '#8B7BAE' }}>
            Нет подходящей даты? Запишитесь заранее
          </p>
          <a
            href="https://t.me/SystemPromoBot?start=c1774180920281-ds"
            target="_blank"
            rel="noopener noreferrer"
            onClick={fireConfetti}
            className="inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#FF8C00]/20 hover:brightness-105"
            style={{ background: '#FF8C00', color: 'white' }}
          >
            Предзапись на заезд
            <ArrowRight size={14} strokeWidth={2} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
