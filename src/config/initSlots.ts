/**
 * Одноразовый скрипт для создания слотов в Firestore.
 * Запустите в консоли браузера: initGameSlots()
 * Или вызовите из админ-панели.
 */
import { doc, setDoc } from 'firebase/firestore'
import { db } from './firebase'

export async function initGameSlots() {
  const slots = [
    { id: 'slot-2026-04-10-12', date: '2026-04-10', time: '12:00', totalSpots: 6, registeredCount: 0 },
    { id: 'slot-2026-04-10-15', date: '2026-04-10', time: '15:00', totalSpots: 6, registeredCount: 0 },
  ]

  for (const slot of slots) {
    await setDoc(doc(db, 'gameSlots', slot.id), {
      date: slot.date,
      time: slot.time,
      totalSpots: slot.totalSpots,
      registeredCount: slot.registeredCount,
    })
    console.log(`Slot ${slot.id} created`)
  }

  console.log('All slots initialized!')
}

// Экспортируем в window для вызова из консоли
if (typeof window !== 'undefined') {
  ;(window as any).initGameSlots = initGameSlots
}
