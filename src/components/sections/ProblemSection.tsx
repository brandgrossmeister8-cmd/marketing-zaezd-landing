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
  {
    icon: PackageSearch,
    city: 'Ассортиминск',
    text: 'Не можете чётко объяснить, что продаёте',
  },
  {
    icon: Tag,
    city: 'Продукто-Брендск',
    text: 'Продвигаете отдельные продукты, сливая бюджет',
  },
  {
    icon: HelpCircle,
    city: 'Зачемград',
    text: 'Не можете за минуту объяснить, зачем вы клиенту',
  },
  {
    icon: Megaphone,
    city: 'Траффик-Сити',
    text: 'Рекламный бюджет уходит непонятно куда',
  },
  {
    icon: Users,
    city: 'Цалово',
    text: 'Не знаете свою целевую аудиторию',
  },
  {
    icon: Repeat,
    city: 'Выборг',
    text: 'Ставите на разовые акции вместо системы',
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
}

export default function ProblemSection() {
  return (
    <section id="problems" className="py-12 px-4 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-bold lg:text-4xl mb-4"
          style={{ color: '#2A168F' }}
        >
          6 точек, где ваш бизнес теряет клиентов и деньги
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-14 max-w-xl mx-auto"
          style={{ color: '#6838CE' }}
        >
          Каждая из этих точек это город на вашем маршруте. Слабое место в одном городе тормозит весь заезд
        </motion.p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.city}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group rounded-2xl border bg-white p-6 hover:shadow-lg transition-all duration-300"
                style={{ borderColor: '#A977FA' }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #6838CE, #A977FA)' }}>
                  <Icon size={24} />
                </div>
                <p className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: '#2A168F' }}>
                  {p.city}
                </p>
                <p className="leading-relaxed" style={{ color: '#6838CE' }}>{p.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
