import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Gauge, Trophy, Play, Flag } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const cities = [
  { name: 'Ассортиминск', km: 20 },
  { name: 'Продукто-Брендск', km: 40 },
  { name: 'Зачемград', km: 60 },
  { name: 'Траффик-Сити', km: 80 },
  { name: 'Цалово', km: 100 },
  { name: 'Выборг', km: 120 },
]

export default function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const speedRef = useRef<HTMLSpanElement>(null)
  const speedInView = useInView(speedRef, { once: true })
  const [speedCount, setSpeedCount] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const trackInView = useInView(trackRef, { once: true })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

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
      style={{ background: 'linear-gradient(170deg, #0A0530 0%, #120845 40%, #1A0C5A 100%)' }}
    >
      {/* Checkered flag strip — top */}
      <div className="absolute top-0 left-0 right-0 h-2 flex">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={`top-${i}`}
            className="flex-1 h-full"
            style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.08)' : 'transparent' }}
          />
        ))}
      </div>

      {/* Ambient glows */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.06]"
        style={{ background: '#4338DF', top: '5%', left: '15%', y: glowY }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[140px] opacity-[0.04]"
        style={{ background: '#FF8C00', bottom: '10%', right: '5%', y: glowY }}
      />

      <div className="mx-auto max-w-6xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{ background: 'rgba(255,140,0,0.12)' }}
            >
              <Flag size={14} style={{ color: '#FF8C00' }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#FF8C00' }}>
                Превью гонки
              </span>
            </motion.div>
          </div>

          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] leading-[1.15] mb-3">
            Как выглядит заезд
          </h2>
          <p className="text-base text-white/60 max-w-xl">
            38 секунд — и вы увидите, как 6 этапов превращаются в персональную стратегию
          </p>
        </motion.div>

        {/* Race dashboard layout */}
        <div className="grid gap-6 lg:grid-cols-12">

          {/* Video — main screen */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8"
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 0 0 1px rgba(255,140,0,0.15), 0 24px 80px rgba(0,0,0,0.5)',
              }}
            >
              {/* HUD corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-2xl z-10 pointer-events-none" style={{ borderColor: 'rgba(255,140,0,0.3)' }} />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-2xl z-10 pointer-events-none" style={{ borderColor: 'rgba(255,140,0,0.3)' }} />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-2xl z-10 pointer-events-none" style={{ borderColor: 'rgba(255,140,0,0.3)' }} />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-2xl z-10 pointer-events-none" style={{ borderColor: 'rgba(255,140,0,0.3)' }} />

              {/* REC indicator */}
              {!isPlaying && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#ef4444' }}
                  />
                  <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-wider">demo</span>
                </div>
              )}

              <video
                id="demo-video"
                controls={isPlaying}
                preload="metadata"
                className="w-full relative z-0"
                style={{ aspectRatio: '16/9', background: '#080430' }}
                onPlay={() => setIsPlaying(true)}
              >
                <source src={`${import.meta.env.BASE_URL}demo.mp4`} type="video/mp4" />
                Ваш браузер не поддерживает видео
              </video>

              {/* Play overlay */}
              {!isPlaying && (
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 cursor-pointer border-none"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(10,5,48,0.3), rgba(10,5,48,0.7))' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="flex h-20 w-20 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, #FF8C00, #ff6b00)',
                      boxShadow: '0 0 60px rgba(255,140,0,0.3), 0 0 0 6px rgba(255,140,0,0.1)',
                    }}
                  >
                    <Play size={30} fill="white" color="white" className="ml-1" />
                  </motion.div>
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">Смотреть заезд</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Dashboard panel — RIGHT */}
          <div className="lg:col-span-4 flex flex-col gap-4">

            {/* Speedometer — analog gauge with needle */}
            <motion.div
              initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,140,0,0.12)' }}
            >
              <div className="flex items-center justify-between mb-2 relative">
                <div className="flex items-center gap-2">
                  <Gauge size={16} style={{ color: '#FF8C00' }} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Скорость</span>
                </div>
                <span className="text-[10px] font-mono text-white/25">KM/H</span>
              </div>

              {/* SVG Gauge */}
              <div className="flex justify-center">
                <svg viewBox="0 0 200 120" className="w-full max-w-[220px]">
                  {/* Arc background */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  {/* Arc filled */}
                  <motion.path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="url(#gaugeGrad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="251"
                    initial={{ strokeDashoffset: 251 }}
                    animate={speedInView ? { strokeDashoffset: 251 * 0.25 } : { strokeDashoffset: 251 }}
                    transition={{ delay: 0.4, duration: 1.5, ease: 'easeOut' }}
                  />
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF8C00" />
                      <stop offset="100%" stopColor="#FFD700" />
                    </linearGradient>
                  </defs>

                  {/* Tick marks */}
                  {[0, 20, 40, 60, 80, 100, 120].map((val, i) => {
                    const angle = -180 + (i / 6) * 180
                    const rad = (angle * Math.PI) / 180
                    const x1 = 100 + 72 * Math.cos(rad)
                    const y1 = 100 + 72 * Math.sin(rad)
                    const x2 = 100 + 80 * Math.cos(rad)
                    const y2 = 100 + 80 * Math.sin(rad)
                    const tx = 100 + 62 * Math.cos(rad)
                    const ty = 100 + 62 * Math.sin(rad)
                    return (
                      <g key={val}>
                        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                        <text x={tx} y={ty} fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="monospace" textAnchor="middle" dominantBaseline="middle">
                          {val}
                        </text>
                      </g>
                    )
                  })}

                  {/* Needle */}
                  <motion.g
                    style={{ transformOrigin: '100px 100px' }}
                    initial={{ rotate: -180 }}
                    animate={speedInView ? { rotate: -180 + (speedCount / 120) * 180 } : { rotate: -180 }}
                    transition={{ delay: 0.4, duration: 1.5, ease: 'easeOut' }}
                  >
                    <line x1="100" y1="100" x2="100" y2="32" stroke="#FF8C00" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="100" y1="100" x2="100" y2="32" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                  </motion.g>

                  {/* Center circle */}
                  <circle cx="100" cy="100" r="6" fill="#1a0c5a" stroke="#FF8C00" strokeWidth="2" />
                  <circle cx="100" cy="100" r="2.5" fill="#FFD700" />

                  {/* Speed value */}
                  <text ref={speedRef as any} x="100" y="90" fill="#FFD700" fontSize="22" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    {speedCount}
                  </text>
                  <text x="100" y="78" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="monospace" textAnchor="middle">
                    км/ч
                  </text>
                </svg>
              </div>
            </motion.div>

            {/* Race track — horizontal mini-map */}
            <motion.div
              ref={trackRef}
              initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(169,119,250,0.12)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flag size={16} style={{ color: '#A977FA' }} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Маршрут</span>
                </div>
                <span className="text-[10px] font-mono" style={{ color: '#A977FA' }}>4/6</span>
              </div>

              {/* Horizontal track */}
              <div className="relative mb-3">
                {/* Track line */}
                <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <motion.div
                  className="absolute top-0 left-0 h-1 rounded-full"
                  initial={{ width: '0%' }}
                  animate={trackInView ? { width: '66%' } : { width: '0%' }}
                  transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                  style={{ background: 'linear-gradient(90deg, #4338DF, #A977FA)' }}
                />

                {/* City markers */}
                <div className="absolute top-0 left-0 right-0 flex justify-between" style={{ transform: 'translateY(-3px)' }}>
                  {cities.map((city, i) => {
                    const passed = i < 4
                    return (
                      <motion.div
                        key={city.name}
                        initial={{ scale: 0 }}
                        animate={trackInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 300 }}
                        className="w-[7px] h-[7px] rounded-full"
                        style={{
                          background: passed ? '#A977FA' : 'rgba(255,255,255,0.15)',
                          boxShadow: passed ? '0 0 6px rgba(169,119,250,0.5)' : 'none',
                        }}
                      />
                    )
                  })}
                </div>

                {/* Car emoji on track */}
                <motion.div
                  className="absolute text-sm"
                  style={{ top: '-10px' }}
                  initial={{ left: '0%' }}
                  animate={trackInView ? { left: '63%' } : { left: '0%' }}
                  transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                >
                  🏎️
                </motion.div>
              </div>

              {/* City names */}
              <div className="space-y-1.5 mt-4">
                {cities.map((city, i) => {
                  const passed = i < 4
                  return (
                    <motion.div
                      key={city.name}
                      initial={{ opacity: 0, x: 8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.2 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: passed ? '#A977FA' : 'rgba(255,255,255,0.1)' }} />
                        <span className={`text-[12px] font-mono ${passed ? 'text-white/60' : 'text-white/25'}`}>
                          {city.name}
                        </span>
                      </div>
                      {passed && (
                        <span className="text-[10px] font-mono font-bold" style={{ color: '#4ade80' }}>+10</span>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Finish results — compact */}
            <motion.div
              initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,215,0,0.12)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy size={16} style={{ color: '#FFD700' }} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Финиш</span>
                </div>
                <span className="text-[10px] font-mono" style={{ color: '#FFD700' }}>🏁</span>
              </div>

              <div className="space-y-2">
                {[
                  { label: 'Сильные', value: '4/6', color: '#A977FA', bar: '66%' },
                  { label: 'Точки роста', value: '2/6', color: '#fb7185', bar: '33%' },
                  { label: 'Потери', value: '~34%', color: '#FFD700', bar: '34%' },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.08, duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-white/40">{item.label}</span>
                      <span className="text-[12px] font-mono font-bold" style={{ color: item.color }}>{item.value}</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: '0%' }}
                        whileInView={{ width: item.bar }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + idx * 0.1, duration: 0.8, ease: 'easeOut' }}
                        style={{ background: item.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Checkered flag strip — bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-2 flex">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={`bot-${i}`}
            className="flex-1 h-full"
            style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.08)' : 'transparent' }}
          />
        ))}
      </div>
    </section>
  )
}
