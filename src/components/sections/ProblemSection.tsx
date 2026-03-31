import { motion } from 'framer-motion'
import {
  PackageSearch,
  Tag,
  HelpCircle,
  Megaphone,
  Users,
  Repeat,
  Stethoscope,
  AlertTriangle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Problem {
  icon: LucideIcon
  city: string
  text: string
  number: number
  hint: string
}

const problems: Problem[] = [
  {
    icon: PackageSearch,
    city: 'Ассортиминск',
    text: 'Определите тип продукта и структуру ассортимента — это фундамент вашего продвижения',
    number: 1,
    hint: '>> Клиент не понимает ваш продукт',
  },
  {
    icon: Tag,
    city: 'Продукто-Брендск',
    text: 'Найдите баланс между продвижением бренда и отдельных продуктов',
    number: 2,
    hint: '>> Бюджет размазан, бренд не растёт',
  },
  {
    icon: HelpCircle,
    city: 'Зачемград',
    text: 'Сформулируйте, зачем вы нужны клиенту — за 1 минуту',
    number: 3,
    hint: '>> Клиент уходит к конкуренту',
  },
  {
    icon: Megaphone,
    city: 'Траффик-Сити',
    text: 'Выберите правильную стратегию привлечения клиентов',
    number: 4,
    hint: '>> Деньги сгорают без результата',
  },
  {
    icon: Users,
    city: 'Цалово',
    text: 'Опишите целевую аудиторию по 5–7 параметрам',
    number: 5,
    hint: '>> Реклама бьёт мимо',
  },
  {
    icon: Repeat,
    city: 'Выборг',
    text: 'Постройте системное продвижение вместо разовых акций',
    number: 6,
    hint: '>> Нет стабильного потока клиентов',
  },
]

export default function ProblemSection() {
  return (
    <section
      id="problems"
      className="py-24 px-5 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDFBFF 0%, #F5F0FF 50%, #EDE5FF 100%)' }}
    >
      {/* Decorative orb */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
        style={{ background: 'radial-gradient(circle, #B8ACFF, transparent 70%)' }}
      />

      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          {/* Top row: label + badge */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: 'rgba(169,119,250,0.1)' }}>
              <Stethoscope size={14} style={{ color: '#6838CE' }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#6838CE' }}>
                Диагностика
              </span>
            </div>
            <div
              className="rounded-2xl px-5 py-3 max-w-xs"
              style={{ background: '#2A168F' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle size={14} style={{ color: '#FFD700' }} />
                <span className="text-sm font-bold text-white">Каждая слабая точка = -10 км/ч</span>
              </div>
              <p className="text-xs text-white/50">Каскадный эффект на весь бизнес</p>
            </div>
          </div>

          {/* Title */}
          <h2
            className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem] leading-[1.15] mb-4"
            style={{ color: '#2A168F' }}
          >
            6 точек, где бизнес
            <br />
            <span style={{ color: '#6838CE' }}>теряет деньги</span>
          </h2>
          <p
            className="max-w-2xl text-[15px] leading-relaxed"
            style={{ color: '#8B7BAE' }}
          >
            Каждая точка — город на маршруте вашего заезда. Слабое место в одном городе тормозит весь бизнес. Проверьте себя:
          </p>
        </motion.div>

        {/* 3x2 grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.city}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative rounded-2xl bg-white p-6 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(104,56,206,0.08)] hover:-translate-y-1 flex flex-col"
                style={{ border: '1px solid rgba(169,119,250,0.1)', boxShadow: '0 2px 16px rgba(104,56,206,0.04)' }}
              >
                {/* Purple circle icon */}
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: '#6838CE' }}
                >
                  <Icon size={20} strokeWidth={1.5} color="white" />
                </div>

                {/* Pit-stop label */}
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.15em] mb-2 block"
                  style={{ color: '#6838CE' }}
                >
                  ПИТ-СТОП {p.number}
                </span>

                {/* City name */}
                <h3 className="text-base font-bold mb-2" style={{ color: '#1a1a1a' }}>
                  {p.city}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#5a5a7a' }}>
                  {p.text}
                </p>

                {/* Orange hint */}
                <p className="text-sm font-medium" style={{ color: '#FF8C00' }}>
                  {p.hint}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
