import { motion, useScroll, useTransform } from 'framer-motion'
import { Flag, Clock, Users, Video, Gift } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useRef } from 'react'

const infoPills = [
  { icon: Clock, label: '90 минут' },
  { icon: Users, label: '6 участников' },
  { icon: Video, label: 'Онлайн в Zoom' },
  { icon: Gift, label: 'Безоплатно' },
]

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const orbTopY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const orbBottomY = useTransform(scrollYProgress, [0, 1], ['5%', '-10%'])

  const handleCTA = () => {
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors: ['#4338DF', '#FFD700', '#A977FA', '#6838CE', '#B8ACFF'] })
    const scheduleEl = document.getElementById('schedule')
    if (scheduleEl) {
      scheduleEl.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.open('https://t.me/SystemPromoBot?start=c1774180920281-ds', '_blank')
    }
  }

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-24 px-5 sm:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1E0F6E 0%, #2A168F 40%, #4338DF 100%)' }}
    >
      {/* Decorative orbs with parallax */}
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-15"
        style={{ background: '#6838CE', y: orbTopY }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10"
        style={{ background: '#A977FA', y: orbBottomY }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(169,119,250,0.08) 0%, transparent 60%)' }}
      />

      <div className="relative mx-auto max-w-2xl">
        {/* Glass card */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-8 sm:p-12 text-center"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8" style={{ background: 'rgba(255,215,0,0.12)', border: '1px solid rgba(255,215,0,0.2)' }}
          >
            <motion.span
              className="text-lg"
              animate={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ delay: 1, duration: 0.8, ease: 'easeInOut' }}
            >
              🏁
            </motion.span>
            <span className="text-xs font-semibold" style={{ color: '#FFD700' }}>Финишная прямая</span>
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] leading-[1.15] mb-5">
            Готовы узнать реальную скорость
            <br />
            <span style={{ color: '#FFD700' }}>вашего бизнеса?</span>
          </h2>

          {/* Subtitle */}
          <p
            className="mb-8 text-[15px] leading-relaxed max-w-lg mx-auto"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Запишитесь на ближайший онлайн-заезд и получите диагностику маркетинга с конкретными цифрами
          </p>

          {/* Info pills with stagger + scale-in */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {infoPills.map((pill, idx) => {
              const Icon = pill.icon
              return (
                <motion.div
                  key={pill.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.08, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Icon size={14} style={{ color: '#B8ACFF' }} />
                  <span className="text-sm text-white/70">{pill.label}</span>
                </motion.div>
              )
            })}
          </div>

          {/* CTA button */}
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 16px 48px rgba(255,140,0,0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCTA}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#FF8C00] px-10 py-4 text-lg font-bold transition-all duration-300 cursor-pointer border-none shadow-lg shadow-[#FF8C00]/25 w-full sm:w-auto justify-center"
            style={{ color: 'white' }}
          >
            <Flag size={18} />
            Записаться на заезд
          </motion.button>

          {/* Trust line */}
          <p className="mt-5 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Выберите дату и заполните форму — ответ за 30 секунд
          </p>
        </motion.div>
      </div>
    </section>
  )
}
