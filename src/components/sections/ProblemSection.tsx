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
}

const problems: Problem[] = [
  { icon: PackageSearch, city: 'Ассортиминск', text: 'Не можете чётко объяснить, что продаёте' },
  { icon: Tag, city: 'Продукто-Брендск', text: 'Продвигаете отдельные продукты, сливая бюджет' },
  { icon: HelpCircle, city: 'Зачемград', text: 'Не можете за минуту объяснить, зачем вы клиенту' },
  { icon: Megaphone, city: 'Траффик-Сити', text: 'Рекламный бюджет уходит непонятно куда' },
  { icon: Users, city: 'Цалово', text: 'Не знаете свою целевую аудиторию' },
  { icon: Repeat, city: 'Выборг', text: 'Ставите на разовые акции вместо системы' },
]

export default function ProblemSection() {
  return (
    <section id="problems" className="py-16 px-4 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl font-bold sm:text-3xl lg:text-[2.5rem] mb-3 leading-tight"
          style={{ color: '#2A168F' }}
        >
          6 точек, где бизнес теряет клиентов
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center mb-12 max-w-md mx-auto text-sm leading-relaxed"
          style={{ color: '#8B7BAE' }}
        >
          Каждая точка — город на вашем маршруте. Слабое место в одном тормозит весь заезд
        </motion.p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="group relative rounded-2xl bg-white p-5 transition-all duration-500 hover:shadow-2xl hover:shadow-[#6838CE]/8 hover:-translate-y-0.5"
                style={{ border: '1px solid rgba(169,119,250,0.08)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, #6838CE, #A977FA)' }} />
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300" style={{ background: 'rgba(104,56,206,0.06)', color: '#6838CE' }}>
                    <Icon size={19} strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-1.5" style={{ color: '#A977FA' }}>{p.city}</p>
                    <p className="text-[13px] leading-relaxed" style={{ color: '#3D2B6B' }}>{p.text}</p>
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
