import { motion } from 'framer-motion'
import { Quote, Users, Target, Clock } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  city: string
  text: string
  highlight?: string
  initial: string
  color: string
}

const featured: Testimonial = {
  name: 'Дмитрий Р.',
  role: 'IT интегратор',
  city: 'Москва',
  text: 'Калькулятор показал 47% потерь. Две слабые точки ослабляли бизнес каскадно, одна тянула за собой другую. Получил конкретную карту: что исправить первым, что вторым. Через два месяца закрыли три крупных контракта, которые раньше сливались на этапе переговоров.',
  highlight: '47% потерь → 3 контракта за 2 месяца',
  initial: 'Д',
  color: '#4338DF',
}

const testimonials: Testimonial[] = [
  {
    name: 'Анна К.',
    role: 'салон красоты',
    city: 'Краснодар',
    text: 'На этапе Цалово нужно было описать свою ЦА по 7 характеристикам. Я смогла назвать только 3. Стало понятно, почему реклама работала вхолостую.',
    highlight: '3 из 7 → пересобрала таргетинг',
    initial: 'А',
    color: '#A977FA',
  },
  {
    name: 'Марина Т.',
    role: 'консалтинг',
    city: 'Петербург',
    text: 'Финишировала на 40 км/ч из 120. Неприятно, но конкретно. Три точки роста из шести оказались слабыми. Работаю по дорожной карте.',
    highlight: '40 → 90 км/ч',
    initial: 'М',
    color: '#6838CE',
  },
  {
    name: 'Наталья Г.',
    role: 'цветочный бизнес',
    city: 'Сочи',
    text: 'Из 6 этапов 4 оказались слабыми. Зато получила чёткий план. Первым делом проработала "зачем", потом пересобрала предложение для корпоративных клиентов.',
    highlight: 'x3 за 3 месяца',
    initial: 'Н',
    color: '#FF8C00',
  },
  {
    name: 'Елена М.',
    role: 'онлайн школа',
    city: 'Екатеринбург',
    text: 'На Зачемграде не смогла за 3 минуты сформулировать, зачем мой курс нужен клиенту. Переписала оффер, конверсия выросла.',
    highlight: 'Конверсия +40%',
    initial: 'Е',
    color: '#4338DF',
  },
  {
    name: 'Сергей В.',
    role: 'производство мебели',
    city: 'Ростов',
    text: 'Играли командой из 5 человек. Выборг показал, что мы делали ставку на разовые акции. Перестроили подход, результат почувствовали сразу.',
    highlight: 'Системный подход вместо акций',
    initial: 'С',
    color: '#A977FA',
  },
  {
    name: 'Игорь К.',
    role: 'автосервис',
    city: 'Воронеж',
    text: 'Играли втроём. Каждый видел маркетинг по-своему. После заезда впервые договорились, кто наш клиент и чем мы отличаемся.',
    highlight: 'Команда на одной волне',
    initial: 'И',
    color: '#6838CE',
  },
]

const stats = [
  { icon: Users, value: '286', label: 'участников' },
  { icon: Target, value: '92%', label: 'нашли слабые точки' },
  { icon: Clock, value: '90', label: 'минут на диагностику' },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-5 sm:py-32 relative overflow-hidden">
      {/* Decorative orb */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15"
        style={{ background: 'radial-gradient(circle, #B8ACFF, transparent 70%)' }}
      />

      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <h2
                className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem] leading-[1.15] mb-2"
                style={{ color: '#2A168F' }}
              >
                Что говорят участники
              </h2>
              <p className="text-[15px]" style={{ color: '#8B7BAE' }}>
                Реальные результаты после заезда
              </p>
            </div>

            {/* Stat badges */}
            <div className="flex flex-wrap gap-3">
              {stats.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.label}
                    className="inline-flex items-center gap-2.5 rounded-2xl px-4 py-2.5"
                    style={{ background: '#2A168F' }}
                  >
                    <Icon size={16} style={{ color: '#FFD700' }} />
                    <span className="text-sm font-bold text-white">{s.value}</span>
                    <span className="text-xs text-white/50">{s.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Layout: Featured + masonry */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Featured testimonial - LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 rounded-2xl p-7 flex flex-col"
            style={{ background: '#2A168F' }}
          >
            <Quote size={32} style={{ color: 'rgba(255,255,255,0.15)' }} className="mb-4" />
            <p className="text-sm leading-[1.8] text-white/80 flex-1 mb-5">
              {featured.text}
            </p>
            {featured.highlight && (
              <div
                className="rounded-xl px-4 py-2.5 mb-5 inline-block"
                style={{ background: 'rgba(255,140,0,0.15)', border: '1px solid rgba(255,140,0,0.3)' }}
              >
                <span className="text-sm font-bold" style={{ color: '#FF8C00' }}>{featured.highlight}</span>
              </div>
            )}
            <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ background: featured.color }}
              >
                {featured.initial}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{featured.name}</p>
                <p className="text-xs text-white/40">{featured.role}, {featured.city}</p>
              </div>
            </div>
          </motion.div>

          {/* Masonry grid - RIGHT */}
          <div className="lg:col-span-3 columns-1 sm:columns-2 gap-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="rounded-2xl bg-white p-5 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(104,56,206,0.08)] hover:-translate-y-0.5"
                style={{ border: '1px solid rgba(169,119,250,0.1)' }}
              >
                <p className="text-sm leading-[1.7] mb-4" style={{ color: '#3D2B6B' }}>
                  {t.text}
                </p>
                {t.highlight && (
                  <div
                    className="rounded-lg px-3 py-1.5 mb-4 inline-block"
                    style={{ background: 'rgba(104,56,206,0.06)', border: '1px solid rgba(104,56,206,0.1)' }}
                  >
                    <span className="text-xs font-bold" style={{ color: '#6838CE' }}>{t.highlight}</span>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: t.color }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#2A168F' }}>{t.name}</p>
                    <p className="text-[11px]" style={{ color: '#A977FA' }}>{t.role}, {t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
