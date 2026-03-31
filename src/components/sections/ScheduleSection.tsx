import { motion } from 'framer-motion'
import { Calendar, Clock, Flag, Video, Timer, Gift, CalendarPlus } from 'lucide-react'
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

function getMonthShort(dateStr: string): string {
  const months = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК']
  const d = new Date(dateStr + 'T00:00:00')
  return months[d.getMonth()]
}

function getDayNumber(dateStr: string): number {
  return new Date(dateStr + 'T00:00:00').getDate()
}

function getWeekdayShort(dateStr: string): string {
  const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
  const d = new Date(dateStr + 'T00:00:00')
  return days[d.getDay()]
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

  const firstSlot = slots[0]

  return (
    <section
      id="schedule"
      className="py-24 px-5 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #160B52 0%, #1E0F6E 40%, #2A168F 100%)' }}
    >
      {/* Decorative orbs */}
      <div
        className="absolute top-20 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15"
        style={{ background: '#4338DF' }}
      />
      <div
        className="absolute bottom-20 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-10"
        style={{ background: '#A977FA' }}
      />

      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          {/* Top row: label + badges */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: 'rgba(255,215,0,0.1)' }}>
              <Calendar size={14} style={{ color: '#FFD700' }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#FFD700' }}>
                Расписание
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                <Video size={12} /> Онлайн / Zoom
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                <Timer size={12} /> 90 минут
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: 'white' }}>
                <Gift size={12} /> Безоплатно
              </span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] leading-[1.15]">
            Календарь заездов
          </h2>
        </motion.div>

        {/* Layout: date card LEFT, time slots RIGHT */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Large date card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 rounded-2xl p-8 flex flex-col items-center justify-center text-center"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#FFD700' }}>
              {getMonthShort(firstSlot.date)}
            </p>
            <p className="text-7xl sm:text-8xl font-bold text-white leading-none mb-2">
              {getDayNumber(firstSlot.date)}
            </p>
            <p className="text-lg font-semibold text-white/60">
              {getWeekdayShort(firstSlot.date)}
            </p>
          </motion.div>

          {/* Time slots */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {slots.map((slot, i) => {
              const totalSpots = 6
              const filled = totalSpots - slot.spots
              const fillPercent = (filled / totalSpots) * 100
              return (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="rounded-2xl p-5"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Clock size={16} style={{ color: '#B8ACFF' }} />
                        <span className="text-lg font-bold text-white">{slot.time}</span>
                        <span className="text-sm text-white/40">МСК</span>
                      </div>
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: 'rgba(169,119,250,0.15)', color: '#B8ACFF' }}
                      >
                        {slot.spots} из {totalSpots}
                      </span>
                    </div>
                    <a
                      href="https://t.me/SystemPromoBot?start=c1774180920281-ds"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={fireConfetti}
                      className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#FF8C00]/30 hover:brightness-105 no-underline shrink-0"
                      style={{
                        background: '#FF8C00',
                        color: 'white',
                        pointerEvents: slot.spots > 0 ? 'auto' : 'none',
                        opacity: slot.spots > 0 ? 1 : 0.4,
                      }}
                    >
                      <Flag size={14} />
                      {slot.spots > 0 ? 'Записаться' : 'В лист ожидания'}
                    </a>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                        style={{ width: `${fillPercent}%`, background: 'linear-gradient(90deg, #4338DF, #A977FA)' }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-[10px] text-white/20">
                      <span>свободно</span>
                      <span>заполнено</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Pre-registration card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px dashed rgba(255,255,255,0.12)',
              }}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-full shrink-0" style={{ background: 'rgba(255,215,0,0.15)' }}>
                  <CalendarPlus size={18} style={{ color: '#FFD700' }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Нет подходящей даты?</p>
                  <p className="text-xs text-white/40">Запишитесь заранее — узнаете о новых заездах первыми</p>
                </div>
              </div>
              <a
                href="https://t.me/SystemPromoBot?start=c1774180920281-ds"
                target="_blank"
                rel="noopener noreferrer"
                onClick={fireConfetti}
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 hover:shadow-lg no-underline shrink-0"
                style={{ background: 'white', color: '#2A168F' }}
              >
                Предзапись на заезд
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
