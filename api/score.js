// api/score.js
export default async function handler(req, res) {
  // CORS 設定
  const allowed = [
    "https://app.voca-nical.com",
    "http://localhost:5173",
  ];
  const origin = req.headers.origin;
  if (allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") return res.status(200).end();

  // 認証チェック
  if (process.env.API_KEY) {
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${process.env.API_KEY}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // body パース（Vercel 本番対応）
  let body = req.body;
  if (!body || !body.audio) {
    try {
      // raw データを読み込む
      const raw = await new Promise((resolve) => {
        let data = "";
        req.on("data", chunk => (data += chunk));
        req.on("end", () => resolve(data));
      });
      body = JSON.parse(raw || "{}");
    } catch (e) {
      console.error("JSON parse error:", e);
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }

  const audio = body.audio;
  if (!audio) return res.status(400).json({ error: "audio is required" });

  // ⚡ ここで解析処理を実装予定
  // とりあえずダミーデータ返却
  res.status(200).json({
    pitch: 440,
    stability: 0.93,
    score: 85,
  });
}
