import { motion } from 'framer-motion'

export default function AuthorSection() {
  return (
    <section className="py-16 px-4 sm:py-24" style={{ background: 'linear-gradient(180deg, #F9F7FF 0%, #F3EEFF 100%)' }}>
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl font-bold sm:text-3xl lg:text-[2.5rem] mb-12 leading-tight"
          style={{ color: '#2A168F' }}
        >
          Об авторе технологии
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-stretch gap-0 rounded-2xl bg-white overflow-hidden"
          style={{ border: '1px solid rgba(169,119,250,0.06)', boxShadow: '0 8px 32px rgba(104,56,206,0.04)' }}
        >
          <div className="md:w-3/5 p-6 sm:p-8 flex flex-col justify-center order-2 md:order-1">
            <h3 className="text-xl font-bold mb-1" style={{ color: '#2A168F' }}>Ия Имшинецкая</h3>
            <p className="text-xs mb-5" style={{ color: '#A977FA' }}>Создатель технологии системного продвижения</p>

            <div className="space-y-2.5 mb-6">
              {[
                'Более 700 проектов продвижения по всему миру',
                'На рынке с 1993 года',
                'Автор 17 книг о продвижении и рекламе',
                'Кандидат филологических наук',
                'Играющий бизнес-тренер',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-2 h-1 w-1 rounded-full shrink-0" style={{ background: '#A977FA' }} />
                  <span className="text-sm leading-relaxed" style={{ color: '#3D2B6B' }}>{item}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-4" style={{ background: 'linear-gradient(135deg, rgba(104,56,206,0.03), rgba(169,119,250,0.05))', borderLeft: '2px solid #A977FA' }}>
              <p className="text-sm italic leading-relaxed" style={{ color: '#2A168F' }}>
                «Массовая модель продвижения умерла. Сегментирование и адресная коммуникация с конкретной клиентской группой — острая маркетинговая необходимость сегодняшнего дня»
              </p>
            </div>
          </div>

          <div className="md:w-2/5 shrink-0 order-1 md:order-2">
            <img
              src={`${import.meta.env.BASE_URL}author.png`}
              alt="Ия Имшинецкая"
              className="w-full h-full"
              style={{ objectFit: 'cover', objectPosition: 'center top', minHeight: '300px' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
