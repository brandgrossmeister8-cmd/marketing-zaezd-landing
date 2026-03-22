import { motion } from 'framer-motion'
import { Gauge, Flag, Trophy } from 'lucide-react'

export default function DemoSection() {
  return (
    <section className="py-20 px-4 lg:py-28" style={{ background: 'linear-gradient(135deg, #2A168F, #6838CE)' }}>
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-bold text-white lg:text-4xl mb-14"
        >
          Как выглядит игра
        </motion.h2>

        {/* Demo video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl rounded-2xl overflow-hidden mb-16 shadow-lg"
          style={{ border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <video
            controls
            preload="metadata"
            poster=""
            className="w-full"
            style={{ aspectRatio: '16/9', background: '#1E0F6E' }}
          >
            <source src="/demo.mp4" type="video/mp4" />
            Ваш браузер не поддерживает видео
          </video>
        </motion.div>

        {/* Game UI mockups */}
        <div className="grid gap-5 md:grid-cols-3">
          {/* Speedometer card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="rounded-2xl p-6 text-center"
            style={{ background: 'rgba(42,22,143,0.5)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <Gauge size={40} className="mx-auto mb-4" style={{ color: '#A977FA' }} />
            <p className="text-3xl font-bold mb-1" style={{ color: '#FFD700' }}>90 км/ч</p>
            <p className="text-xs text-white/50 uppercase tracking-wider mb-4">Текущая скорость</p>
            <div className="relative h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: '75%',
                  background: 'linear-gradient(90deg, #6838CE, #A977FA)',
                }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-white/30">
              <span>0</span>
              <span>120 км/ч</span>
            </div>
          </motion.div>

          {/* Race track card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-2xl p-6"
            style={{ background: 'rgba(42,22,143,0.5)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <Flag size={40} className="mx-auto mb-4" style={{ color: '#FFD700' }} />
            <p className="text-sm font-semibold text-white mb-4 text-center">Маршрут заезда</p>
            <div className="space-y-3">
              {['Ассортиминск', 'Продукто-Брендск', 'Зачемград', 'Траффик-Сити', 'Цалово', 'Выборг'].map(
                (city, i) => (
                  <div key={city} className="flex items-center gap-3">
                    <div
                      className={`h-3 w-3 rounded-full`}
                      style={{ background: i < 4 ? '#A977FA' : 'rgba(255,255,255,0.2)' }}
                    />
                    <span className={`text-xs ${i < 4 ? 'text-white/80' : 'text-white/40'}`}>
                      {city}
                    </span>
                    {i < 4 && (
                      <span className="ml-auto text-xs" style={{ color: '#A977FA' }}>+10</span>
                    )}
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Player card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-2xl p-6 text-center"
            style={{ background: 'rgba(42,22,143,0.5)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <Trophy size={40} className="mx-auto mb-4" style={{ color: '#FFD700' }} />
            <p className="text-sm font-semibold text-white mb-4">Результат игрока</p>
            <div className="rounded-xl p-4 mb-4" style={{ border: '1px solid rgba(255,215,0,0.3)', background: 'rgba(255,215,0,0.05)' }}>
              <p className="text-2xl font-bold" style={{ color: '#FFD700' }}>90 км/ч</p>
              <p className="text-xs text-white/50 mt-1">Хорошая система</p>
            </div>
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">Сильные точки</span>
                <span className="font-semibold" style={{ color: '#A977FA' }}>4 из 6</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">Слабые точки</span>
                <span className="text-red-400 font-semibold">2 из 6</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">Упущенная выгода</span>
                <span className="font-semibold" style={{ color: '#FFD700' }}>~34%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
