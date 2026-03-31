import { motion } from 'framer-motion'
import { Sparkles, Globe, Award, BookOpen, GraduationCap, Gamepad2, ShieldCheck, Briefcase } from 'lucide-react'

const credentials = [
  { icon: ShieldCheck, text: 'Зарегистрированная авторская технология системного продвижения' },
  { icon: Globe, text: 'Более 700 проектов продвижения по всему миру' },
  { icon: Award, text: 'На рынке с 1993 года' },
  { icon: Sparkles, text: 'Создатель авторской школы креатива в рекламе' },
  { icon: BookOpen, text: 'Автор 17 книг о продвижении и рекламе' },
  { icon: GraduationCap, text: 'Кандидат филологических наук' },
  { icon: Gamepad2, text: 'Играющий бизнес-тренер' },
]

const statBadges = [
  { icon: Briefcase, text: '700+ проектов' },
  { icon: BookOpen, text: '17 книг' },
  { icon: Award, text: '30+ лет на рынке' },
]

export default function AuthorSection() {
  return (
    <section
      className="py-24 px-5 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDFBFF 0%, #F5F0FF 50%, #EDE5FF 100%)' }}
    >
      {/* Decorative orb */}
      <div
        className="absolute top-10 right-10 w-[350px] h-[350px] rounded-full blur-[100px] opacity-25"
        style={{ background: 'radial-gradient(circle, #B8ACFF, transparent 70%)' }}
      />

      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: 'rgba(169,119,250,0.1)' }}>
            <Sparkles size={14} style={{ color: '#6838CE' }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#6838CE' }}>
              Автор технологии
            </span>
          </div>
          <h2
            className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem] leading-[1.15] mb-2"
            style={{ color: '#2A168F' }}
          >
            Ия Имшинецкая
          </h2>
          <p className="text-lg" style={{ color: '#8B7BAE' }}>
            Создатель технологии системного продвижения
          </p>
        </motion.div>

        {/* Two-column layout: text LEFT, photo RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-10 lg:gap-14"
        >
          {/* Text content - LEFT */}
          <div className="md:w-3/5 flex flex-col">
            {/* Credentials */}
            <div className="space-y-4 mb-8">
              {credentials.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="flex items-center gap-3.5"
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{ background: '#6838CE' }}
                    >
                      <Icon size={16} strokeWidth={1.5} color="white" />
                    </div>
                    <span className="text-sm leading-snug" style={{ color: '#3D2B6B' }}>
                      {item.text}
                    </span>
                  </motion.div>
                )
              })}
            </div>

            {/* Quote */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'linear-gradient(135deg, rgba(104,56,206,0.04), rgba(169,119,250,0.06))',
                borderLeft: '3px solid #A977FA',
              }}
            >
              <p className="text-sm italic leading-[1.7]" style={{ color: '#2A168F' }}>
                «Массовая модель продвижения умерла. Сегментирование и адресная коммуникация с конкретной клиентской группой — острая маркетинговая необходимость сегодняшнего дня»
              </p>
            </div>
          </div>

          {/* Photo - RIGHT */}
          <div className="md:w-2/5 shrink-0 flex flex-col items-center">
            <div
              className="relative rounded-3xl overflow-hidden w-full max-w-[400px]"
              style={{
                boxShadow: '0 20px 60px rgba(104,56,206,0.1), 0 0 0 1px rgba(169,119,250,0.08)',
              }}
            >
              {/* Decorative gradient behind photo */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, #F5F0FF 0%, #EDE5FF 100%)' }}
              />
              <img
                src={`${import.meta.env.BASE_URL}author.png`}
                alt="Ия Имшинецкая"
                className="relative w-full"
                style={{
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
              {/* Purple gradient bottom overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5"
                style={{ background: 'linear-gradient(to top, rgba(42,22,143,0.9), rgba(42,22,143,0.6), transparent)' }}
              >
                <p className="text-base font-bold text-white">Ия Имшинецкая</p>
                <p className="text-xs text-white/60">с 1993 года в маркетинге</p>
              </div>
            </div>

            {/* Stat badges below photo */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {statBadges.map((badge) => {
                const Icon = badge.icon
                return (
                  <div
                    key={badge.text}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2"
                    style={{ background: '#2A168F' }}
                  >
                    <Icon size={14} style={{ color: '#FFD700' }} />
                    <span className="text-xs font-bold text-white">{badge.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
