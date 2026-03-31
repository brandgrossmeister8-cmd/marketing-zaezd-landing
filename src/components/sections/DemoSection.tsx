import { motion } from 'framer-motion'
import { Gauge, Flag, Trophy } from 'lucide-react'

export default function DemoSection() {
  return (
    <section
      id="demo"
      className="py-24 px-5 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #130842 0%, #1E0F6E 50%, #160B52 100%)' }}
    >
      {/* Decorative glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
        style={{ background: '#4338DF' }}
      />

      <div className="mx-auto max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'rgba(255,215,0,0.5)' }}
          >
            Превью
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] leading-[1.15]">
            Демо заезда
          </h2>
        </motion.div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl rounded-2xl overflow-hidden mb-16"
          style={{
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(169,119,250,0.08)',
          }}
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

        {/* Stats cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {/* Speedometer */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="group rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/[0.05]"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <Gauge
              size={32}
              className="mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
              style={{ color: '#A977FA' }}
              strokeWidth={1.3}
            />
            <p className="text-3xl font-bold mb-1 tracking-tight" style={{ color: '#FFD700' }}>
              90 <span className="text-sm font-normal text-white/25">км/ч</span>
            </p>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.15em] mb-5">
              Текущая скорость
            </p>
            <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ width: '75%', background: 'linear-gradient(90deg, #4338DF, #A977FA)' }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-white/15">
              <span>0</span>
              <span>120</span>
            </div>
          </motion.div>

          {/* Route */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="group rounded-2xl p-6 transition-all duration-500 hover:bg-white/[0.05]"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <Flag
              size={32}
              className="mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
              style={{ color: '#FFD700' }}
              strokeWidth={1.3}
            />
            <p className="text-sm font-semibold text-white/80 mb-5 text-center">Маршрут</p>
            <div className="space-y-3">
              {['Ассортиминск', 'Продукто-Брендск', 'Зачемград', 'Траффик-Сити', 'Цалово', 'Выборг'].map(
                (city, i) => (
                  <div key={city} className="flex items-center gap-3">
                    <div
                      className="h-2 w-2 rounded-full transition-colors"
                      style={{ background: i < 4 ? '#A977FA' : 'rgba(255,255,255,0.08)' }}
                    />
                    <span className={`text-[13px] ${i < 4 ? 'text-white/60' : 'text-white/20'}`}>
                      {city}
                    </span>
                    {i < 4 && (
                      <span className="ml-auto text-xs font-semibold" style={{ color: 'rgba(169,119,250,0.5)' }}>
                        +10
                      </span>
                    )}
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="group rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/[0.05]"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <Trophy
              size={32}
              className="mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
              style={{ color: '#FFD700' }}
              strokeWidth={1.3}
            />
            <p className="text-sm font-semibold text-white/80 mb-5">Результат</p>
            <div
              className="rounded-xl p-4 mb-5"
              style={{ background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.1)' }}
            >
              <p className="text-2xl font-bold tracking-tight" style={{ color: '#FFD700' }}>
                90 <span className="text-xs font-normal text-white/25">км/ч</span>
              </p>
              <p className="text-[10px] text-white/30 mt-1">Хорошая система</p>
            </div>
            <div className="space-y-2.5 text-left">
              <div className="flex justify-between text-[13px]">
                <span className="text-white/35">Сильные</span>
                <span className="font-semibold" style={{ color: '#A977FA' }}>4/6</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-white/35">Слабые</span>
                <span className="font-semibold text-rose-400/60">2/6</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-white/35">Потери</span>
                <span className="font-semibold" style={{ color: 'rgba(255,215,0,0.6)' }}>~34%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
