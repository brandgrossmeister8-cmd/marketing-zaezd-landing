import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function CTASection() {
  const handleCTA = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#4338DF', '#FFD700', '#A977FA', '#6838CE', '#B8ACFF'],
    })
    window.open('https://t.me/SystemPromoBot?start=c1774180920281-ds', '_blank')
  }

  return (
    <section
      id="cta"
      className="relative py-12 px-4 sm:py-20 lg:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2A168F 0%, #4338DF 50%, #2A168F 100%)',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-[10%] text-8xl">🏎️</div>
        <div className="absolute bottom-10 right-[10%] text-8xl">🏁</div>
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-white lg:text-4xl mb-4"
        >
          Готовы узнать реальную скорость вашего бизнеса?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-white/70 mb-10"
        >
          Запишитесь на ближайшую онлайн-игру
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCTA}
          className="inline-flex items-center justify-center gap-3 rounded-full bg-gold px-8 py-3 text-base sm:px-10 sm:py-4 sm:text-lg font-bold hover:brightness-110 transition-all cursor-pointer border-none shadow-lg shadow-gold/30 w-full sm:w-auto"
          style={{ color: '#2A168F' }}
        >
          Записаться на игру
        </motion.button>

      </div>
    </section>
  )
}
