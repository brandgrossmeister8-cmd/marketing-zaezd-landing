import https from 'https'

const PROJECT = 'marketing-race-game'
const DB_PATH = `/v1/projects/${PROJECT}/databases/(default)/documents`

// Telegram Bot API — токен и chat_id задаются в Vercel Environment Variables
const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN || ''
const TG_CHAT_ID = process.env.TG_CHAT_ID || ''

function firestoreRequest(method, docPath, body) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: 'firestore.googleapis.com',
      path: DB_PATH + docPath,
      method,
      headers: { 'Content-Type': 'application/json' },
    }
    const r = https.request(opts, (response) => {
      const chunks = []
      response.on('data', (c) => chunks.push(c))
      response.on('end', () => {
        const raw = Buffer.concat(chunks).toString()
        try { resolve({ code: response.statusCode, body: JSON.parse(raw) }) }
        catch { resolve({ code: response.statusCode, body: raw }) }
      })
    })
    r.on('error', reject)
    if (body) r.write(JSON.stringify(body))
    r.end()
  })
}

function sendTelegramMessage(text) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) return Promise.resolve()
  return new Promise((resolve) => {
    const data = JSON.stringify({ chat_id: TG_CHAT_ID, text, parse_mode: 'HTML' })
    const opts = {
      hostname: 'api.telegram.org',
      path: `/bot${TG_BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) },
    }
    const r = https.request(opts, (res) => {
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve())
    })
    r.on('error', () => resolve())
    r.write(data)
    r.end()
  })
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
    // 1. Получаем слот
    const get = await firestoreRequest('GET', `/gameSlots/${slotId}`)
    if (get.code !== 200) return res.status(404).json({ error: 'Slot not found' })

    const f = get.body.fields
    const reg = parseInt(f.registeredCount.integerValue, 10)
    const tot = parseInt(f.totalSpots.integerValue, 10)
    const slotDate = f.date?.stringValue || '?'
    const slotTime = f.time?.stringValue || '?'

    if (reg >= tot) return res.status(409).json({ error: 'Нет свободных мест' })

    // 2. Увеличиваем счётчик
    const next = reg + 1
    await firestoreRequest('PATCH',
      `/gameSlots/${slotId}?updateMask.fieldPaths=registeredCount`,
      { fields: { registeredCount: { integerValue: String(next) } } }
    )

    // 3. Сохраняем заявку в Firestore
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

    // 4. Уведомление в Telegram
    const tgText = [
      `<b>Новая заявка на игру</b>`,
      ``,
      `<b>Дата:</b> ${slotDate} ${slotTime} МСК`,
      `<b>Имя:</b> ${name}`,
      phone ? `<b>Телефон/контакт:</b> ${phone}` : '',
      comment ? `<b>Комментарий:</b> ${comment}` : '',
      ``,
      `Мест осталось: ${tot - next} из ${tot}`,
    ].filter(Boolean).join('\n')

    await sendTelegramMessage(tgText)

    return res.status(200).json({
      ok: true,
      registered: next,
      left: tot - next,
    })
  } catch (e) {
    return res.status(500).json({ error: String(e) })
  }
}
