import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  city: string
  text: string
}

const testimonials: Testimonial[] = [
  { name: 'Анна К.', role: 'салон красоты', city: 'Краснодар', text: 'На этапе Цалово нужно было описать свою целевую аудиторию по 7 характеристикам. Я смогла назвать только 3. Стало понятно, почему реклама работала вхолостую, я просто не знала, кому продаю. Проработала все 7, пересобрала таргетинг, результат увидела уже в первый месяц.' },
  { name: 'Дмитрий Р.', role: 'IT интегратор', city: 'Москва', text: 'Калькулятор показал 47% потерь. Две слабые точки ослабляли бизнес каскадно, одна тянула за собой другую. Получил конкретную карту: что исправить первым, что вторым. Через два месяца закрыли три крупных контракта, которые раньше сливались на этапе переговоров.' },
  { name: 'Елена М.', role: 'онлайн школа', city: 'Екатеринбург', text: 'На Зачемграде не смогла за 3 минуты сформулировать, зачем мой курс нужен клиенту. Поняла, если я не могу, значит мой лендинг тоже не может. Переписала оффер, конверсия заметно выросла.' },
  { name: 'Сергей В.', role: 'производство мебели', city: 'Ростов', text: 'Играли командой из 5 человек. Выборг показал, что мы делали ставку на разовые акции вместо системного продвижения. Перестроили подход, результат почувствовали сразу.' },
  { name: 'Марина Т.', role: 'консалтинг', city: 'Петербург', text: 'Финишировала на 40 км/ч из 120. Неприятно, но конкретно. Три точки роста из шести оказались слабыми. Работаю по дорожной карте из заезда, за квартал закрыла две из трёх.' },
  { name: 'Ольга Д.', role: 'стоматология', city: 'Новосибирск', text: 'В Ассортиминске поняла, что продаю услугу, но продвигаю как товар. Перестроила коммуникацию, результат не заставил себя ждать.' },
  { name: 'Алексей Н.', role: 'строительная компания', city: 'Казань', text: 'Траффик-Сити показал, что мы звали всех подряд. Перешли на стратегию "только тех, кого нужно". Качество заявок заметно выросло.' },
  { name: 'Наталья Г.', role: 'цветочный бизнес', city: 'Сочи', text: 'Из 6 этапов 4 оказались слабыми. Финишировала на 20 км/ч. Зато получила чёткий план. Первым делом проработала "зачем", потом пересобрала предложение для корпоративных клиентов. За 3 месяца этот сегмент вырос втрое.' },
  { name: 'Игорь К.', role: 'автосервис', city: 'Воронеж', text: 'Играли втроём из одной компании. Каждый видел маркетинг по-своему. После заезда впервые договорились, кто наш клиент и чем мы отличаемся от конкурентов.' },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-5 sm:py-32 relative overflow-hidden">
      {/* Decorative orb */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
        style={{ background: 'radial-gradient(circle, #B8ACFF, transparent 70%)' }}
      />

      <div className="mx-auto max-w-6xl relative">
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
            Отзывы
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <h2
              className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem] leading-[1.15]"
              style={{ color: '#2A168F' }}
            >
              Что говорят участники
            </h2>
            <div
              className="inline-flex items-baseline gap-2 rounded-full px-5 py-2"
              style={{ background: 'linear-gradient(135deg, rgba(255,140,0,0.08), rgba(255,140,0,0.04))' }}
            >
              <span className="text-2xl font-bold" style={{ color: '#FF8C00' }}>286</span>
              <span className="text-sm" style={{ color: '#8B7BAE' }}>участников</span>
            </div>
          </div>
        </motion.div>

        {/* Masonry layout */}
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              className="group relative rounded-2xl bg-white p-6 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(104,56,206,0.08)] hover:-translate-y-0.5"
              style={{ border: '1px solid rgba(169,119,250,0.08)' }}
            >
              <Quote
                size={20}
                className="mb-4 opacity-20"
                style={{ color: '#A977FA' }}
                strokeWidth={1.5}
              />
              <p className="text-sm leading-[1.75] mb-5" style={{ color: '#3D2B6B' }}>
                {t.text}
              </p>
              <div
                className="pt-4"
                style={{ borderTop: '1px solid rgba(169,119,250,0.06)' }}
              >
                <p className="text-sm font-bold" style={{ color: '#2A168F' }}>{t.name}</p>
                <p className="text-[12px] mt-0.5" style={{ color: '#A977FA' }}>
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
