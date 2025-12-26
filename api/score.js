export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers['authorization'] || '';
  const expected = `Bearer ${process.env.API_KEY || 'dev-secret-key-123'}`;

  if (authHeader !== expected) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { audio } = req.body || {};
  if (!audio) return res.status(400).json({ error: 'Audio data required' });

  const score = Math.floor(Math.random() * 101);
  const stability = Number(Math.random().toFixed(2));
  const mean = Number((50 + Math.random() * 50).toFixed(1));
  const distribution = Array.from({ length: 5 }, () => Math.floor(Math.random() * 101));

  return res.status(200).json({ score, stability, mean, distribution });
}
