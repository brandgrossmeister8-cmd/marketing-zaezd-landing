import { motion } from 'framer-motion'
import { Stethoscope, Calculator, Map, UsersRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: Stethoscope,
    title: 'Диагностику маркетинга',
    description: 'Узнаете свои сильные и слабые точки по 6 ключевым параметрам',
  },
  {
    icon: Calculator,
    title: 'Калькулятор упущенной выгоды',
    description: 'Увидите конкретные цифры потерь в рублях и процентах',
  },
  {
    icon: Map,
    title: 'Персональную дорожную карту',
    description: 'Пошаговый план роста с приоритетами и рекомендациями',
  },
  {
    icon: UsersRound,
    title: 'Командную синхронизацию',
    description: 'Вся команда на одной волне, единое понимание маркетинга',
  },
]

export default function BenefitsSection() {
  return (
    <section className="py-12 px-4 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-bold lg:text-4xl mb-4"
          style={{ color: '#2A168F' }}
        >
          Что вы получите за 90 минут
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-14 max-w-lg mx-auto"
          style={{ color: '#6838CE' }}
        >
          Конкретные инструменты для вашего бизнеса
        </motion.p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="rounded-2xl bg-white p-6 text-center hover:shadow-lg transition-all duration-300"
                style={{ border: '1px solid #A977FA' }}
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #6838CE, #A977FA)' }}>
                  <Icon size={28} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#2A168F' }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6838CE' }}>{b.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
