import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Gauge, Flag, Trophy, Play, Eye, Clock } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

function AnimatedProgressBar({ width, delay = 0 }: { width: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="relative h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        initial={{ width: '0%' }}
        animate={isInView ? { width } : { width: '0%' }}
        transition={{ delay: delay + 0.3, duration: 1, ease: 'easeOut' }}
        style={{ background: 'linear-gradient(90deg, #4338DF, #A977FA)' }}
      />
    </div>
  )
}

export default function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const speedRef = useRef<HTMLSpanElement>(null)
  const speedInView = useInView(speedRef, { once: true })
  const [speedCount, setSpeedCount] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  useEffect(() => {
    if (!speedInView) return
    let start = 0
    const target = 90
    const duration = 1200
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      start = Math.round(target * progress)
      setSpeedCount(start)
      if (progress >= 1) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [speedInView])

  const handlePlay = () => {
    setIsPlaying(true)
    const video = document.getElementById('demo-video') as HTMLVideoElement
    if (video) {
      video.play()
    }
  }

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="py-24 px-5 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #130842 0%, #1E0F6E 50%, #160B52 100%)' }}
    >
      {/* Decorative glow with parallax */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
        style={{ background: '#4338DF', y: glowY }}
      />

      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          {/* Label + badges */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: 'rgba(255,215,0,0.1)' }}
            >
              <Eye size={14} style={{ color: '#FFD700' }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#FFD700' }}>
                Превью
              </span>
            </motion.div>
            <div className="flex gap-2">
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: 'white' }}
              >
                <Clock size={12} /> 38 сек
              </motion.span>
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}
              >
                Посмотрите, как это работает
              </motion.span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] leading-[1.15]">
            Демо заезда
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Video - LEFT (larger) - slides from left */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 relative"
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(169,119,250,0.08)' }}
            >
              <video
                id="demo-video"
                controls={isPlaying}
                preload="metadata"
                className="w-full"
                style={{ aspectRatio: '16/9', background: '#0D0740' }}
                onPlay={() => setIsPlaying(true)}
              >
                <source src={`${import.meta.env.BASE_URL}demo.mp4`} type="video/mp4" />
                Ваш браузер не поддерживает видео
              </video>
              {/* Play button overlay */}
              {!isPlaying && (
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer border-none transition-all duration-300 hover:bg-black/20"
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="flex h-20 w-20 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
                    style={{ background: 'rgba(255,140,0,0.9)', boxShadow: '0 8px 32px rgba(255,140,0,0.4)' }}
                  >
                    <Play size={32} fill="white" color="white" />
                  </motion.div>
                </button>
              )}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <p className="text-sm font-semibold text-white/80">Смотреть демо</p>
              <span className="text-xs text-white/30">Как проходит заезд за 38 секунд</span>
            </div>
          </motion.div>

          {/* 3 cards stacked - RIGHT - slide from right */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Speedometer card */}
            <motion.div
              initial={{ opacity: 0, x: 40, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(104,56,206,0.15)' }}
              className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  whileHover={{ rotate: 20 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: '#6838CE' }}
                >
                  <Gauge size={18} strokeWidth={1.5} color="white" />
                </motion.div>
                <div>
                  <p className="text-sm font-bold text-white">Спидометр</p>
                  <p className="text-xs text-white/40">Ваша скорость в реальном времени</p>
                </div>
              </div>
              <p className="text-3xl font-bold mb-3" style={{ color: '#FFD700' }}>
                <span ref={speedRef}>{speedCount}</span> <span className="text-sm font-normal text-white/30">км/ч</span>
              </p>
              <AnimatedProgressBar width="75%" delay={0.1} />
              <div className="flex justify-between mt-1.5 text-[10px] text-white/20">
                <span>0</span>
                <span>120</span>
              </div>
            </motion.div>

            {/* Route card */}
            <motion.div
              initial={{ opacity: 0, x: 40, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(104,56,206,0.15)' }}
              className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  whileHover={{ rotate: 20 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: '#6838CE' }}
                >
                  <Flag size={18} strokeWidth={1.5} color="white" />
                </motion.div>
                <div>
                  <p className="text-sm font-bold text-white">Маршрут</p>
                  <p className="text-xs text-white/40">Прогресс по городам</p>
                </div>
              </div>
              <div className="space-y-2">
                {['Ассортиминск', 'Продукто-Брендск', 'Зачемград', 'Траффик-Сити', 'Цалово', 'Выборг'].map(
                  (city, i) => (
                    <motion.div
                      key={city}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: i < 4 ? '#A977FA' : 'rgba(255,255,255,0.1)' }}
                      />
                      <span className={`text-[13px] flex-1 ${i < 4 ? 'text-white/60' : 'text-white/25'}`}>
                        {city}
                      </span>
                      {i < 4 && (
                        <span className="text-xs font-semibold" style={{ color: '#A977FA' }}>+10</span>
                      )}
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>

            {/* Result card */}
            <motion.div
              initial={{ opacity: 0, x: 40, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(104,56,206,0.15)' }}
              className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  whileHover={{ rotate: 20 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: '#6838CE' }}
                >
                  <Trophy size={18} strokeWidth={1.5} color="white" />
                </motion.div>
                <div>
                  <p className="text-sm font-bold text-white">Результат</p>
                  <p className="text-xs text-white/40">Что получите на финише</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { text: '4/6 сильных', bg: 'rgba(169,119,250,0.15)', color: '#A977FA' },
                  { text: '2/6 слабых', bg: 'rgba(244,63,94,0.15)', color: '#fb7185' },
                  { text: '~34% потери', bg: 'rgba(255,215,0,0.1)', color: '#FFD700' },
                ].map((badge, idx) => (
                  <motion.span
                    key={badge.text}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.1, type: 'spring', stiffness: 200 }}
                    whileHover={{ scale: 1.08 }}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold"
                    style={{ background: badge.bg, color: badge.color }}
                  >
                    {badge.text}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
