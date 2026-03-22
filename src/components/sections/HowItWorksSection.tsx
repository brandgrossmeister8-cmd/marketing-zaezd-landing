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

interface Stage {
  icon: LucideIcon
  city: string
  description: string
}

const stages: Stage[] = [
  {
    icon: PackageSearch,
    city: 'Ассортиминск',
    description: 'Определите тип продукта и структуру ассортимента',
  },
  {
    icon: Tag,
    city: 'Продукто-Брендск',
    description: 'Найдите баланс бренда и ассортимента',
  },
  {
    icon: HelpCircle,
    city: 'Зачемград',
    description: 'Сформулируйте, зачем вы клиенту',
  },
  {
    icon: Megaphone,
    city: 'Траффик-Сити',
    description: 'Выберите стратегию привлечения клиентов',
  },
  {
    icon: Users,
    city: 'Цалово',
    description: 'Опишите целевую аудиторию по 5-7 параметрам',
  },
  {
    icon: Repeat,
    city: 'Выборг',
    description: 'Системность или креативность, сделайте выбор',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 lg:py-28" style={{ background: 'linear-gradient(135deg, #6838CE, #2A168F)' }}>
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-bold text-white lg:text-4xl mb-4"
        >
          Как проходит игра
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-white/70 mb-16 max-w-lg mx-auto"
        >
          6 этапов, 6 городов на вашем маршруте к эффективному маркетингу
        </motion.p>

        {/* Race track timeline */}
        <div className="relative">
          {/* Vertical track line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 lg:left-1/2 lg:-translate-x-px" style={{ background: 'linear-gradient(to bottom, #A977FA, #FFD700)' }} />

          <div className="space-y-8 lg:space-y-12">
            {stages.map((stage, i) => {
              const Icon = stage.icon
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={stage.city}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative flex items-start gap-5 lg:gap-0 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-6 -translate-x-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 lg:left-1/2" style={{ borderColor: '#A977FA', background: '#2A168F' }}>
                    <div className="h-2 w-2 rounded-full" style={{ background: '#A977FA' }} />
                  </div>

                  {/* Spacer for mobile */}
                  <div className="w-12 shrink-0 lg:hidden" />

                  {/* Card */}
                  <div
                    className={`flex-1 lg:w-[calc(50%-2rem)] ${
                      isLeft ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'
                    }`}
                  >
                    <div className="rounded-2xl p-5 transition-colors" style={{ background: 'rgba(42,22,143,0.5)', border: '1px solid rgba(255,255,255,0.2)' }}>
                      <div
                        className={`flex items-center gap-3 mb-2 ${
                          isLeft ? 'lg:flex-row-reverse' : ''
                        }`}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(169,119,250,0.2)', color: '#A977FA' }}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#FFD700' }}>
                            Этап {i + 1}
                          </span>
                          <h3 className="text-base font-bold text-white">{stage.city}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty half for desktop */}
                  <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
                </motion.div>
              )
            })}
          </div>

          {/* Finish flag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="relative mt-10 flex justify-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 text-2xl" style={{ borderColor: '#FFD700', background: '#2A168F' }}>
              🏁
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
