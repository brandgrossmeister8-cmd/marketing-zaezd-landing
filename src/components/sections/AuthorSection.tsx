import { motion } from 'framer-motion'

export default function AuthorSection() {
  return (
    <section className="py-12 px-4 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-bold lg:text-4xl mb-14"
          style={{ color: '#2A168F' }}
        >
          Об авторе
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl rounded-2xl border overflow-hidden"
          style={{ borderColor: '#A977FA', background: '#FAF5FF' }}
        >
          <img
            src={`${import.meta.env.BASE_URL}author.png`}
            alt="Ия Имшинецкая"
            className="w-full"
            style={{ maxHeight: '400px', objectFit: 'contain', objectPosition: 'center top', background: '#FAF5FF' }}
          />
          <div className="p-7">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#2A168F' }}>Ия Имшинецкая</h3>
            <ul className="space-y-2 mb-5 text-sm leading-relaxed" style={{ color: '#6838CE', listStyle: 'none', padding: 0 }}>
              <li>Создатель зарегистрированной авторской технологии системного продвижения</li>
              <li>Более 700 разработанных и успешно внедренных проектов продвижения по всему миру</li>
              <li>На рынке с 1993 года</li>
              <li>Создатель авторской школы креатива в рекламе</li>
              <li>Автор 17 книг о продвижении и рекламе</li>
              <li>Кандидат филологических наук</li>
              <li>Играющий бизнес-тренер</li>
            </ul>
            <div className="rounded-xl p-4 mb-4" style={{ background: '#F3E8FF', borderLeft: '3px solid #6838CE' }}>
              <p className="text-sm italic leading-relaxed" style={{ color: '#2A168F' }}>
                «Массовая модель продвижения умерла. Сегментирование и адресная коммуникация с конкретной клиентской группой — острая маркетинговая необходимость сегодняшнего дня»
              </p>
              <p className="text-xs mt-2 font-semibold" style={{ color: '#6838CE' }}>©️ Ия Имшинецкая</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
