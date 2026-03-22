import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

interface GameSlot {
  id: string
  date: string // "2026-04-09"
  time: string // "12:00"
  spots: number // свободных мест
}

const STORAGE_KEY = 'game-schedule'

const defaultSlots: GameSlot[] = [
  { id: '1', date: '2026-04-09', time: '12:00', spots: 6 },
  { id: '2', date: '2026-04-09', time: '15:00', spots: 6 },
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

  if (slots.length === 0) return null

  return (
    <section id="schedule" className="py-16 px-4 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-bold lg:text-4xl mb-4"
          style={{ color: '#2A168F' }}
        >
          Ближайшие игры
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-10"
          style={{ color: '#6838CE' }}
        >
          Выберите удобную дату и запишитесь
        </motion.p>

        <div className="space-y-4">
          {slots.map((slot, i) => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow gap-4"
              style={{ border: '1px solid #A977FA' }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #6838CE, #A977FA)' }}>
                  <Calendar size={22} />
                </div>
                <div>
                  <p className="font-bold" style={{ color: '#2A168F' }}>{formatDate(slot.date)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={14} style={{ color: '#A977FA' }} />
                    <span className="text-sm" style={{ color: '#6838CE' }}>{slot.time} (МСК)</span>
                  </div>
                </div>
              </div>
              <div className="sm:text-right flex sm:flex-col items-center sm:items-end gap-2">
                <p className="text-xs" style={{ color: '#A977FA' }}>
                  {slot.spots > 0 ? `${slot.spots} мест` : 'Мест нет'}
                </p>
                <a
                  href="https://t.me/SystemPromoBot?start=c1774180920281-ds" target="_blank" rel="noopener noreferrer"
                  className="inline-block rounded-full px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 text-center w-full sm:w-auto"
                  style={{ background: slot.spots > 0 ? '#6838CE' : '#A977FA', pointerEvents: slot.spots > 0 ? 'auto' : 'none' }}
                >
                  {slot.spots > 0 ? 'Записаться' : 'В лист ожидания'}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-6 text-center rounded-2xl bg-white p-6"
          style={{ border: '1px dashed #A977FA' }}
        >
          <p className="text-sm mb-3" style={{ color: '#6838CE' }}>
            Нет подходящей даты? Запишитесь заранее. Вы узнаете о новых датах первыми
          </p>
          <a
            href="https://t.me/SystemPromoBot?start=c1774180920281-ds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full px-6 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: '#A977FA', color: 'white' }}
          >
            Предзапись на игру
          </a>
        </motion.div>
      </div>
    </section>
  )
}
