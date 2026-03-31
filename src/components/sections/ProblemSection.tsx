import { motion } from 'framer-motion'
import {
  PackageSearch,
  Tag,
  HelpCircle,
  Megaphone,
  Users,
  Repeat,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Problem {
  icon: LucideIcon
  city: string
  text: string
  number: string
}

const problems: Problem[] = [
  { icon: PackageSearch, city: 'Ассортиминск', text: 'Не можете чётко объяснить, что продаёте', number: '01' },
  { icon: Tag, city: 'Продукто-Брендск', text: 'Продвигаете отдельные продукты, сливая бюджет', number: '02' },
  { icon: HelpCircle, city: 'Зачемград', text: 'Не можете за минуту объяснить, зачем вы клиенту', number: '03' },
  { icon: Megaphone, city: 'Траффик-Сити', text: 'Рекламный бюджет уходит непонятно куда', number: '04' },
  { icon: Users, city: 'Цалово', text: 'Не знаете свою целевую аудиторию', number: '05' },
  { icon: Repeat, city: 'Выборг', text: 'Ставите на разовые акции вместо системы', number: '06' },
]

export default function ProblemSection() {
  return (
    <section id="problems" className="py-24 px-5 sm:py-32">
      <div className="mx-auto max-w-5xl">
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
            Диагностика
          </p>
          <h2
            className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem] leading-[1.15] mb-4"
            style={{ color: '#2A168F' }}
          >
            6 точек, где бизнес
            <br />
            <span style={{ color: '#6838CE' }}>теряет клиентов</span>
          </h2>
          <p
            className="max-w-lg mx-auto text-[15px] leading-relaxed"
            style={{ color: '#8B7BAE' }}
          >
            Каждая точка — город на вашем маршруте. Слабое место в одном тормозит весь заезд
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.city}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative rounded-2xl bg-white p-6 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(104,56,206,0.08)] hover:-translate-y-1"
                style={{ border: '1px solid rgba(169,119,250,0.08)' }}
              >
                {/* Top gradient line on hover */}
                <div
                  className="absolute top-0 left-4 right-4 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(90deg, #6838CE, #A977FA, #B8ACFF)' }}
                />

                <div className="flex items-start gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105"
                    style={{ background: 'rgba(104,56,206,0.05)', color: '#6838CE' }}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[10px] font-bold tracking-[0.15em] uppercase"
                        style={{ color: '#B8ACFF' }}
                      >
                        {p.number}
                      </span>
                      <span
                        className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                        style={{ color: '#A977FA' }}
                      >
                        {p.city}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: '#3D2B6B' }}>
                      {p.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
