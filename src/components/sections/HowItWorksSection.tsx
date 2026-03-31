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
  { icon: PackageSearch, city: 'Ассортиминск', description: 'Определите тип продукта и структуру ассортимента' },
  { icon: Tag, city: 'Продукто-Брендск', description: 'Найдите баланс бренда и ассортимента' },
  { icon: HelpCircle, city: 'Зачемград', description: 'Сформулируйте, зачем вы клиенту' },
  { icon: Megaphone, city: 'Траффик-Сити', description: 'Выберите стратегию привлечения клиентов' },
  { icon: Users, city: 'Цалово', description: 'Опишите целевую аудиторию по 5-7 параметрам' },
  { icon: Repeat, city: 'Выборг', description: 'Системность или креативность — сделайте выбор' },
]

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-5 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #160B52 0%, #1E0F6E 40%, #2A168F 100%)' }}
    >
      {/* Decorative orbs */}
      <div
        className="absolute top-20 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
        style={{ background: '#4338DF' }}
      />
      <div
        className="absolute bottom-20 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-15"
        style={{ background: '#A977FA' }}
      />

      <div className="mx-auto max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'rgba(255,215,0,0.6)' }}
          >
            Маршрут
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] leading-[1.15] mb-4">
            Как проходит заезд
          </h2>
          <p
            className="max-w-md mx-auto text-[15px] leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            6 этапов — 6 городов на пути к эффективному маркетингу
          </p>
        </motion.div>

        {/* Desktop: alternating timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px lg:left-1/2 lg:-translate-x-px"
            style={{ background: 'linear-gradient(to bottom, rgba(169,119,250,0.25) 0%, rgba(255,215,0,0.2) 100%)' }}
          />

          <div className="space-y-6 lg:space-y-10">
            {stages.map((stage, i) => {
              const Icon = stage.icon
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={stage.city}
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`relative flex items-start gap-5 lg:gap-0 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-5 -translate-x-1/2 z-10 flex h-4 w-4 items-center justify-center rounded-full lg:left-1/2"
                    style={{
                      background: '#1E0F6E',
                      border: '2px solid rgba(169,119,250,0.4)',
                      boxShadow: '0 0 12px rgba(169,119,250,0.2)',
                    }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full" style={{ background: '#A977FA' }} />
                  </div>

                  {/* Spacer for mobile */}
                  <div className="w-10 shrink-0 lg:hidden" />

                  {/* Card */}
                  <div className={`flex-1 lg:w-[calc(50%-2rem)] ${isLeft ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'}`}>
                    <div
                      className="group rounded-2xl px-6 py-5 transition-all duration-500 hover:bg-white/[0.06]"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div className={`flex items-center gap-3.5 mb-2.5 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                          style={{ background: 'rgba(169,119,250,0.1)', color: '#A977FA' }}
                        >
                          <Icon size={18} strokeWidth={1.5} />
                        </div>
                        <div>
                          <span
                            className="text-[10px] font-bold uppercase tracking-[0.18em] block mb-0.5"
                            style={{ color: 'rgba(255,215,0,0.5)' }}
                          >
                            Этап {i + 1}
                          </span>
                          <h3 className="text-[15px] font-bold text-white/90 leading-tight">
                            {stage.city}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        {stage.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty half */}
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
            transition={{ delay: 0.4, duration: 0.4 }}
            className="relative mt-10 flex justify-center"
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full text-lg"
              style={{
                background: 'rgba(255,215,0,0.06)',
                border: '1.5px solid rgba(255,215,0,0.2)',
                boxShadow: '0 0 30px rgba(255,215,0,0.06)',
              }}
            >
              🏁
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
