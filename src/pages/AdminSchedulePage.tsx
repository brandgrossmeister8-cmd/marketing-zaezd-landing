import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, ArrowLeft } from 'lucide-react'
import { collection, doc, setDoc, deleteDoc, updateDoc, onSnapshot, query } from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { GameSlot } from '@/components/sections/ScheduleSection'

const ADMIN_PASSWORD = '369852147'

export default function AdminSchedulePage() {
  const [authorized, setAuthorized] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [slots, setSlots] = useState<GameSlot[]>([])
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('12:00')
  const [newSpots, setNewSpots] = useState(6)

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
    })
    setNewDate('')
    setNewTime('12:00')
    setNewSpots(6)
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
            return (
              <div key={slot.id} className="flex items-center justify-between rounded-xl bg-white p-4" style={{ border: '1px solid #A977FA' }}>
                <div>
                  <p className="font-bold" style={{ color: '#2A168F' }}>{slot.date}</p>
                  <p className="text-sm" style={{ color: '#6838CE' }}>{slot.time} (МСК)</p>
                  <p className="text-xs mt-1" style={{ color: '#A977FA' }}>
                    Записано: {slot.registeredCount} / Свободно: {spotsLeft}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-xs" style={{ color: '#6838CE' }}>Всего мест:</label>
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
            )
          })}
        </div>
      </div>
    </div>
  )
}
