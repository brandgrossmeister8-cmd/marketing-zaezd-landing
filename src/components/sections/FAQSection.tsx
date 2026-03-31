import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  { question: 'Что такое "Маркетинговый заезд"?', answer: 'Интерактивный бизнес-заезд по технологии системного продвижения Ии Имшинецкой. За 90 минут вы проходите 6 этапов диагностики маркетинга и получаете персональную карту роста с конкретными цифрами.' },
  { question: 'Как рассчитывается скорость?', answer: 'На каждом из 6 этапов ведущий оценивает ваши решения. За сильное решение +10 км/ч, за слабое −10 км/ч. Стартовая скорость 60 км/ч, максимальная 120 км/ч.' },
  { question: 'Что означает итоговая скорость?', answer: '0 км/ч — маркетинг отсутствует. 30 — единичные элементы. 60 — базовый уровень. 90 — хорошая система. 120 — маркетинг на максимуме.' },
  { question: 'Что такое калькулятор упущенной выгоды?', answer: 'Инструмент, который показывает, сколько денег вы теряете из-за слабых точек. Каждая слабая точка ослабляет бизнес каскадно.' },
  { question: 'Сколько человек участвует?', answer: 'До 6 участников. Онлайн в Zoom под руководством ведущего.' },
  { question: 'Сколько длится заезд?', answer: '90 минут — заезд и разбор результатов.' },
  { question: 'Что я получу после?', answer: 'Персональную дорожную карту, калькулятор упущенной выгоды с вашими цифрами, итоговый рейтинг скорости.' },
  { question: 'Сколько стоит?', answer: 'На время обкатки трассы участие безоплатное.' },
  { question: 'Кто может участвовать?', answer: 'Владельцы бизнеса или самозанятые.' },
]

function FAQAccordionItem({ item, isOpen, onToggle, index }: { item: FAQItem; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="mb-3"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 rounded-xl px-5 py-4 text-left bg-transparent border cursor-pointer transition-all duration-300"
        style={{
          background: isOpen ? 'rgba(67,56,223,0.06)' : 'white',
          border: isOpen ? '1px solid rgba(67,56,223,0.15)' : '1px solid rgba(169,119,250,0.1)',
        }}
      >
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ background: '#6838CE' }}
        >
          {index + 1}
        </span>
        <span
          className="text-[15px] font-semibold leading-snug flex-1 transition-colors duration-300"
          style={{ color: isOpen ? '#4338DF' : '#2A168F' }}
        >
          {item.question}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 transition-transform duration-300"
          style={{
            color: isOpen ? '#4338DF' : '#B8ACFF',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 pt-3 pb-1 text-sm leading-[1.7] ml-11" style={{ color: '#8B7BAE' }}>
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 px-5 sm:py-32" style={{ background: '#FDFBFF' }}>
      <div className="mx-auto max-w-6xl">
        {/* Two-column layout */}
        <div className="grid gap-10 lg:grid-cols-5">
          {/* LEFT column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: 'rgba(169,119,250,0.1)' }}>
                <HelpCircle size={14} style={{ color: '#6838CE' }} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#6838CE' }}>
                  FAQ
                </span>
              </div>
              <h2
                className="text-3xl font-bold sm:text-4xl leading-[1.15] mb-3"
                style={{ color: '#2A168F' }}
              >
                FAQ
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: '#8B7BAE' }}>
                Ответы на самые частые вопросы о маркетинговом заезде
              </p>
            </motion.div>

            {/* Contact card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="rounded-2xl p-6"
              style={{ background: 'white', border: '1px solid rgba(169,119,250,0.1)', boxShadow: '0 4px 24px rgba(104,56,206,0.04)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ background: '#6838CE' }}
                >
                  <MessageCircle size={18} color="white" />
                </div>
                <p className="text-base font-bold" style={{ color: '#2A168F' }}>
                  Не нашли ответ?
                </p>
              </div>
              <p className="text-sm mb-5" style={{ color: '#8B7BAE' }}>
                Напишите нам в Telegram — ответим лично
              </p>
              <a
                href="https://t.me/brandgros"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white no-underline transition-all duration-300 hover:shadow-lg hover:shadow-[#6838CE]/20 hover:brightness-110"
                style={{ background: '#6838CE' }}
              >
                Написать нам
              </a>
            </motion.div>
          </div>

          {/* RIGHT column - accordion */}
          <div className="lg:col-span-3">
            {faqs.map((faq, i) => (
              <FAQAccordionItem
                key={i}
                item={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
