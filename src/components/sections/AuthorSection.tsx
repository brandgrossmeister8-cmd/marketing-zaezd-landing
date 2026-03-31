import { motion } from 'framer-motion'
import { BookOpen, Globe, Award, GraduationCap, Gamepad2 } from 'lucide-react'

const credentials = [
  { icon: Globe, text: 'Более 700 проектов продвижения по всему миру' },
  { icon: Award, text: 'На рынке с 1993 года' },
  { icon: BookOpen, text: 'Автор 17 книг о продвижении и рекламе' },
  { icon: GraduationCap, text: 'Кандидат филологических наук' },
  { icon: Gamepad2, text: 'Играющий бизнес-тренер' },
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

      <div className="mx-auto max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: '#A977FA' }}
          >
            Автор технологии
          </p>
          <h2
            className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem] leading-[1.15]"
            style={{ color: '#2A168F' }}
          >
            Ия Имшинецкая
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-10 lg:gap-14"
        >
          {/* Photo - shown fully, no cropping */}
          <div className="md:w-2/5 shrink-0 flex justify-center">
            <div
              className="relative rounded-3xl overflow-hidden"
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
                className="relative w-full max-w-[360px]"
                style={{
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Text content */}
          <div className="md:w-3/5 flex flex-col">
            <p
              className="text-lg font-semibold mb-2"
              style={{ color: '#2A168F' }}
            >
              Создатель технологии системного продвижения
            </p>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: '#8B7BAE' }}
            >
              Практик с 30-летним опытом, чья методология помогает компаниям выстраивать маркетинг как систему, а не набор случайных действий.
            </p>

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
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: 'rgba(104,56,206,0.06)', color: '#6838CE' }}
                    >
                      <Icon size={16} strokeWidth={1.5} />
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
        </motion.div>
      </div>
    </section>
  )
}
