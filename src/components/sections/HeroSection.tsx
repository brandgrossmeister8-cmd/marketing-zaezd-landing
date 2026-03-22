import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ChevronDown } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' as const },
  }),
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
      {/* Decorative racing lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gold" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gold" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gold" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-bold uppercase tracking-wider text-white mb-4 text-[22px] sm:text-[34px] lg:text-[52px] xl:text-[64px]"
        >
          Маркетинговый заезд
        </motion.p>

        <motion.div
          custom={0.5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <span
            className="inline-block text-4xl sm:text-6xl lg:text-8xl"
            style={{
              filter: 'sepia(1) saturate(5) hue-rotate(10deg) brightness(1.1)',
              animation: 'carDrive 4s ease-in-out infinite',
            }}
          >
            🏎️
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-bold leading-tight text-white mb-6 text-[18px] sm:text-[30px] lg:text-[48px] xl:text-[60px]"
        >
          Узнайте, сколько денег теряет ваш бизнес прямо сейчас
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-2xl text-sm sm:text-base text-white/80 lg:text-lg mb-8 leading-relaxed px-2"
        >
          Бизнес-игра &laquo;Маркетинговый заезд&raquo; по технологии системного продвижения
          Ии Имшинецкой. 90&nbsp;минут и&nbsp;вы получите точную диагностику маркетинга
          с&nbsp;цифрами
        </motion.p>

        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-xs sm:text-sm text-gold font-semibold mb-10"
        >
          286 предпринимателей уже сыграли офлайн. Запускаем онлайн-формат
        </motion.p>

        <motion.button
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCTA}
          className="rounded-full bg-gold px-8 py-3 text-base sm:px-10 sm:py-4 sm:text-lg font-bold hover:brightness-110 transition-all cursor-pointer border-none shadow-lg shadow-gold/30 w-full sm:w-auto"
          style={{ color: '#6838CE' }}
        >
          Хочу в игру
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
