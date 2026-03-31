import { motion } from 'framer-motion'
import { Gauge, Flag, Trophy } from 'lucide-react'

export default function DemoSection() {
  return (
    <section id="demo" className="py-16 px-4 sm:py-24" style={{ background: 'linear-gradient(180deg, #160B52 0%, #1E0F6E 50%, #160B52 100%)' }}>
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl font-bold text-white sm:text-3xl lg:text-[2.5rem] mb-12 leading-tight"
        >
          Демо заезда
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-2xl rounded-2xl overflow-hidden mb-14"
          style={{ boxShadow: '0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)' }}
        >
          <video
            controls
            preload="metadata"
            className="w-full"
            style={{ aspectRatio: '16/9', background: '#0D0740' }}
          >
            <source src={`${import.meta.env.BASE_URL}demo.mp4`} type="video/mp4" />
            Ваш браузер не поддерживает видео
          </video>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="group rounded-2xl p-5 text-center transition-all duration-500 hover:bg-white/[0.04]"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
          >
            <Gauge size={28} className="mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" style={{ color: '#A977FA' }} strokeWidth={1.4} />
            <p className="text-2xl font-bold mb-0.5 tracking-tight" style={{ color: '#FFD700' }}>90 <span className="text-base font-normal text-white/25">км/ч</span></p>
            <p className="text-[9px] text-white/30 uppercase tracking-[0.15em] mb-4">Текущая скорость</p>
            <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: '75%', background: 'linear-gradient(90deg, #4338DF, #A977FA)' }} />
            </div>
            <div className="flex justify-between mt-1.5 text-[9px] text-white/15">
              <span>0</span>
              <span>120</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="group rounded-2xl p-5 transition-all duration-500 hover:bg-white/[0.04]"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
          >
            <Flag size={28} className="mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" style={{ color: '#FFD700' }} strokeWidth={1.4} />
            <p className="text-sm font-semibold text-white/80 mb-4 text-center">Маршрут</p>
            <div className="space-y-2.5">
              {['Ассортиминск', 'Продукто-Брендск', 'Зачемград', 'Траффик-Сити', 'Цалово', 'Выборг'].map(
                (city, i) => (
                  <div key={city} className="flex items-center gap-2.5">
                    <div className="h-1.5 w-1.5 rounded-full transition-colors" style={{ background: i < 4 ? '#A977FA' : 'rgba(255,255,255,0.08)' }} />
                    <span className={`text-xs ${i < 4 ? 'text-white/55' : 'text-white/20'}`}>{city}</span>
                    {i < 4 && <span className="ml-auto text-[11px] font-medium" style={{ color: 'rgba(169,119,250,0.4)' }}>+10</span>}
                  </div>
                )
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="group rounded-2xl p-5 text-center transition-all duration-500 hover:bg-white/[0.04]"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
          >
            <Trophy size={28} className="mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" style={{ color: '#FFD700' }} strokeWidth={1.4} />
            <p className="text-sm font-semibold text-white/80 mb-4">Результат</p>
            <div className="rounded-xl p-3.5 mb-4" style={{ background: 'rgba(255,215,0,0.03)', border: '1px solid rgba(255,215,0,0.08)' }}>
              <p className="text-xl font-bold tracking-tight" style={{ color: '#FFD700' }}>90 <span className="text-xs font-normal text-white/25">км/ч</span></p>
              <p className="text-[9px] text-white/25 mt-0.5">Хорошая система</p>
            </div>
            <div className="space-y-2 text-left">
              <div className="flex justify-between text-xs">
                <span className="text-white/30">Сильные</span>
                <span className="font-medium" style={{ color: '#A977FA' }}>4/6</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/30">Слабые</span>
                <span className="font-medium text-rose-400/50">2/6</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/30">Потери</span>
                <span className="font-medium" style={{ color: 'rgba(255,215,0,0.5)' }}>~34%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
