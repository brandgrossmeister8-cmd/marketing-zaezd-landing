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
      'Интерактивная бизнес-игра по технологии системного продвижения Ии Имшинецкой. За 90 минут вы проходите 6 этапов диагностики маркетинга и получаете персональную карту роста с конкретными цифрами.',
  },
  {
    question: 'Как рассчитывается скорость?',
    answer:
      'На каждом из 6 этапов ведущий оценивает ваши решения. За сильное решение +10 км/ч, за слабое -10 км/ч. Стартовая скорость 60 км/ч, максимальная 120 км/ч. Чем выше скорость на финише, тем эффективнее ваш маркетинг.',
  },
  {
    question: 'Что означает итоговая скорость?',
    answer:
      'Итоговая скорость отражает состояние вашего маркетинга и вашего бизнеса на сегодняшний момент. 0 км/ч: маркетинг отсутствует. 30 км/ч: единичные элементы. 60 км/ч: базовый уровень. 90 км/ч: хорошая система. 120 км/ч: маркетинг на максимуме.',
  },
  {
    question: 'Что такое калькулятор упущенной выгоды?',
    answer:
      'Инструмент, который показывает, сколько денег вы теряете из-за слабых точек в маркетинге. Работает по мультипликативной модели: каждая слабая точка ослабляет бизнес каскадно.',
  },
  {
    question: 'Сколько человек может играть одновременно?',
    answer:
      'До 6 игроков. Формат: онлайн в Zoom под руководством ведущего.',
  },
  {
    question: 'Сколько длится игра?',
    answer: 'Около 90 минут на саму игру и разбор результатов.',
  },
  {
    question: 'Сколько стоит участие в игре?',
    answer: '3000 рублей.',
  },
  {
    question: 'Что я получу после игры?',
    answer:
      'Персональную дорожную карту с рекомендациями по каждому этапу, калькулятор упущенной выгоды с вашими цифрами, итоговый рейтинг скорости.',
  },
  {
    question: 'Сколько раз можно играть в игру?',
    answer:
      'Для оценки и понимания состояния маркетинга в компании достаточно одного раза.',
  },
  {
    question: 'Можно ли играть командой из одной компании?',
    answer:
      'Да, можно. Это помогает настроить команду на совместную работу и единое понимание, что надо сделать для повышения эффективности работы маркетинга.',
  },
  {
    question: 'Где сохраняются данные по игре?',
    answer:
      'Нигде, данные стираются, как только игра закончена. Вы не сможете запросить данные или продолжить игру после ее завершения.',
  },
  {
    question: 'Могу ли я получить дополнительные знания?',
    answer:
      'Да, 2 раза в год у нас проходит интенсив по системному продвижению, где мы учим, что и как надо делать, чтобы маркетинг был эффективным.',
  },
  {
    question: 'Как часто вы проводите игры?',
    answer:
      'О датах проведения игр мы сообщаем заранее. Подписывайтесь на нашего бота и будьте в курсе.',
  },
  {
    question: 'Если группа уже набрана, как записаться на другое время и не упустить возможность поиграть?',
    answer:
      'В боте можно записаться в лист ожидания, и мы сообщим вам о новых сроках в первую очередь.',
  },
  {
    question: 'Почему могут играть только 6 человек?',
    answer:
      'Игра предполагает индивидуальную работу с каждым участником. По нашему опыту 6 человек это оптимальное количество, чтобы уделить всем внимание и детально проработать все вопросы.',
  },
  {
    question: 'Кто проводит игру?',
    answer:
      'Консультанты по системному продвижению по технологии Ии Имшинецкой.',
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
