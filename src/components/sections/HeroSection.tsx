import { motion, useScroll, useTransform } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useEffect, useRef, useState } from 'react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260227_042027_c4b2f2ea-1c7c-4d6e-9e3d-81a78063703f.mp4'

const rubik: React.CSSProperties = {
  fontFamily: "'Rubik', system-ui, sans-serif",
  letterSpacing: '-0.04em',
}

let sharedAudioCtx: AudioContext | null = null
function getAudioCtx() {
  if (!sharedAudioCtx) {
    sharedAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  if (sharedAudioCtx.state === 'suspended') sharedAudioCtx.resume()
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
    gain.gain.value = 0.25
    source.connect(gain)
    gain.connect(ctx.destination)
    source.start()
  } catch {}
}

function Typewriter({ text, speed = 50, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return
    const t = setTimeout(() => {
      const nextChar = text[displayed.length]
      setDisplayed(text.slice(0, displayed.length + 1))
      if (nextChar !== ' ') playTypeClick()
    }, speed)
    return () => clearTimeout(t)
  }, [displayed, started, text, speed])
  return (
    <>
      {displayed}
      {displayed.length < text.length && (
        <span
          className="inline-block w-[3px] h-[0.95em] bg-white/85 ml-1 align-middle"
          style={{ animation: 'heroBlink 0.75s step-end infinite' }}
        />
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
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  const handleCTA = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#A977FA', '#FFD700', '#6838CE', '#4338DF', '#B8ACFF'],
    })
    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center justify-center min-h-[100svh] -mt-[64px] sm:-mt-[72px] lg:-mt-[80px] py-16 px-4 sm:px-8"
    >
      <style>{`
        @keyframes heroBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .hero-title { font-size: 36px; line-height: 0.98; }
        @media (min-width: 640px) { .hero-title { font-size: 52px; } }
        @media (min-width: 1024px) { .hero-title { font-size: 72px; } }
      `}</style>

      {/* Background video — saturated to keep red truck vivid; purple-lilac vignette around the edges */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: videoY }}>
        <video
          src={VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ filter: 'saturate(1.55) contrast(1.05)' }}
        />
        {/* Radial vignette: clear in the center where the truck rides, deep violet at edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 55%, rgba(42,22,143,0.05) 0%, rgba(42,22,143,0.18) 35%, rgba(42,22,143,0.55) 75%, rgba(30,15,110,0.78) 100%)',
          }}
        />
        {/* Soft violet wash to push ambiance toward lilac without killing red */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(104,56,206,0.28) 0%, rgba(67,56,223,0.18) 50%, rgba(169,119,250,0.22) 100%)',
            mixBlendMode: 'soft-light',
          }}
        />
      </motion.div>

      {/* Centered attention-grabbing glass panel */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-3xl overflow-hidden"
        style={{
          background: 'rgba(42,22,143,0.32)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 22,
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.14), inset 0 0 0 1px rgba(255,255,255,0.03), 0 30px 80px rgba(20,8,60,0.55)',
          padding: 'clamp(24px, 4vw, 48px)',
        }}
      >
        {/* Diagonal sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0) 70%)',
            mixBlendMode: 'overlay',
          }}
        />

        <div className="relative text-center">
          {/* Title with flags */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="flex items-center justify-center gap-3 sm:gap-5 mb-5 sm:mb-7"
          >
            <motion.span
              className="text-3xl sm:text-5xl lg:text-6xl"
              animate={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              🏁
            </motion.span>
            <h1
              className="hero-title text-white font-extrabold uppercase"
              style={rubik}
            >
              Маркетинговый заезд
            </h1>
            <motion.span
              className="text-3xl sm:text-5xl lg:text-6xl"
              animate={{ rotate: [0, 10, -10, 5, 0] }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              🏁
            </motion.span>
          </motion.div>

          {/* Typewriter attention line */}
          <p
            className="font-bold text-white text-[18px] sm:text-[24px] lg:text-[30px] leading-tight mb-4 sm:mb-5 min-h-[2.4em]"
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            <Typewriter text="Узнайте, сколько денег теряет ваш бизнес прямо сейчас" speed={45} delay={400} />
          </p>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5 max-w-xl mx-auto"
          >
            За 90 минут вы получите диагностику маркетинга с конкретными цифрами
          </motion.p>

          {/* Gold accent line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.85, duration: 0.6 }}
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] mb-7 sm:mb-9"
            style={{ color: '#FFD700' }}
          >
            Игра для предпринимателей и самозанятых
          </motion.p>

          {/* CTA — violet/lilac to match ambiance */}
          <motion.button
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.05, duration: 0.55 }}
            whileHover={{ scale: 1.05, boxShadow: '0 18px 50px rgba(169,119,250,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCTA}
            className="rounded-full px-10 py-3.5 sm:px-14 sm:py-4 text-base sm:text-lg font-bold uppercase text-white border-none cursor-pointer w-full sm:w-auto"
            style={{
              ...rubik,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #A977FA 0%, #6838CE 50%, #4338DF 100%)',
              boxShadow: '0 14px 40px rgba(104,56,206,0.5)',
            }}
          >
            Хочу узнать
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
