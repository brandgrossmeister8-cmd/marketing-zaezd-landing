import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, ArrowLeft, Copy, Check } from 'lucide-react'
import { collection, doc, setDoc, deleteDoc, updateDoc, onSnapshot, query } from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { GameSlot } from '@/components/sections/ScheduleSection'

const ADMIN_PASSWORD = '369852147'
const WEBHOOK_BASE = 'https://marketing-zaezd-landing.vercel.app/api/webhook'

export default function AdminSchedulePage() {
  const [authorized, setAuthorized] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [slots, setSlots] = useState<GameSlot[]>([])
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('12:00')
  const [newSpots, setNewSpots] = useState(6)
  const [newConsultant, setNewConsultant] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const getWebhookUrl = (slotId: string, action: 'register' | 'cancel') =>
    `${WEBHOOK_BASE}?slot=${encodeURIComponent(slotId)}&action=${action}`

  const formatDateRu = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T00:00:00')
      return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' })
    } catch { return dateStr }
  }

  useEffect(() => {
    if (!authorized) return
    const q = query(collection(db, 'gameSlots'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: GameSlot[] = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
      })) as GameSlot[]
      data.sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
      setSlots(data)
    })
    return () => unsubscribe()
  }, [authorized])

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthorized(true)
      setError('')
    } else {
      setError('Неверный пароль')
      setTimeout(() => setError(''), 3000)
    }
  }

  const addSlot = async () => {
    if (!newDate) return
    const slotId = `slot-${newDate}-${newTime.replace(':', '')}`
    await setDoc(doc(db, 'gameSlots', slotId), {
      date: newDate,
      time: newTime,
      totalSpots: newSpots,
      registeredCount: 0,
      consultant: newConsultant.trim(),
    })
    setNewDate('')
    setNewTime('12:00')
    setNewSpots(6)
    setNewConsultant('')
  }

  const updateConsultant = async (id: string, consultant: string) => {
    await updateDoc(doc(db, 'gameSlots', id), { consultant })
  }

  const updateRegisteredCount = async (id: string, count: number) => {
    await updateDoc(doc(db, 'gameSlots', id), { registeredCount: count })
  }

  const updateSlotDate = async (id: string, date: string) => {
    await updateDoc(doc(db, 'gameSlots', id), { date })
  }

  const updateSlotTime = async (id: string, time: string) => {
    await updateDoc(doc(db, 'gameSlots', id), { time })
  }

  const removeSlot = async (id: string) => {
    await deleteDoc(doc(db, 'gameSlots', id))
  }

  const updateTotalSpots = async (id: string, totalSpots: number) => {
    await updateDoc(doc(db, 'gameSlots', id), { totalSpots })
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#2A168F' }}>
        <div className="w-full max-w-sm rounded-2xl p-8 space-y-4" style={{ background: '#1E0F6E', border: '1px solid rgba(255,255,255,0.2)' }}>
          <p className="text-center text-white text-sm">Панель управления расписанием</p>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Пароль"
            className="w-full p-3 rounded-lg text-white text-center outline-none"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
            autoFocus
          />
          {error && <p className="text-red-300 text-sm text-center">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg font-bold text-white cursor-pointer border-none"
            style={{ background: '#6838CE' }}
          >
            Войти
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: '#FAF5FF' }}>
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: '#2A168F' }}>Расписание игр</h1>
          <Link to="/" className="text-sm flex items-center gap-1" style={{ color: '#6838CE' }}>
            <ArrowLeft size={16} /> На сайт
          </Link>
        </div>

        {/* Добавление */}
        <div className="rounded-2xl bg-white p-6 space-y-4" style={{ border: '1px solid #A977FA' }}>
          <p className="font-bold" style={{ color: '#2A168F' }}>Добавить игру</p>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs block mb-1" style={{ color: '#6838CE' }}>Дата</label>
              <input
                type="date"
                value={newDate}
                onChange={e => setNewDate(e.target.value)}
                className="w-full p-2 rounded-lg outline-none"
                style={{ border: '1px solid #A977FA', color: '#2A168F' }}
              />
            </div>
            <div>
              <label className="text-xs block mb-1" style={{ color: '#6838CE' }}>Время</label>
              <input
                type="time"
                value={newTime}
                onChange={e => setNewTime(e.target.value)}
                className="w-full p-2 rounded-lg outline-none"
                style={{ border: '1px solid #A977FA', color: '#2A168F' }}
              />
            </div>
            <div>
              <label className="text-xs block mb-1" style={{ color: '#6838CE' }}>Мест</label>
              <input
                type="number"
                min={1}
                max={6}
                value={newSpots}
                onChange={e => setNewSpots(Number(e.target.value))}
                className="w-full p-2 rounded-lg outline-none"
                style={{ border: '1px solid #A977FA', color: '#2A168F' }}
              />
            </div>
          </div>
          <div>
            <label className="text-xs block mb-1" style={{ color: '#6838CE' }}>Консультант (имя и фамилия)</label>
            <input
              value={newConsultant}
              onChange={e => setNewConsultant(e.target.value)}
              placeholder="Например: Анна Иванова"
              className="w-full p-2 rounded-lg outline-none"
              style={{ border: '1px solid #A977FA', color: '#2A168F' }}
            />
          </div>
          <button
            onClick={addSlot}
            disabled={!newDate}
            className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-white cursor-pointer border-none disabled:opacity-40"
            style={{ background: '#6838CE' }}
          >
            <Plus size={16} /> Добавить
          </button>
        </div>

        {/* Список */}
        <div className="space-y-3">
          {slots.length === 0 && (
            <p className="text-center py-8" style={{ color: '#A977FA' }}>Нет запланированных игр</p>
          )}
          {slots.map(slot => {
            const spotsLeft = slot.totalSpots - slot.registeredCount
            const regUrl = getWebhookUrl(slot.id, 'register')
            const cancelUrl = getWebhookUrl(slot.id, 'cancel')
            return (
              <div key={slot.id} className="rounded-xl bg-white p-4 space-y-3" style={{ border: '1px solid #A977FA' }}>
                {/* Верхняя строка: дата, время, места, удалить */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        key={`date-${slot.id}-${slot.date}`}
                        defaultValue={slot.date}
                        onChange={e => { if (e.target.value) updateSlotDate(slot.id, e.target.value) }}
                        className="p-1 rounded text-sm font-bold outline-none"
                        style={{ border: '1px solid #A977FA', color: '#2A168F' }}
                      />
                      <input
                        type="time"
                        key={`time-${slot.id}-${slot.time}`}
                        defaultValue={slot.time}
                        onChange={e => { if (e.target.value) updateSlotTime(slot.id, e.target.value) }}
                        className="p-1 rounded text-sm outline-none w-24"
                        style={{ border: '1px solid #A977FA', color: '#6838CE' }}
                      />
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1">
                        <label className="text-xs" style={{ color: '#6838CE' }}>Занято:</label>
                        <input
                          type="number"
                          min={0}
                          max={slot.totalSpots}
                          value={slot.registeredCount}
                          onChange={e => updateRegisteredCount(slot.id, Math.min(Number(e.target.value), slot.totalSpots))}
                          className="w-12 p-1 rounded text-center outline-none text-xs"
                          style={{ border: '1px solid #A977FA', color: '#2A168F' }}
                        />
                      </div>
                      <span className="text-xs" style={{ color: '#A977FA' }}>Свободно: {spotsLeft}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <label className="text-xs" style={{ color: '#6838CE' }}>Консультант:</label>
                      <input
                        value={slot.consultant || ''}
                        onChange={e => updateConsultant(slot.id, e.target.value)}
                        placeholder="Имя Фамилия"
                        className="p-1 rounded text-xs outline-none"
                        style={{ border: '1px solid #A977FA', color: '#2A168F', width: '160px' }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <label className="text-xs" style={{ color: '#6838CE' }}>Мест:</label>
                      <input
                        type="number"
                        min={slot.registeredCount}
                        max={20}
                        value={slot.totalSpots}
                        onChange={e => updateTotalSpots(slot.id, Number(e.target.value))}
                        className="w-14 p-1 rounded text-center outline-none"
                        style={{ border: '1px solid #A977FA', color: '#2A168F' }}
                      />
                    </div>
                    <button
                      onClick={() => removeSlot(slot.id)}
                      className="p-2 rounded-lg cursor-pointer border-none hover:opacity-70 transition-opacity"
                      style={{ background: '#FAF5FF', color: '#6838CE' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Вебхук-ссылки */}
                <div className="space-y-2 pt-2" style={{ borderTop: '1px solid rgba(169,119,250,0.2)' }}>
                  {/* Регистрация */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold shrink-0" style={{ color: '#16a34a' }}>📝 Регистрация:</span>
                    <code className="text-xs truncate flex-1 px-2 py-1 rounded" style={{ background: '#FAF5FF', color: '#6838CE' }}>{regUrl}</code>
                    <button
                      onClick={() => copyToClipboard(regUrl, `reg-${slot.id}`)}
                      className="p-1.5 rounded cursor-pointer border-none hover:opacity-70 transition-opacity shrink-0"
                      style={{ background: '#FAF5FF', color: '#6838CE' }}
                      title="Скопировать"
                    >
                      {copied === `reg-${slot.id}` ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* Отписка */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold shrink-0" style={{ color: '#dc2626' }}>🚫 Отписка:</span>
                    <code className="text-xs truncate flex-1 px-2 py-1 rounded" style={{ background: '#FAF5FF', color: '#6838CE' }}>{cancelUrl}</code>
                    <button
                      onClick={() => copyToClipboard(cancelUrl, `cancel-${slot.id}`)}
                      className="p-1.5 rounded cursor-pointer border-none hover:opacity-70 transition-opacity shrink-0"
                      style={{ background: '#FAF5FF', color: '#6838CE' }}
                      title="Скопировать"
                    >
                      {copied === `cancel-${slot.id}` ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
