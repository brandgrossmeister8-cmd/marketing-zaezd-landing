import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function CTASection() {
  const handleCTA = () => {
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors: ['#4338DF', '#FFD700', '#A977FA', '#6838CE', '#B8ACFF'] })
    window.open('https://t.me/SystemPromoBot?start=c1774180920281-ds', '_blank')
  }

  return (
    <section
      id="cta"
      className="relative py-16 px-4 sm:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1E0F6E 0%, #2A168F 50%, #4338DF 100%)' }}
    >
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(169,119,250,0.08) 0%, transparent 60%)' }} />

      <div className="relative mx-auto max-w-lg text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-white sm:text-3xl lg:text-[2.5rem] mb-4 leading-tight"
        >
          Готовы узнать скорость вашего бизнеса?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 text-sm"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          90 минут — полная картина вашего маркетинга
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(255,140,0,0.35)' }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCTA}
          className="rounded-full bg-[#FF8C00] px-8 py-3 text-base sm:px-10 sm:py-3.5 sm:text-lg font-bold transition-all duration-300 cursor-pointer border-none shadow-lg shadow-[#FF8C00]/20 w-full sm:w-auto"
          style={{ color: 'white' }}
        >
          Записаться на заезд
        </motion.button>
      </div>
    </section>
  )
}
