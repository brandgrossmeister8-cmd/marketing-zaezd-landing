import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Gauge, Trophy, Play, Eye, MapPin } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const cities = [
  { name: 'Ассортиминск', short: 'АС' },
  { name: 'Продукто-Брендск', short: 'ПБ' },
  { name: 'Зачемград', short: 'ЗГ' },
  { name: 'Траффик-Сити', short: 'ТС' },
  { name: 'Цалово', short: 'ЦА' },
  { name: 'Выборг', short: 'ВБ' },
]

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
  const glowX = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  useEffect(() => {
    if (!speedInView) return
    const target = 90
    const duration = 1200
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setSpeedCount(Math.round(target * eased))
      if (progress >= 1) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [speedInView])

  const handlePlay = () => {
    setIsPlaying(true)
    const video = document.getElementById('demo-video') as HTMLVideoElement
    if (video) video.play()
  }

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="py-24 px-5 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #0D0740 0%, #160B52 40%, #1E0F6E 100%)' }}
    >
      {/* Ambient glows */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.07]"
        style={{ background: '#4338DF', top: '10%', left: '20%', y: glowY, x: glowX }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full blur-[120px] opacity-[0.05]"
        style={{ background: '#A977FA', bottom: '15%', right: '10%', y: glowY }}
      />

      <div className="mx-auto max-w-6xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{ background: 'rgba(255,215,0,0.1)' }}
            >
              <Eye size={14} style={{ color: '#FFD700' }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#FFD700' }}>
                Превью
              </span>
            </motion.div>
          </div>

          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] leading-[1.15] mb-3">
            Как выглядит заезд
          </h2>
          <p className="text-base text-white/40 max-w-xl">
            38 секунд — и вы увидите, как 6 этапов превращаются в персональную стратегию продвижения
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Video — LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div
              className="relative rounded-2xl overflow-hidden group"
              style={{
                boxShadow: '0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(169,119,250,0.1)',
              }}
            >
              {/* Subtle gradient border effect */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(67,56,223,0.15), transparent 50%, rgba(169,119,250,0.1))',
                }}
              />

              <video
                id="demo-video"
                controls={isPlaying}
                preload="metadata"
                className="w-full relative z-0"
                style={{ aspectRatio: '16/9', background: '#0D0740' }}
                onPlay={() => setIsPlaying(true)}
              >
                <source src={`${import.meta.env.BASE_URL}demo.mp4`} type="video/mp4" />
                Ваш браузер не поддерживает видео
              </video>

              {/* Play overlay */}
              {!isPlaying && (
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer border-none transition-all duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(13,7,64,0.5), rgba(30,15,110,0.4))' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="flex h-20 w-20 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, #FF8C00, #ff6b00)',
                      boxShadow: '0 8px 40px rgba(255,140,0,0.35), 0 0 0 8px rgba(255,140,0,0.08)',
                    }}
                  >
                    <Play size={30} fill="white" color="white" className="ml-1" />
                  </motion.div>
                </button>
              )}
            </div>
          </motion.div>

          {/* Cards — RIGHT */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Speedometer */}
            <motion.div
              initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: 'rgba(104,56,206,0.2)' }}>
                  <Gauge size={17} strokeWidth={1.5} style={{ color: '#A977FA' }} />
                </div>
                <p className="text-sm font-semibold text-white/70">Ваша скорость</p>
              </div>

              <div className="flex items-baseline gap-1.5 mb-4">
                <span ref={speedRef} className="text-4xl font-bold" style={{ color: '#FFD700' }}>{speedCount}</span>
                <span className="text-sm text-white/25">км/ч</span>
              </div>

              {/* Mini gauge */}
              <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  initial={{ width: '0%' }}
                  animate={speedInView ? { width: '75%' } : { width: '0%' }}
                  transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
                  style={{ background: 'linear-gradient(90deg, #4338DF, #A977FA, #FFD700)' }}
                />
              </div>
              <div className="flex justify-between mt-1 text-[10px] text-white/15">
                <span>старт</span>
                <span>максимум</span>
              </div>
            </motion.div>

            {/* Route — compact city track */}
            <motion.div
              initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: 'rgba(104,56,206,0.2)' }}>
                  <MapPin size={17} strokeWidth={1.5} style={{ color: '#A977FA' }} />
                </div>
                <p className="text-sm font-semibold text-white/70">6 городов маршрута</p>
              </div>

              {/* Route visualization */}
              <div className="relative pl-4">
                {/* Vertical line */}
                <div className="absolute left-[7px] top-1 bottom-1 w-px" style={{ background: 'rgba(169,119,250,0.15)' }} />

                <div className="space-y-3">
                  {cities.map((city, i) => {
                    const passed = i < 4
                    return (
                      <motion.div
                        key={city.name}
                        initial={{ opacity: 0, x: 8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.06, duration: 0.25 }}
                        className="flex items-center gap-3 relative"
                      >
                        {/* Dot on the line */}
                        <div
                          className={`absolute -left-4 w-[9px] h-[9px] rounded-full z-10`}
                          style={{
                            background: passed ? '#A977FA' : 'rgba(255,255,255,0.08)',
                            boxShadow: passed ? '0 0 0 2px rgba(169,119,250,0.3)' : '0 0 0 2px rgba(255,255,255,0.05)',
                          }}
                        />

                        <span className={`text-[13px] ${passed ? 'text-white/60' : 'text-white/25'}`}>
                          {city.name}
                        </span>

                        {passed && (
                          <motion.span
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.06, type: 'spring', stiffness: 250 }}
                            className="ml-auto text-[11px] font-semibold"
                            style={{ color: '#A977FA' }}
                          >
                            +10
                          </motion.span>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* Result */}
            <motion.div
              initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: 'rgba(104,56,206,0.2)' }}>
                  <Trophy size={17} strokeWidth={1.5} style={{ color: '#A977FA' }} />
                </div>
                <p className="text-sm font-semibold text-white/70">На финише вы получите</p>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: 'Сильные стороны', value: '4 из 6', color: '#A977FA', bg: 'rgba(169,119,250,0.1)' },
                  { label: 'Точки роста', value: '2 из 6', color: '#fb7185', bg: 'rgba(244,63,94,0.1)' },
                  { label: 'Скрытые потери', value: '~34%', color: '#FFD700', bg: 'rgba(255,215,0,0.08)' },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.08, duration: 0.3 }}
                    className="flex items-center justify-between rounded-xl px-3.5 py-2.5"
                    style={{ background: item.bg }}
                  >
                    <span className="text-[13px] text-white/50">{item.label}</span>
                    <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
