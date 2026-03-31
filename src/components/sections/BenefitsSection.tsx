import { motion } from 'framer-motion'
import { Stethoscope, Calculator, Map, UsersRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
  accent: string
}

const benefits: Benefit[] = [
  { icon: Stethoscope, title: 'Диагностика маркетинга', description: 'Сильные и слабые точки по 6 ключевым параметрам', accent: '#6838CE' },
  { icon: Calculator, title: 'Калькулятор потерь', description: 'Конкретные цифры упущенной выгоды в рублях', accent: '#4338DF' },
  { icon: Map, title: 'Дорожная карта', description: 'Пошаговый план роста с приоритетами', accent: '#A977FA' },
  { icon: UsersRound, title: 'Синхронизация команды', description: 'Единое понимание маркетинга для всей команды', accent: '#6838CE' },
]

export default function BenefitsSection() {
  return (
    <section
      className="py-24 px-5 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDFBFF 0%, #F5F0FF 50%, #EDE5FF 100%)' }}
    >
      {/* Decorative orb */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
        style={{ background: 'radial-gradient(circle, #B8ACFF, transparent 70%)' }}
      />

      <div className="mx-auto max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: '#A977FA' }}
          >
            Результат
          </p>
          <h2
            className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem] leading-[1.15]"
            style={{ color: '#2A168F' }}
          >
            Что вы получите за{' '}
            <span style={{ color: '#FF8C00' }}>90 минут</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative rounded-2xl bg-white/90 backdrop-blur-sm p-7 transition-all duration-500 hover:bg-white hover:shadow-[0_12px_48px_rgba(104,56,206,0.08)] hover:-translate-y-1"
                style={{ border: '1px solid rgba(169,119,250,0.08)' }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl mb-5 transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${b.accent}10, ${b.accent}18)`,
                    color: b.accent,
                  }}
                >
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#2A168F' }}>
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8B7BAE' }}>
                  {b.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
