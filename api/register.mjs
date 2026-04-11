const PROJECT = 'marketing-race-game'
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN || ''
const TG_CHAT_ID = process.env.TG_CHAT_ID || ''

async function firestoreRequest(method, docPath, body) {
  const url = FIRESTORE_BASE + docPath
  const opts = { method, headers: { 'Content-Type': 'application/json' } }
  if (body) opts.body = JSON.stringify(body)
  const r = await fetch(url, opts)
  const data = await r.json().catch(() => null)
  return { code: r.status, body: data }
}

async function sendTelegramMessage(text) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) return
  try {
    await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text, parse_mode: 'HTML' }),
    })
  } catch {}
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const { slotId, name, phone, comment } = req.body || {}
  if (!slotId || !name) return res.status(400).json({ error: 'slotId and name required' })

  try {
    const isPredzapis = slotId === 'predzapis'
    let slotDate = '—'
    let slotTime = ''
    let next = 0
    let tot = 0

    if (!isPredzapis) {
      const get = await firestoreRequest('GET', `/gameSlots/${slotId}`)
      if (get.code !== 200) return res.status(404).json({ error: 'Slot not found' })

      const f = get.body.fields
      const reg = parseInt(f.registeredCount.integerValue, 10)
      tot = parseInt(f.totalSpots.integerValue, 10)
      slotDate = f.date?.stringValue || '?'
      slotTime = f.time?.stringValue || '?'

      if (reg >= tot) return res.status(409).json({ error: 'Нет свободных мест' })

      next = reg + 1
      await firestoreRequest('PATCH',
        `/gameSlots/${slotId}?updateMask.fieldPaths=registeredCount`,
        { fields: { registeredCount: { integerValue: String(next) } } }
      )
    }

    const regId = `reg-${Date.now()}`
    await firestoreRequest('PATCH', `/registrations/${regId}`, {
      fields: {
        slotId: { stringValue: slotId },
        name: { stringValue: name },
        phone: { stringValue: phone || '' },
        comment: { stringValue: comment || '' },
        date: { stringValue: slotDate },
        time: { stringValue: slotTime },
        createdAt: { stringValue: new Date().toISOString() },
      },
    })

    const tgText = isPredzapis
      ? [
          `<b>Предзапись на игру</b>`,
          ``,
          `<b>Имя:</b> ${name}`,
          phone ? `<b>Контакт:</b> ${phone}` : '',
          comment ? `<b>Бизнес:</b> ${comment}` : '',
        ].filter(Boolean).join('\n')
      : [
          `<b>Новая заявка на игру</b>`,
          ``,
          `<b>Дата:</b> ${slotDate} ${slotTime} МСК`,
          `<b>Имя:</b> ${name}`,
          phone ? `<b>Контакт:</b> ${phone}` : '',
          comment ? `<b>Бизнес:</b> ${comment}` : '',
          ``,
          `Мест осталось: ${tot - next} из ${tot}`,
        ].filter(Boolean).join('\n')

    await sendTelegramMessage(tgText)

    return res.status(200).json({
      ok: true,
      registered: next,
      left: isPredzapis ? 0 : tot - next,
    })
  } catch (e) {
    return res.status(500).json({ error: String(e) })
  }
}
