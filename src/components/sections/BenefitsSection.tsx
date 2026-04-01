import { motion, useScroll, useTransform } from 'framer-motion'
import { Stethoscope, Calculator, Map, UsersRound, CheckCircle, Gift, Trophy, Flag } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useRef } from 'react'

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
  bullets: string[]
}

const benefits: Benefit[] = [
  {
    icon: Stethoscope,
    title: 'Диагностика маркетинга',
    description: 'Сильные и слабые точки по 6 ключевым параметрам',
    bullets: ['Оценка каждого пит-стопа', 'Визуальный спидометр'],
  },
  {
    icon: Calculator,
    title: 'Калькулятор потерь',
    description: 'Конкретные цифры упущенной выгоды в процентах',
    bullets: ['Потери в процентах', 'Каскадный эффект'],
  },
  {
    icon: Map,
    title: 'Дорожная карта',
    description: 'Пошаговый план роста с приоритетами',
    bullets: ['Что исправить первым', 'Рекомендации по каждому этапу'],
  },
  {
    icon: UsersRound,
    title: 'Командная синхронизация',
    description: 'Единое понимание маркетинга для всей команды',
    bullets: ['До 6 человек из одной компании', 'Общий язык после заезда'],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
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

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const orbY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  const handleCTA = () => {
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 }, colors: ['#4338DF', '#FFD700', '#A977FA', '#6838CE', '#B8ACFF'] })
    window.open('https://t.me/SystemPromoBot?start=c1774180920281-ds', '_blank')
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 px-5 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDFBFF 0%, #F8F5FF 100%)' }}
    >
      {/* Decorative orb with parallax */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
        style={{ background: 'radial-gradient(circle, #B8ACFF, transparent 70%)', y: orbY }}
      />

      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          {/* Top row: label + badge */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: 'rgba(169,119,250,0.1)' }}
            >
              <Trophy size={14} style={{ color: '#6838CE' }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#6838CE' }}>
                Результат
              </span>
            </motion.div>
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="rounded-2xl px-5 py-3" style={{ background: '#2A168F' }}
            >
              <div className="flex items-center gap-2">
                <Flag size={14} style={{ color: '#FFD700' }} />
                <span className="text-sm font-bold text-white">4 инструмента для роста вашего бизнеса</span>
              </div>
            </motion.div>
          </div>

          <h2
            className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem] leading-[1.15]"
            style={{ color: '#2A168F' }}
          >
            Что вы получите за{' '}
            <span style={{ color: '#FF8C00' }}>90 минут</span>
          </h2>
        </motion.div>

        {/* 2x2 grid with staggered children */}
        <motion.div
          className="grid gap-5 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((b) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                variants={cardVariants}
                whileHover={{ y: -6, rotateY: 2, rotateX: -1, boxShadow: '0 16px 56px rgba(104,56,206,0.1)' }}
                className="group relative rounded-2xl bg-white p-7 transition-colors duration-500"
                style={{ border: '1px solid rgba(169,119,250,0.1)', boxShadow: '0 2px 16px rgba(104,56,206,0.04)', perspective: '800px' }}
              >
                {/* Large purple circle icon */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full mb-5"
                  style={{ background: '#6838CE' }}
                >
                  <Icon size={24} strokeWidth={1.5} color="white" />
                </motion.div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#2A168F' }}>
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#8B7BAE' }}>
                  {b.description}
                </p>
                {/* Bullet points */}
                <div className="space-y-2">
                  {b.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-center gap-2.5">
                      <CheckCircle size={16} style={{ color: '#6838CE' }} strokeWidth={2} className="shrink-0" />
                      <span className="text-sm" style={{ color: '#3D2B6B' }}>{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bonus banner */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{
            background: 'linear-gradient(135deg, #F5F0FF, #EDE5FF)',
            border: '1px solid rgba(169,119,250,0.15)',
          }}
        >
          <div className="flex items-start gap-4 flex-1">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex h-12 w-12 items-center justify-center rounded-full shrink-0"
              style={{ background: '#6838CE' }}
            >
              <Gift size={22} strokeWidth={1.5} color="white" />
            </motion.div>
            <div>
              <p className="text-base font-bold mb-1" style={{ color: '#2A168F' }}>
                Бонус: на время обкатки трассы — участие безоплатное
              </p>
              <p className="text-sm" style={{ color: '#8B7BAE' }}>
                Вы ничем не рискуете, а получаете полный набор инструментов
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 12px 32px rgba(255,140,0,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCTA}
            className="rounded-full px-8 py-3 text-sm font-bold text-white border-none cursor-pointer shrink-0 transition-all duration-300 shadow-lg shadow-[#FF8C00]/20"
            style={{ background: '#FF8C00' }}
          >
            Участвую
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
