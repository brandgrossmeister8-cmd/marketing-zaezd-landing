import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

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

function FAQAccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(169,119,250,0.06)' }} className="last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left bg-transparent border-none cursor-pointer group"
      >
        <span className="text-[13px] font-semibold pr-4 transition-opacity duration-300 group-hover:opacity-60 sm:text-sm" style={{ color: '#2A168F' }}>
          {item.question}
        </span>
        <ChevronDown
          size={15}
          className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: '#B8ACFF' }}
          strokeWidth={2}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-[13px] leading-relaxed pr-8" style={{ color: '#8B7BAE' }}>{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-16 px-4 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl font-bold sm:text-3xl lg:text-[2.5rem] mb-12 leading-tight"
          style={{ color: '#2A168F' }}
        >
          Частые вопросы
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="rounded-2xl bg-white px-5 sm:px-6"
          style={{ border: '1px solid rgba(169,119,250,0.06)', boxShadow: '0 4px 24px rgba(104,56,206,0.03)' }}
        >
          {faqs.map((faq, i) => (
            <FAQAccordionItem
              key={i}
              item={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
