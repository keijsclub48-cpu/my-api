export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers['authorization'] || '';
  if (authHeader !== 'Bearer YOUR_API_KEY') return res.status(401).json({ error: 'Unauthorized' });

  const { audio } = req.body;
  if (!audio) return res.status(400).json({ error: 'Audio data required' });

  // --- 簡易解析サンプル（CREPEモック） ---
  const score = Math.floor(Math.random() * 101);
  const stability = (Math.random() * 1).toFixed(2);
  const mean = (50 + Math.random() * 50).toFixed(1);
  const distribution = Array.from({ length: 5 }, () => Math.floor(Math.random() * 101));

  res.status(200).json({ score, stability, mean, distribution });
}
