import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { HelpCircle, ChevronRight, Zap, Target, TrendingUp, Shield } from 'lucide-react'
import confetti from 'canvas-confetti'

interface QuizOption {
  text: string
  points: number
}

interface QuizQuestion {
  question: string
  icon: typeof HelpCircle
  options: QuizOption[]
}

const questions: QuizQuestion[] = [
  {
    question: 'Вы можете объяснить за 10 секунд, чем ваш продукт отличается от конкурентов?',
    icon: Target,
    options: [
      { text: 'Легко — у нас чёткое УТП', points: 1 },
      { text: 'В целом да, но формулировка «плавает»', points: 2 },
      { text: 'Честно — пока нет', points: 3 },
    ],
  },
  {
    question: 'Откуда приходят ваши клиенты?',
    icon: TrendingUp,
    options: [
      { text: 'Есть система: знаю каналы, считаю стоимость лида', points: 1 },
      { text: 'В основном сарафан и немного рекламы', points: 2 },
      { text: 'Не отслеживаю — приходят и хорошо', points: 3 },
    ],
  },
  {
    question: 'Сколько денег вы теряете на неработающем продвижении?',
    icon: Shield,
    options: [
      { text: 'Считаю ROI — потери минимальны', points: 1 },
      { text: 'Подозреваю, что немало, но точно не знаю', points: 2 },
      { text: 'Даже боюсь считать', points: 3 },
    ],
  },
  {
    question: 'Есть ли у вас пошаговый план продвижения на ближайшие 3 месяца?',
    icon: Zap,
    options: [
      { text: 'Да, расписан и работает', points: 1 },
      { text: 'Есть наброски, но без системы', points: 2 },
      { text: 'Действую по ситуации', points: 3 },
    ],
  },
]

interface ResultData {
  title: string
  description: string
  color: string
  emoji: string
}

function getResult(score: number): ResultData {
  if (score <= 5) {
    return {
      title: 'У вас сильная база',
      description: 'Но даже опытные маркетологи находят в заезде слепые зоны. Игра покажет, где вы теряете скрытые 10–15%.',
      color: '#A977FA',
      emoji: '💎',
    }
  }
  if (score <= 8) {
    return {
      title: 'Есть потенциал для роста',
      description: 'Вы на верном пути, но система продвижения пока с пробелами. Заезд покажет конкретные точки, где вы теряете деньги.',
      color: '#FFD700',
      emoji: '🚀',
    }
  }
  return {
    title: 'Заезд — то, что вам нужно',
    description: 'Без системы вы теряете до 40% бюджета впустую. За 90 минут вы получите чёткий план — бесплатно.',
    color: '#FF8C00',
    emoji: '🔥',
  }
}

export default function QuizSection() {
  const [step, setStep] = useState(0) // 0..3 = questions, 4 = result
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const isResult = step >= questions.length
  const progress = Math.min(step, questions.length) / questions.length

  const handleSelect = (points: number, optionIdx: number) => {
    if (selectedOption !== null) return
    setSelectedOption(optionIdx)

    setTimeout(() => {
      setScore(prev => prev + points)
      setSelectedOption(null)
      const nextStep = step + 1
      setStep(nextStep)
      if (nextStep >= questions.length) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#4338DF', '#FFD700', '#A977FA', '#FF8C00'] })
      }
    }, 400)
  }

  const result = getResult(score)
  const currentQ = questions[step]

  return (
    <section
      ref={sectionRef}
      id="quiz"
      className="py-24 px-5 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #1E0F6E 0%, #160B52 50%, #130842 100%)' }}
    >
      {/* Ambient */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[140px] opacity-[0.06]"
        style={{ background: '#A977FA', top: '20%', right: '10%' }}
      />

      <div className="mx-auto max-w-2xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ background: 'rgba(255,215,0,0.1)' }}
          >
            <HelpCircle size={14} style={{ color: '#FFD700' }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#FFD700' }}>
              Мини-тест
            </span>
          </motion.div>

          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] leading-[1.15] mb-3">
            А мне точно надо участвовать?
          </h2>
          <p className="text-base text-white/70">
            Узнай прямо сейчас
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="relative h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{ background: 'linear-gradient(90deg, #4338DF, #A977FA)' }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[11px] text-white/50">
            <span>{isResult ? 'Готово' : `${step + 1} из ${questions.length}`}</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
        </div>

        {/* Card area */}
        <div className="min-h-[320px] sm:min-h-[300px]">
          <AnimatePresence mode="wait">
            {!isResult ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl p-6 sm:p-8"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
              >
                {/* Question */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(104,56,206,0.2)' }}>
                    <currentQ.icon size={18} style={{ color: '#A977FA' }} />
                  </div>
                  <p className="text-lg font-semibold text-white leading-snug pt-1.5">
                    {currentQ.question}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx
                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleSelect(opt.points, idx)}
                        whileHover={selectedOption === null ? { x: 4 } : {}}
                        whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                        className="w-full text-left rounded-xl px-5 py-4 flex items-center gap-3 cursor-pointer border-none transition-all duration-300"
                        style={{
                          background: isSelected ? 'rgba(169,119,250,0.15)' : 'rgba(255,255,255,0.03)',
                          border: isSelected ? '1px solid rgba(169,119,250,0.3)' : '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                          style={{
                            background: isSelected ? '#A977FA' : 'rgba(255,255,255,0.08)',
                            color: isSelected ? 'white' : 'rgba(255,255,255,0.7)',
                          }}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className={`text-sm ${isSelected ? 'text-white' : 'text-white/80'}`}>
                          {opt.text}
                        </span>
                        <ChevronRight
                          size={16}
                          className="ml-auto shrink-0 transition-opacity duration-200"
                          style={{ color: '#A977FA', opacity: isSelected ? 1 : 0 }}
                        />
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl p-6 sm:p-8 text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
              >
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="text-5xl mb-4"
                >
                  {result.emoji}
                </motion.p>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {result.title}
                </h3>

                <p className="text-sm text-white/75 mb-6 max-w-md mx-auto leading-relaxed">
                  {result.description}
                </p>

                <a
                  href="#schedule"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold no-underline transition-all duration-300 hover:shadow-lg hover:shadow-[#FF8C00]/30 hover:brightness-105"
                  style={{ background: '#FF8C00', color: 'white' }}
                >
                  Записаться на заезд
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
