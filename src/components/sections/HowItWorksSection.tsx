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
  { icon: Users, city: 'Цалово', description: 'Опишите целевую аудиторию по 5–7 параметрам' },
  { icon: Repeat, city: 'Выборг', description: 'Системность или креативность — сделайте выбор' },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 px-4 sm:py-24" style={{ background: 'linear-gradient(160deg, #1E0F6E 0%, #2A168F 50%, #1E0F6E 100%)' }}>
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl font-bold text-white sm:text-3xl lg:text-[2.5rem] mb-3 leading-tight"
        >
          Как проходит заезд
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center mb-14 max-w-sm mx-auto text-sm"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          6 этапов — 6 городов на пути к эффективному маркетингу
        </motion.p>

        <div className="relative">
          <div className="absolute left-[17px] top-2 bottom-2 w-px lg:left-1/2 lg:-translate-x-px" style={{ background: 'linear-gradient(to bottom, rgba(169,119,250,0.2) 0%, rgba(255,215,0,0.2) 100%)' }} />

          <div className="space-y-5 lg:space-y-8">
            {stages.map((stage, i) => {
              const Icon = stage.icon
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={stage.city}
                  initial={{ opacity: 0, x: isLeft ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className={`relative flex items-start gap-4 lg:gap-0 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className="absolute left-[17px] -translate-x-1/2 z-10 flex h-[14px] w-[14px] items-center justify-center rounded-full lg:left-1/2" style={{ background: '#1E0F6E', border: '1.5px solid rgba(169,119,250,0.35)', boxShadow: '0 0 8px rgba(169,119,250,0.15)' }}>
                    <div className="h-[4px] w-[4px] rounded-full" style={{ background: '#A977FA' }} />
                  </div>

                  <div className="w-9 shrink-0 lg:hidden" />

                  <div className={`flex-1 lg:w-[calc(50%-1.5rem)] ${isLeft ? 'lg:pr-10 lg:text-right' : 'lg:pl-10 lg:text-left'}`}>
                    <div className="group rounded-xl px-5 py-4 transition-all duration-500 hover:bg-white/[0.04]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <div className={`flex items-center gap-3 mb-1.5 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110" style={{ background: 'rgba(169,119,250,0.08)', color: '#A977FA' }}>
                          <Icon size={15} strokeWidth={1.6} />
                        </div>
                        <div>
                          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] block" style={{ color: 'rgba(255,215,0,0.5)' }}>Этап {i + 1}</span>
                          <h3 className="text-sm font-bold text-white/90 leading-tight">{stage.city}</h3>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>{stage.description}</p>
                    </div>
                  </div>

                  <div className="hidden lg:block lg:w-[calc(50%-1.5rem)]" />
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="relative mt-8 flex justify-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full text-base" style={{ background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.15)', boxShadow: '0 0 20px rgba(255,215,0,0.05)' }}>
              🏁
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
