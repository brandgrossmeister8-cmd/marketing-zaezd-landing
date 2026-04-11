import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Calendar, Video, Timer, Gift, CalendarPlus } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import confetti from 'canvas-confetti'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '@/config/firebase'
import RegistrationModal from '@/components/RegistrationModal'

export interface GameSlot {
  id: string
  date: string
  time: string
  totalSpots: number
  registeredCount: number
  consultant?: string
}

function getDayNumber(dateStr: string): number {
  return new Date(dateStr + 'T00:00:00').getDate()
}

function getWeekdayShort(dateStr: string): string {
  const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
  const d = new Date(dateStr + 'T00:00:00')
  return days[d.getDay()]
}

function SpotsIndicator({ registered, total }: { registered: number, total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const dots = Array.from({ length: total }, (_, i) => i < registered)

  return (
    <div ref={ref} className="flex items-center gap-1">
      {dots.map((filled, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.3 + i * 0.05, type: 'spring', stiffness: 300 }}
          className="w-2 h-2 rounded-full"
          style={{ background: filled ? '#A977FA' : 'rgba(255,255,255,0.1)' }}
        />
      ))}
    </div>
  )
}

function getMonthFull(dateStr: string): string {
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  return months[new Date(dateStr + 'T00:00:00').getMonth()]
}

export default function ScheduleSection() {
  const [slots, setSlots] = useState<GameSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<GameSlot | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const orbLeftY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const orbRightY = useTransform(scrollYProgress, [0, 1], ['5%', '-10%'])

  useEffect(() => {
    const q = query(collection(db, 'gameSlots'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: GameSlot[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as GameSlot[]
      data.sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
      setSlots(data)
    })
    return () => unsubscribe()
  }, [])

  const fireConfetti = () => {
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 }, colors: ['#4338DF', '#FFD700', '#A977FA', '#6838CE', '#B8ACFF'] })
  }

  // Группировка слотов по дате
  const slotsByDate = slots.reduce<Record<string, GameSlot[]>>((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = []
    acc[slot.date].push(slot)
    return acc
  }, {})
  const uniqueDates = Object.keys(slotsByDate).sort()

  if (slots.length === 0) return null

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="py-24 px-5 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #160B52 0%, #1E0F6E 40%, #2A168F 100%)' }}
    >
      {/* Decorative orbs with parallax */}
      <motion.div
        className="absolute top-20 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15"
        style={{ background: '#4338DF', y: orbLeftY }}
      />
      <motion.div
        className="absolute bottom-20 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-10"
        style={{ background: '#A977FA', y: orbRightY }}
      />

      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          {/* Top row: label + badges */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: 'rgba(255,215,0,0.1)' }}
            >
              <Calendar size={14} style={{ color: '#FFD700' }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#FFD700' }}>
                Расписание
              </span>
            </motion.div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Video, text: 'Онлайн / Zoom' },
                { icon: Timer, text: '90 минут' },
                { icon: Gift, text: 'Безоплатно' },
              ].map((badge, idx) => {
                const Icon = badge.icon
                return (
                  <motion.span
                    key={badge.text}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + idx * 0.08, type: 'spring', stiffness: 200 }}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: 'white' }}
                  >
                    <Icon size={12} /> {badge.text}
                  </motion.span>
                )
              })}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] leading-[1.15]">
            Календарь заездов
          </h2>
        </motion.div>

        {/* Компактный список слотов */}
        <div className="max-w-3xl mx-auto space-y-3">
          {uniqueDates.map((dateStr, dateIdx) => {
            const dateSlots = slotsByDate[dateStr]
            return (
              <div key={dateStr} className="space-y-3">
                {/* Разделитель даты */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: dateIdx * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3 pt-2"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold text-white">{getDayNumber(dateStr)}</span>
                    <span className="text-sm font-semibold" style={{ color: '#FFD700' }}>{getMonthFull(dateStr)}</span>
                    <span className="text-xs text-white/30">{getWeekdayShort(dateStr)}</span>
                  </div>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                </motion.div>

                {/* Слоты */}
                {dateSlots.map((slot, i) => {
                  const spotsLeft = slot.totalSpots - slot.registeredCount
                  return (
                    <motion.div
                      key={slot.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: dateIdx * 0.1 + i * 0.08, duration: 0.4 }}
                      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(104,56,206,0.12)' }}
                      className="rounded-xl px-5 py-4 flex items-center gap-4 transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}
                    >
                      {/* Время */}
                      <div className="shrink-0 text-center" style={{ minWidth: '60px' }}>
                        <p className="text-lg font-bold text-white leading-none">{slot.time}</p>
                        <p className="text-[10px] text-white/30 mt-0.5">МСК</p>
                      </div>

                      {/* Разделитель */}
                      <div className="w-px h-10 shrink-0" style={{ background: 'rgba(255,255,255,0.08)' }} />

                      {/* Инфо */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <SpotsIndicator registered={slot.registeredCount} total={slot.totalSpots} />
                          <span className="text-[11px] text-white/30">
                            {spotsLeft > 0 ? `${spotsLeft} мест` : 'мест нет'}
                          </span>
                        </div>
                        {slot.consultant && (
                          <p className="text-[11px] text-white/25 mt-1 truncate">{slot.consultant}</p>
                        )}
                      </div>

                      {/* Кнопка */}
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { fireConfetti(); setSelectedSlot(slot) }}
                        className="rounded-full px-5 py-2 text-sm font-bold cursor-pointer border-none shrink-0 transition-shadow duration-300 hover:shadow-lg hover:shadow-[#FF8C00]/25"
                        style={{
                          background: spotsLeft > 0 ? '#FF8C00' : 'rgba(255,255,255,0.06)',
                          color: spotsLeft > 0 ? 'white' : 'rgba(255,255,255,0.3)',
                          pointerEvents: spotsLeft > 0 ? 'auto' : 'none',
                        }}
                      >
                        {spotsLeft > 0 ? 'Записаться' : 'Занято'}
                      </motion.button>
                    </motion.div>
                  )
                })}
              </div>
            )
          })}

          {/* Предзапись — компактная */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between gap-4 rounded-xl px-5 py-3 mt-2"
            style={{ border: '1px dashed rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center gap-2.5">
              <CalendarPlus size={16} style={{ color: '#FFD700' }} />
              <span className="text-sm text-white/50">Нет подходящей даты?</span>
            </div>
            <button
              onClick={() => { fireConfetti(); setSelectedSlot({ id: 'predzapis', date: '', time: '', totalSpots: 99, registeredCount: 0 }) }}
              className="text-sm font-semibold cursor-pointer border-none bg-transparent transition-colors"
              style={{ color: '#FFD700' }}
            >
              Предзапись →
            </button>
          </motion.div>

          {/* Подсказка */}
          <p className="text-center text-[11px] pt-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Не получается? Напишите в{' '}
            <a href="https://t.me/brandgros" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'rgba(255,255,255,0.35)' }}>
              @brandgros
            </a>
          </p>
        </div>

        {/* Скрытая ссылка на админку */}
        <a
          href="#/admin-schedule"
          className="block mt-8 text-[10px] text-white/10 hover:text-white/30 transition-colors text-center no-underline"
        >
          ⚙
        </a>
      </div>

      {/* Модалка регистрации */}
      {selectedSlot && (
        <RegistrationModal
          slotId={selectedSlot.id}
          date={selectedSlot.date}
          time={selectedSlot.time}
          onClose={() => setSelectedSlot(null)}
          onSuccess={() => fireConfetti()}
        />
      )}
    </section>
  )
}
