import { motion } from 'framer-motion'
import {
  PackageSearch,
  Tag,
  HelpCircle,
  Megaphone,
  Users,
  Repeat,
  Route,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Stage {
  icon: LucideIcon
  city: string
  number: number
}

const stages: Stage[] = [
  { icon: PackageSearch, city: 'Ассортиминск', number: 1 },
  { icon: Tag, city: 'Продукто-Брендск', number: 2 },
  { icon: HelpCircle, city: 'Зачемград', number: 3 },
  { icon: Megaphone, city: 'Траффик-Сити', number: 4 },
  { icon: Users, city: 'Цалово', number: 5 },
  { icon: Repeat, city: 'Выборг', number: 6 },
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

      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          {/* Top row: label + badge */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: 'rgba(255,215,0,0.1)' }}>
              <Route size={14} style={{ color: '#FFD700' }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#FFD700' }}>
                Маршрут
              </span>
            </div>
            <div className="rounded-2xl px-5 py-3" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Zap size={14} style={{ color: '#FFD700' }} />
                <span className="text-sm font-bold text-white">Старт: 60 км/ч → Финиш: до 120 км/ч</span>
              </div>
              <p className="text-xs text-white/40">Каждый пит-стоп ±10 км/ч к вашей скорости</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] leading-[1.15]">
            Как проходит заезд
          </h2>
        </motion.div>

        {/* Horizontal race track timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 hidden sm:block"
        >
          <div className="flex items-center justify-between px-4">
            {stages.map((_, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div
                  className="h-4 w-4 rounded-full shrink-0 relative z-10"
                  style={{
                    background: i < 3 ? '#6838CE' : i < 5 ? '#FF8C00' : '#FFD700',
                    boxShadow: `0 0 12px ${i < 3 ? 'rgba(104,56,206,0.4)' : i < 5 ? 'rgba(255,140,0,0.4)' : 'rgba(255,215,0,0.4)'}`,
                  }}
                />
                {i < stages.length - 1 && (
                  <div
                    className="h-[2px] flex-1"
                    style={{
                      background: i < 2
                        ? 'linear-gradient(90deg, #6838CE, #6838CE)'
                        : i < 4
                        ? 'linear-gradient(90deg, #FF8C00, #FF8C00)'
                        : 'linear-gradient(90deg, #FFD700, #FFD700)',
                      opacity: 0.5,
                    }}
                  />
                )}
              </div>
            ))}
            {/* Finish flag */}
            <div className="ml-4 text-2xl">🏁</div>
          </div>
        </motion.div>

        {/* 3x2 grid of cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map((stage, i) => {
            const Icon = stage.icon
            return (
              <motion.div
                key={stage.city}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group rounded-2xl p-5 transition-all duration-500 hover:bg-white/[0.08]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Number in purple circle */}
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: '#6838CE' }}
                  >
                    {stage.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: '#FFD700' }}>
                        ПИТ-СТОП {stage.number}
                      </span>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(134,239,172,0.15)', color: '#86efac' }}
                      >
                        +10 км/ч
                      </span>
                    </div>
                    {/* Icon in purple square */}
                    <div
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg mb-2 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(169,119,250,0.15)' }}
                    >
                      <Icon size={16} strokeWidth={1.5} style={{ color: '#A977FA' }} />
                    </div>
                    <h3 className="text-[15px] font-bold text-white/90 leading-tight">
                      {stage.city}
                    </h3>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom bar: Finish */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 rounded-2xl p-6"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl">🏁</span>
              <div>
                <p className="text-base font-bold text-white">Финиш: ваша персональная скорость</p>
                <p className="text-sm text-white/40">Калькулятор упущенной выгоды + дорожная карта роста</p>
              </div>
            </div>
            {/* Speed scale */}
            <div className="flex items-center gap-1">
              {[0, 30, 60, 90, 120].map((speed) => (
                <div
                  key={speed}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold"
                  style={{
                    background: speed >= 90 ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)',
                    color: speed >= 90 ? '#FFD700' : 'rgba(255,255,255,0.3)',
                    border: speed >= 90 ? '1px solid rgba(255,215,0,0.3)' : '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {speed} км/ч
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
