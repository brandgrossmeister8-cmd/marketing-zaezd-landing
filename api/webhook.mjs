import https from 'https';

const PROJECT = 'marketing-race-game';
const DB_PATH = `/v1/projects/${PROJECT}/databases/(default)/documents`;

function encodePath(p) {
  return p.replace(/\(/g, '%28').replace(/\)/g, '%29');
}

function firestoreRequest(method, docPath, body) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: 'firestore.googleapis.com',
      path: encodePath(DB_PATH + docPath),
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    const r = https.request(opts, (response) => {
      const chunks = [];
      response.on('data', (c) => chunks.push(c));
      response.on('end', () => {
        const raw = Buffer.concat(chunks).toString();
        try { resolve({ code: response.statusCode, body: JSON.parse(raw) }); }
        catch { resolve({ code: response.statusCode, body: raw }); }
      });
    });
    r.on('error', reject);
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
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
