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

  // 🔴 プリフライト
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 認証
  if (process.env.API_KEY) {
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${process.env.API_KEY}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!req.body?.audio) {
    return res.status(400).json({ error: "Audio is required" });
  }

  // サンプルレスポンス
  res.json({
    pitch: 440,
    stability: 0.93,
    score: 85,
  });
}
