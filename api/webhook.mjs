const PROJECT = 'marketing-race-game';
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;

async function firestoreRequest(method, docPath, body) {
  const url = FIRESTORE_BASE + docPath;
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(url, opts);
  const data = await r.json().catch(() => null);
  return { code: r.status, body: data };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const slotId = req.query.slot;
  const action = req.query.action || 'register';

  if (!slotId) return res.status(400).json({ error: 'Missing ?slot=' });

  try {
    const get = await firestoreRequest('GET', `/gameSlots/${slotId}`);
    if (get.code !== 200) return res.status(404).json({ error: 'Not found', slotId });

    const f = get.body.fields;
    const reg = parseInt(f.registeredCount.integerValue, 10);
    const tot = parseInt(f.totalSpots.integerValue, 10);

    let next = reg;
    if (action === 'cancel') { next = Math.max(0, reg - 1); }
    else {
      if (reg >= tot) return res.status(409).json({ error: 'Full', slotId });
      next = reg + 1;
    }

    await firestoreRequest('PATCH',
      `/gameSlots/${slotId}?updateMask.fieldPaths=registeredCount`,
      { fields: { registeredCount: { integerValue: String(next) } } }
    );

    return res.status(200).json({ ok: true, action, slotId, registered: next, left: tot - next });
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
