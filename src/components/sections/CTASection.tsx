import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function CTASection() {
  const handleCTA = () => {
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors: ['#4338DF', '#FFD700', '#A977FA', '#6838CE', '#B8ACFF'] })
    window.open('https://t.me/SystemPromoBot?start=c1774180920281-ds', '_blank')
  }

  return (
    <section
      id="cta"
      className="relative py-24 px-5 sm:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1E0F6E 0%, #2A168F 40%, #4338DF 100%)' }}
    >
      {/* Decorative orbs */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-15"
        style={{ background: '#6838CE' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10"
        style={{ background: '#A977FA' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(169,119,250,0.08) 0%, transparent 60%)' }}
      />

      <div className="relative mx-auto max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-5"
            style={{ color: 'rgba(255,215,0,0.5)' }}
          >
            Начните сейчас
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] leading-[1.15] mb-5">
            Готовы узнать скорость
            <br />
            <span style={{ color: '#FFD700' }}>вашего бизнеса?</span>
          </h2>
          <p
            className="mb-10 text-[15px] leading-relaxed max-w-md mx-auto"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            90 минут — и вы получите полную картину вашего маркетинга с конкретным планом действий
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 16px 48px rgba(255,140,0,0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCTA}
            className="inline-flex items-center gap-2 rounded-full bg-[#FF8C00] px-8 py-3.5 text-base sm:px-10 sm:py-4 sm:text-lg font-bold transition-all duration-300 cursor-pointer border-none shadow-lg shadow-[#FF8C00]/20 w-full sm:w-auto justify-center"
            style={{ color: 'white' }}
          >
            Записаться на заезд
            <ArrowRight size={18} strokeWidth={2} />
          </motion.button>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 text-xs"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          Безоплатно на время обкатки трассы
        </motion.p>
      </div>
    </section>
  )
}
