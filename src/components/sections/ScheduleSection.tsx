import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Calendar, Clock, Flag, Video, Timer, Gift, CalendarPlus } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import confetti from 'canvas-confetti'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '@/config/firebase'

export interface GameSlot {
  id: string
  date: string
  time: string
  totalSpots: number
  registeredCount: number
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

function AnimatedProgressBar({ fillPercent }: { fillPercent: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="mt-3">
      <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${fillPercent}%` } : { width: '0%' }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          style={{ background: 'linear-gradient(90deg, #4338DF, #A977FA)' }}
        />
      </div>
      <div className="flex justify-between mt-1 text-[10px] text-white/20">
        <span>свободно</span>
        <span>заполнено</span>
      </div>
    </div>
  )
}

export default function ScheduleSection() {
  const [slots, setSlots] = useState<GameSlot[]>([])
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

  if (slots.length === 0) return null

  const firstSlot = slots[0]

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

        {/* Layout: date card LEFT, time slots RIGHT */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Large date card - slides from left */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-2 rounded-2xl p-8 flex flex-col items-center justify-center text-center"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <motion.p
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-sm font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#FFD700' }}
            >
              {getMonthShort(firstSlot.date)}
            </motion.p>
            <motion.p
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 150 }}
              className="text-7xl sm:text-8xl font-bold text-white leading-none mb-2"
            >
              {getDayNumber(firstSlot.date)}
            </motion.p>
            <p className="text-lg font-semibold text-white/60">
              {getWeekdayShort(firstSlot.date)}
            </p>
          </motion.div>

          {/* Time slots - slide from right */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {slots.map((slot, i) => {
              const spotsLeft = slot.totalSpots - slot.registeredCount
              const fillPercent = (slot.registeredCount / slot.totalSpots) * 100
              return (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(104,56,206,0.15)' }}
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
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: 'rgba(169,119,250,0.15)', color: '#B8ACFF' }}
                      >
                        {spotsLeft > 0 ? `${spotsLeft} из ${slot.totalSpots}` : 'Мест нет'}
                      </motion.span>
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
                        pointerEvents: spotsLeft > 0 ? 'auto' : 'none',
                        opacity: spotsLeft > 0 ? 1 : 0.4,
                      }}
                    >
                      <Flag size={14} />
                      {spotsLeft > 0 ? 'Записаться' : 'В лист ожидания'}
                    </a>
                  </div>
                  {/* Animated progress bar */}
                  <AnimatedProgressBar fillPercent={fillPercent} />
                </motion.div>
              )
            })}

            {/* Pre-registration card */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px dashed rgba(255,255,255,0.12)',
              }}
            >
              <div className="flex items-center gap-3 flex-1">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full shrink-0" style={{ background: 'rgba(255,215,0,0.15)' }}
                >
                  <CalendarPlus size={18} style={{ color: '#FFD700' }} />
                </motion.div>
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
