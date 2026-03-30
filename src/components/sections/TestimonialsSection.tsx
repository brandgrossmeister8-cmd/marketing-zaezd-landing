import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  city: string
  text: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Анна К.',
    role: 'салон красоты',
    city: 'Краснодар',
    text: 'На этапе Цалово нужно было описать свою целевую аудиторию по 7 характеристикам. Я смогла назвать только 3. Стало понятно, почему реклама работала вхолостую, я просто не знала, кому продаю. Проработала все 7, пересобрала таргетинг, результат увидела уже в первый месяц.',
  },
  {
    name: 'Дмитрий Р.',
    role: 'IT интегратор',
    city: 'Москва',
    text: 'Калькулятор показал 47% потерь. Две слабые точки ослабляли бизнес каскадно, одна тянула за собой другую. Получил конкретную карту: что исправить первым, что вторым. Через два месяца закрыли три крупных контракта, которые раньше сливались на этапе переговоров. Планирую идти на интенсив по системному продвижению, чтобы выстроить систему полностью.',
  },
  {
    name: 'Елена М.',
    role: 'онлайн школа',
    city: 'Екатеринбург',
    text: 'На Зачемграде не смогла за 3 минуты сформулировать, зачем мой курс нужен клиенту. Поняла, если я не могу, значит мой лендинг тоже не может. Переписала оффер, конверсия заметно выросла.',
  },
  {
    name: 'Сергей В.',
    role: 'производство мебели',
    city: 'Ростов',
    text: 'Играли командой из 5 человек. Выборг показал, что мы делали ставку на разовые акции вместо системного продвижения. Это ослабляло все остальные усилия. Перестроили подход, результат почувствовали сразу. Планирую идти на интенсив по системному продвижению, чтобы выстроить систему полностью.',
  },
  {
    name: 'Марина Т.',
    role: 'консалтинг',
    city: 'Петербург',
    text: 'Финишировала на 40 км/ч из 120. Неприятно, но конкретно. Три точки роста из шести оказались слабыми и тормозили весь бизнес. Работаю по дорожной карте из заезда, за квартал закрыла две из трёх. Следующая цель 90 км/ч.',
  },
  {
    name: 'Ольга Д.',
    role: 'стоматология',
    city: 'Новосибирск',
    text: 'В Ассортиминске поняла, что продаю услугу, но продвигаю как товар. Перестроила коммуникацию, результат не заставил себя ждать. Планирую идти на интенсив по системному продвижению, чтобы выстроить систему полностью.',
  },
  {
    name: 'Алексей Н.',
    role: 'строительная компания',
    city: 'Казань',
    text: 'Траффик-Сити показал, что мы звали всех подряд. Перешли на стратегию "только тех, кого нужно". Качество заявок заметно выросло.',
  },
  {
    name: 'Наталья Г.',
    role: 'цветочный бизнес',
    city: 'Сочи',
    text: 'Из 6 этапов 4 оказались слабыми. Финишировала на 20 км/ч. Зато получила чёткий план, с чего начать. Первым делом проработала "зачем", потом пересобрала предложение для корпоративных клиентов. За 3 месяца этот сегмент вырос втрое.',
  },
  {
    name: 'Игорь К.',
    role: 'автосервис',
    city: 'Воронеж',
    text: 'Играли втроём из одной компании. Каждый видел маркетинг по-своему. После заезда впервые договорились, кто наш клиент и чем мы отличаемся от конкурентов.',
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-12 px-4 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-bold lg:text-4xl mb-4"
          style={{ color: '#2A168F' }}
        >
          Что говорят участники
        </motion.h2>

        {/* Stats highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-block rounded-2xl px-8 py-5" style={{ background: 'linear-gradient(135deg, #6838CE, #2A168F)' }}>
            <p className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2" style={{ color: '#FF8C00' }}>
              286
            </p>
            <p className="text-white text-sm sm:text-base font-semibold mb-1">
              предпринимателей уже сыграли
            </p>
            <p className="text-sm" style={{ color: '#A977FA' }}>
              и узнали скорость своего бизнеса
            </p>
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`rounded-2xl bg-white p-6 hover:shadow-xl transition-shadow duration-300 cursor-default ${
                i >= 3 ? 'lg:col-span-1 md:col-span-1' : ''
              }`}
              style={{ border: '1px solid #A977FA' }}
            >
              <Quote size={20} className="mb-3" style={{ color: 'rgba(169,119,250,0.4)' }} />
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#6838CE' }}>
                {t.text}
              </p>
              <div className="pt-4" style={{ borderTop: '1px solid #A977FA' }}>
                <p className="text-sm font-semibold" style={{ color: '#2A168F' }}>{t.name}</p>
                <p className="text-xs" style={{ color: '#A977FA' }}>
                  {t.role}, {t.city}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
