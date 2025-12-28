export default function handler(req, res) {
  const origin = req.headers.origin;

  const allowed = [
    "https://app.voca-nical.com",
    "http://localhost:5173",
  ];

  if (allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (process.env.API_KEY) {
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${process.env.API_KEY}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { meta, data } = req.body;
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ error: "data array is required" });
  }

  const target = meta?.target_pitch || 440;
  const filtered = data.filter(d => d.conf > 0.8 && d.f0 > 0);

  if (filtered.length < 10) {
    return res.status(400).json({ error: "Not enough valid frames" });
  }

  const cents = filtered.map(d => 1200 * Math.log2(d.f0 / target));
  const mean = cents.reduce((a,b)=>a+b,0) / cents.length;
  const sigma = Math.sqrt(cents.reduce((s,x)=>s+(x-mean)**2,0) / cents.length);

  const score = Math.exp(-sigma / 10) * 100;

  res.json({
    pitch_stability: Number(score.toFixed(1)),
    sigma_cents: Number(sigma.toFixed(2)),
    frames_used: filtered.length
  });
}
