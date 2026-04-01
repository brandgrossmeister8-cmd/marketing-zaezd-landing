import { motion, useScroll, useTransform } from 'framer-motion'
import {
  PackageSearch,
  Tag,
  HelpCircle,
  Megaphone,
  Users,
  Repeat,
  Route,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useRef } from 'react'

interface Stage {
  icon: LucideIcon
  city: string
  number: number
}

const stages: Stage[] = [
  { icon: PackageSearch, city: 'Ассортиминск', number: 1 },
  { icon: Tag, city: 'Продукто-Брендск', number: 2 },
  { icon: HelpCircle, city: 'Зачемград', number: 3 },
  { icon: Megaphone, city: 'Траффик-Сити', number: 4 },
  { icon: Users, city: 'Цалово', number: 5 },
  { icon: Repeat, city: 'Выборг', number: 6 },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const orbLeftY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const orbRightY = useTransform(scrollYProgress, [0, 1], ['5%', '-10%'])

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-24 px-5 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #160B52 0%, #1E0F6E 40%, #2A168F 100%)' }}
    >
      {/* Decorative orbs with parallax */}
      <motion.div
        className="absolute top-20 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
        style={{ background: '#4338DF', y: orbLeftY }}
      />
      <motion.div
        className="absolute bottom-20 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-15"
        style={{ background: '#A977FA', y: orbRightY }}
      />

      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          {/* Top row: label + badge */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: 'rgba(255,215,0,0.1)' }}
            >
              <Route size={14} style={{ color: '#FFD700' }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#FFD700' }}>
                Маршрут
              </span>
            </motion.div>
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="rounded-2xl px-5 py-3" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Zap size={14} style={{ color: '#FFD700' }} />
                <span className="text-sm font-bold text-white">Старт: 60 км/ч → Финиш: до 120 км/ч</span>
              </div>
              <p className="text-xs text-white/40">Каждый пит-стоп ±10 км/ч к вашей скорости</p>
            </motion.div>
          </div>

          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] leading-[1.15]">
            Как проходит заезд
          </h2>
        </motion.div>

        {/* Horizontal race track timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 hidden sm:block"
        >
          <div className="flex items-center justify-between px-4">
            {stages.map((_, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4, type: 'spring', stiffness: 300 }}
                  className="h-4 w-4 rounded-full shrink-0 relative z-10"
                  style={{
                    background: i < 3 ? '#6838CE' : i < 5 ? '#FF8C00' : '#FFD700',
                    boxShadow: `0 0 12px ${i < 3 ? 'rgba(104,56,206,0.4)' : i < 5 ? 'rgba(255,140,0,0.4)' : 'rgba(255,215,0,0.4)'}`,
                  }}
                />
                {i < stages.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                    className="h-[2px] flex-1 origin-left"
                    style={{
                      background: i < 2
                        ? 'linear-gradient(90deg, #6838CE, #6838CE)'
                        : i < 4
                        ? 'linear-gradient(90deg, #FF8C00, #FF8C00)'
                        : 'linear-gradient(90deg, #FFD700, #FFD700)',
                      opacity: 0.5,
                    }}
                  />
                )}
              </div>
            ))}
            {/* Finish flag */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.4, type: 'spring' }}
              className="ml-4 text-2xl"
            >
              🏁
            </motion.div>
          </div>
        </motion.div>

        {/* 3x2 grid of cards with stagger */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stages.map((stage) => {
            const Icon = stage.icon
            return (
              <motion.div
                key={stage.city}
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.02, background: 'rgba(255,255,255,0.08)' }}
                className="group rounded-2xl p-5 transition-colors duration-500"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Number in purple circle */}
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: '#6838CE' }}
                  >
                    {stage.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: '#FFD700' }}>
                        ПИТ-СТОП {stage.number}
                      </span>
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + stage.number * 0.08, type: 'spring', stiffness: 200 }}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(134,239,172,0.15)', color: '#86efac' }}
                      >
                        +10 км/ч
                      </motion.span>
                    </div>
                    {/* Icon in purple square */}
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.15 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg mb-2"
                      style={{ background: 'rgba(169,119,250,0.15)' }}
                    >
                      <Icon size={16} strokeWidth={1.5} style={{ color: '#A977FA' }} />
                    </motion.div>
                    <h3 className="text-[15px] font-bold text-white/90 leading-tight">
                      {stage.city}
                    </h3>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom bar: Finish */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 rounded-2xl p-6"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl">🏁</span>
              <div>
                <p className="text-base font-bold text-white">Финиш: ваша персональная скорость</p>
                <p className="text-sm text-white/40">Калькулятор упущенной выгоды + дорожная карта роста</p>
              </div>
            </div>
            {/* Speed scale with stagger */}
            <div className="flex items-center gap-1">
              {[0, 30, 60, 90, 120].map((speed, idx) => (
                <motion.div
                  key={speed}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.08, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold"
                  style={{
                    background: speed >= 90 ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)',
                    color: speed >= 90 ? '#FFD700' : 'rgba(255,255,255,0.3)',
                    border: speed >= 90 ? '1px solid rgba(255,215,0,0.3)' : '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {speed} км/ч
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
