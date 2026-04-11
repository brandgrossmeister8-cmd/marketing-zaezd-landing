import { motion, useScroll, useTransform } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ChevronDown, Clock, Car, Trophy } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' as const },
  }),
}

let sharedAudioCtx: AudioContext | null = null

function getAudioCtx() {
  if (!sharedAudioCtx) {
    sharedAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume()
  }
  return sharedAudioCtx
}

if (typeof window !== 'undefined') {
  const unlock = () => {
    getAudioCtx()
    document.removeEventListener('click', unlock)
    document.removeEventListener('touchstart', unlock)
    document.removeEventListener('scroll', unlock)
  }
  document.addEventListener('click', unlock)
  document.addEventListener('touchstart', unlock)
  document.addEventListener('scroll', unlock)
}

function playTypeClick() {
  try {
    const ctx = getAudioCtx()
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.03), ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.005))
    }
    const source = ctx.createBufferSource()
    source.buffer = buffer
    const gain = ctx.createGain()
    gain.gain.value = 0.3
    source.connect(gain)
    gain.connect(ctx.destination)
    source.start()
  } catch {}
}

function Typewriter({ text, speed = 60, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return
    const timer = setTimeout(() => {
      const nextChar = text[displayed.length]
      setDisplayed(text.slice(0, displayed.length + 1))
      if (nextChar !== ' ') playTypeClick()
    }, speed)
    return () => clearTimeout(timer)
  }, [displayed, started, text, speed])

  return (
    <>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-white/70 ml-1 align-middle" style={{ animation: 'blink 0.7s step-end infinite' }} />
      )}
    </>
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const handleCTA = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#4338DF', '#FFD700', '#A977FA', '#6838CE'],
    })
    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-12 px-4 sm:py-16 lg:py-24"
      style={{
        background: 'linear-gradient(135deg, #6838CE 0%, #2A168F 100%)',
      }}
    >
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Track photo background with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src="/track.webp" alt="" className="w-full h-full object-cover opacity-20" />
      </motion.div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Announcement badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm text-white/90"
            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-[#FFD700]"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
            Ближайший заезд — набор открыт
          </motion.span>
        </motion.div>

        {/* Title with flags */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-start justify-center gap-3 sm:gap-5 lg:gap-8 mb-6"
        >
          <motion.span
            className="text-4xl sm:text-6xl lg:text-8xl"
            animate={{ rotate: [0, -10, 10, -5, 0] }}
            transition={{ delay: 0.8, duration: 0.8, ease: 'easeInOut' }}
          >
            🏁
          </motion.span>
          <p className="font-bold uppercase tracking-wider text-white text-[22px] sm:text-[34px] lg:text-[52px] xl:text-[64px]">
            Маркетинговый заезд
          </p>
          <motion.span
            className="text-4xl sm:text-6xl lg:text-8xl"
            animate={{ rotate: [0, 10, -10, 5, 0] }}
            transition={{ delay: 0.8, duration: 0.8, ease: 'easeInOut' }}
          >
            🏁
          </motion.span>
        </motion.div>

        {/* Glass card with typewriter */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-2xl rounded-2xl px-6 py-7 sm:px-10 sm:py-9 mb-6"
          style={{
            background: 'rgba(104,56,206,0.4)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <h1
            className="font-bold leading-tight text-white mb-5 text-[16px] sm:text-[26px] lg:text-[38px]"
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            <Typewriter text="Узнайте, сколько денег теряет ваш бизнес прямо сейчас" speed={50} delay={300} />
          </h1>

          <p className="text-sm sm:text-base text-white/70 mb-5 leading-relaxed">
            За 90 минут вы получите диагностику маркетинга с конкретными цифрами
          </p>

          <p
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em]"
            style={{ color: '#FFD700' }}
          >
            Игра для предпринимателей и самозанятых
          </p>
        </motion.div>

        {/* Info pills with stagger + scale-in */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {[
            { icon: Clock, value: '90', label: 'минут' },
            { icon: Car, value: '6', label: 'гонщиков' },
            { icon: Trophy, value: '6', label: 'пит-стопов' },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + idx * 0.12, duration: 0.4, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="flex items-center gap-2.5 rounded-xl px-4 py-2.5"
                style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
              >
                <Icon size={16} style={{ color: '#FFD700' }} strokeWidth={1.8} />
                <div className="text-left">
                  <span className="text-white font-bold text-sm block leading-tight">{item.value}</span>
                  <span className="text-white/50 text-[11px]">{item.label}</span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA button */}
        <motion.button
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(255,140,0,0.35)' }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCTA}
          className="rounded-full bg-[#FF8C00] px-10 py-3.5 text-base sm:px-14 sm:py-4 sm:text-lg font-bold transition-all cursor-pointer border-none shadow-lg shadow-[#FF8C00]/30 w-full sm:w-auto"
          style={{ color: 'white' }}
        >
          Хочу узнать
        </motion.button>

        {/* Scroll down */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 sm:mt-12"
        >
          <button
            onClick={() =>
              document.querySelector('#problems')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="text-white/30 hover:text-white/60 transition-colors bg-transparent border-none cursor-pointer"
            aria-label="Scroll down"
          >
            <ChevronDown size={28} className="animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
