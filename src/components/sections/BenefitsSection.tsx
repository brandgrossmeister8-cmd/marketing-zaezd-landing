import { motion } from 'framer-motion'
import { Stethoscope, Calculator, Map, UsersRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

const benefits: Benefit[] = [
  { icon: Stethoscope, title: 'Диагностика маркетинга', description: 'Сильные и слабые точки по 6 ключевым параметрам' },
  { icon: Calculator, title: 'Калькулятор потерь', description: 'Конкретные цифры упущенной выгоды в рублях' },
  { icon: Map, title: 'Дорожная карта', description: 'Пошаговый план роста с приоритетами' },
  { icon: UsersRound, title: 'Синхронизация команды', description: 'Единое понимание маркетинга для всей команды' },
]

export default function BenefitsSection() {
  return (
    <section className="py-16 px-4 sm:py-24" style={{ background: 'linear-gradient(180deg, #F9F7FF 0%, #F3EEFF 100%)' }}>
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl font-bold sm:text-3xl lg:text-[2.5rem] mb-12 leading-tight"
          style={{ color: '#2A168F' }}
        >
          Что вы получите за 90 минут
        </motion.h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group flex items-start gap-4 rounded-2xl bg-white/80 backdrop-blur-sm p-5 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-[#6838CE]/8"
                style={{ border: '1px solid rgba(169,119,250,0.06)' }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105" style={{ background: 'linear-gradient(135deg, rgba(104,56,206,0.08), rgba(169,119,250,0.12))', color: '#6838CE' }}>
                  <Icon size={20} strokeWidth={1.6} />
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1" style={{ color: '#2A168F' }}>{b.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#8B7BAE' }}>{b.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
