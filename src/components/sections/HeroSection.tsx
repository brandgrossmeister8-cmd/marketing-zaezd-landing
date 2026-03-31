import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
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

// Разблокируем аудио при первом взаимодействии
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
  const handleCTA = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#4338DF', '#FFD700', '#A977FA', '#6838CE'],
    })
    window.open('https://t.me/SystemPromoBot?start=c1774180920281-ds', '_blank')
  }

  return (
    <section
      className="relative overflow-hidden py-12 px-4 sm:py-20 lg:py-32"
      style={{
        background: 'linear-gradient(135deg, #6838CE 0%, #2A168F 100%)',
      }}
    >
      {/* Фото трассы на фоне */}
      <div className="absolute inset-0">
        <img src="/track.webp" alt="" className="w-full h-full object-cover opacity-20" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-start justify-center gap-3 sm:gap-5 lg:gap-8 mb-4"
        >
          <span className="text-4xl sm:text-6xl lg:text-8xl">🏁</span>
          <p className="font-bold uppercase tracking-wider text-white text-[22px] sm:text-[34px] lg:text-[52px] xl:text-[64px]">
            Маркетинговый заезд
          </p>
          <span className="text-4xl sm:text-6xl lg:text-8xl">🏁</span>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl rounded-2xl px-6 py-8 sm:px-10 sm:py-10 mb-10 backdrop-blur-md"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          <h1 className="font-bold leading-tight text-white mb-6 text-[16px] sm:text-[28px] lg:text-[46px] xl:text-[58px]" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
            <Typewriter text="Узнайте, сколько денег теряет ваш бизнес прямо сейчас" speed={50} delay={0} />
          </h1>
          <style>{`
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-white/80 lg:text-lg mb-8 leading-relaxed">
            Бизнес-заезд по технологии Ии Имшинецкой. За 90 минут вы получите
            диагностику вашего маркетинга с конкретными цифрами
          </p>

        </motion.div>

        <motion.button
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCTA}
          className="rounded-full bg-[#FF8C00] px-8 py-3 text-base sm:px-10 sm:py-4 sm:text-lg font-bold hover:brightness-110 transition-all cursor-pointer border-none shadow-lg shadow-[#FF8C00]/30 w-full sm:w-auto"
          style={{ color: 'white' }}
        >
          Участвую
        </motion.button>

        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 sm:mt-16"
        >
          <button
            onClick={() =>
              document.querySelector('#problems')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="text-white/50 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            aria-label="Scroll down"
          >
            <ChevronDown size={32} className="animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
