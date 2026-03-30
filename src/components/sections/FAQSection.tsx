import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Что такое "Маркетинговый заезд"?',
    answer:
      'Интерактивный бизнес-заезд по технологии системного продвижения Ии Имшинецкой. За 90 минут вы проходите 6 этапов диагностики маркетинга и получаете персональную карту роста с конкретными цифрами.',
  },
  {
    question: 'Как рассчитывается скорость в заезде?',
    answer:
      'На каждом из 6 этапов ведущий оценивает ваши решения. За сильное решение +10 км/ч, за слабое -10 км/ч. Стартовая скорость 60 км/ч, максимальная 120 км/ч. Чем выше скорость на финише, тем эффективнее ваш маркетинг.',
  },
  {
    question: 'Что означает итоговая скорость?',
    answer:
      'Итоговая скорость отражает состояние вашего маркетинга и, соответственно, вашего бизнеса на сегодняшний момент. 0 км/ч: маркетинг отсутствует. 30 км/ч: единичные элементы. 60 км/ч: базовый уровень. 90 км/ч: хорошая система. 120 км/ч: маркетинг на максимуме.',
  },
  {
    question: 'Что такое калькулятор упущенной выгоды?',
    answer:
      'Инструмент, который показывает, сколько денег вы теряете из-за слабых точек в маркетинге. Работает по мультипликативной модели: каждая слабая точка ослабляет бизнес каскадно.',
  },
  {
    question: 'Сколько человек может участвовать одновременно?',
    answer:
      'До 6 участников. Формат: онлайн в Zoom под руководством ведущего.',
  },
  {
    question: 'Сколько длится заезд?',
    answer: '90 минут на сам заезд и разбор результатов.',
  },
  {
    question: 'Что я получу после заезда?',
    answer:
      'Персональную дорожную карту с рекомендациями по каждому этапу, калькулятор упущенной выгоды с вашими цифрами, итоговый рейтинг скорости.',
  },
  {
    question: 'Сколько стоит участие?',
    answer:
      'На время обкатки трассы участие безоплатное.',
  },
  {
    question: 'Кто может участвовать?',
    answer:
      'В заезде могут принять участие только владельцы бизнеса или самозанятые.',
  },
  {
    question: 'Кто такая Ия Имшинецкая?',
    answer:
      'Создатель зарегистрированной авторской технологии системного продвижения. Более 700 разработанных и успешно внедренных проектов продвижения по всему миру. На рынке с 1993 года. Автор 17 книг о продвижении и рекламе.',
  },
]

function FAQAccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="last:border-b-0" style={{ borderBottom: '1px solid rgba(169,119,250,0.3)' }}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left bg-transparent border-none cursor-pointer group"
      >
        <span className="text-sm font-semibold pr-4 transition-colors lg:text-base" style={{ color: '#2A168F' }}>
          {item.question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          style={{ color: '#A977FA' }}
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
            <p className="pb-5 text-sm leading-relaxed pr-8" style={{ color: '#6838CE' }}>
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-12 px-4 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-bold lg:text-4xl mb-14"
          style={{ color: '#2A168F' }}
        >
          Частые вопросы
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-2xl bg-white px-4 sm:px-6"
          style={{ border: '1px solid #A977FA' }}
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
