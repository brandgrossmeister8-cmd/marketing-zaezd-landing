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

type TypewriterProps = {
  text: string
  speed?: number
  delay?: number
  loop?: boolean
  holdMs?: number
  eraseSpeed?: number
}
function Typewriter({ text, speed = 50, delay = 0, loop = false, holdMs = 1800, eraseSpeed = 30 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<'idle' | 'typing' | 'holding' | 'erasing'>('idle')

  useEffect(() => {
    const t = setTimeout(() => setPhase('typing'), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (phase === 'typing') {
      if (displayed.length >= text.length) {
        setPhase(loop ? 'holding' : 'idle')
        return
      }
      const t = setTimeout(() => {
        const nextChar = text[displayed.length]
        setDisplayed(text.slice(0, displayed.length + 1))
        if (nextChar !== ' ') playTypeClick()
      }, speed)
      return () => clearTimeout(t)
    }
    if (phase === 'holding') {
      const t = setTimeout(() => setPhase('erasing'), holdMs)
      return () => clearTimeout(t)
    }
    if (phase === 'erasing') {
      if (displayed.length === 0) {
        setPhase('typing')
        return
      }
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), eraseSpeed)
      return () => clearTimeout(t)
    }
  }, [phase, displayed, text, speed, loop, holdMs, eraseSpeed])

  const showCursor = loop || displayed.length < text.length
  return (
    <>
      {displayed}
      {showCursor && (
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
      className="relative overflow-hidden min-h-[100svh] -mt-[64px] sm:-mt-[72px] lg:-mt-[80px]"
    >
      <style>{`
        @keyframes heroBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .hero-title { font-size: 20px; line-height: 1; white-space: nowrap; }
        @media (min-width: 380px) { .hero-title { font-size: 22px; } }
        @media (min-width: 640px) { .hero-title { font-size: 32px; } }
        @media (min-width: 1024px) { .hero-title { font-size: 42px; } }
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

      {/* TOP PANEL — heading, top-right */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="absolute left-4 sm:left-8 lg:left-12 top-[88px] sm:top-[104px] lg:top-[120px] w-[calc(100%-2rem)] sm:w-auto sm:max-w-[640px] overflow-hidden z-10"
        style={{
          background: 'rgba(42,22,143,0.32)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 22,
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.14), inset 0 0 0 1px rgba(255,255,255,0.03), 0 30px 80px rgba(20,8,60,0.55)',
          padding: 'clamp(16px, 2.6vw, 28px)',
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0) 70%)',
            mixBlendMode: 'overlay',
          }}
        />
        <div className="relative flex items-center justify-center gap-2 sm:gap-3">
          <motion.span
            className="text-2xl sm:text-3xl lg:text-4xl"
            animate={{ rotate: [0, -10, 10, -5, 0] }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            🏁
          </motion.span>
          <h1 className="hero-title text-white font-extrabold uppercase text-center whitespace-nowrap" style={rubik}>
            Маркетинговый заезд
          </h1>
          <motion.span
            className="text-2xl sm:text-3xl lg:text-4xl"
            animate={{ rotate: [0, 10, -10, 5, 0] }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            🏁
          </motion.span>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative mt-3 sm:mt-4 text-center text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em]"
          style={{ color: '#FFD700' }}
        >
          Игра для предпринимателей и самозанятых
        </motion.p>
      </motion.div>

      {/* BOTTOM PANEL — typewriter + subline + gold + CTA, bottom-left compact */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        className="absolute right-4 sm:right-8 lg:right-12 bottom-6 sm:bottom-8 lg:bottom-10 w-[calc(100%-2rem)] sm:w-auto sm:max-w-[380px] overflow-hidden z-10"
        style={{
          background: 'rgba(42,22,143,0.32)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 18,
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.14), inset 0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px rgba(20,8,60,0.5)',
          padding: 'clamp(16px, 2vw, 22px)',
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0) 70%)',
            mixBlendMode: 'overlay',
          }}
        />
        <div className="relative text-left">
          <p
            className="font-extrabold uppercase text-white text-[18px] sm:text-[20px] leading-tight mb-3"
            style={{ fontFamily: "'Courier New', Courier, monospace", letterSpacing: '-0.01em', minHeight: '1.3em' }}
          >
            <Typewriter text="Узнайте, сколько денег теряет ваш бизнес прямо сейчас" speed={45} delay={400} loop holdMs={2200} eraseSpeed={28} />
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="text-white/75 text-xs sm:text-[13px] leading-snug mb-3"
          >
            За 90 минут вы получите диагностику маркетинга с конкретными цифрами
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.05, duration: 0.55 }}
            whileHover={{ scale: 1.04, boxShadow: '0 14px 40px rgba(169,119,250,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCTA}
            className="rounded-full px-7 py-2.5 sm:px-9 sm:py-3 text-sm sm:text-base font-bold uppercase text-white border-none cursor-pointer w-full sm:w-auto"
            style={{
              ...rubik,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #A977FA 0%, #6838CE 50%, #4338DF 100%)',
              boxShadow: '0 12px 32px rgba(104,56,206,0.5)',
            }}
          >
            Хочу узнать
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
