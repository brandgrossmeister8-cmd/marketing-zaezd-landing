import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

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
      className="group"
      style={{ borderBottom: '1px solid rgba(169,119,250,0.08)' }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left bg-transparent border-none cursor-pointer gap-4"
      >
        <span
          className="text-[15px] font-semibold leading-snug transition-colors duration-300"
          style={{ color: isOpen ? '#4338DF' : '#2A168F' }}
        >
          {item.question}
        </span>
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-300"
          style={{
            background: isOpen ? 'rgba(67,56,223,0.08)' : 'rgba(169,119,250,0.06)',
            color: isOpen ? '#4338DF' : '#B8ACFF',
          }}
        >
          {isOpen ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
        </div>
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
            <p className="pb-5 text-sm leading-[1.7] pr-12" style={{ color: '#8B7BAE' }}>
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
    <section id="faq" className="py-24 px-5 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: '#A977FA' }}
          >
            FAQ
          </p>
          <h2
            className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem] leading-[1.15]"
            style={{ color: '#2A168F' }}
          >
            Частые вопросы
          </h2>
        </motion.div>

        <div
          className="rounded-2xl bg-white px-6 sm:px-8"
          style={{
            border: '1px solid rgba(169,119,250,0.08)',
            boxShadow: '0 4px 32px rgba(104,56,206,0.04)',
          }}
        >
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
    </section>
  )
}
