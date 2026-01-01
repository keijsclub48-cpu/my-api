// api/score.js

export default async function handler(req, res) {
  // const allowed = ["https://app.voca-nical.com", "http://localhost:5173"];
  const allowed = ["https://scan.voca-nical.com", "http://localhost:5173"];
  const origin = req.headers.origin;

  if (allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") return res.status(200).end();

  console.log("API called", {
    method: req.method,
    origin,
    auth: req.headers.authorization,
    hasAudio: !!req.body?.audio,
  });

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // 🔐 Authorization チェック
  const auth = req.headers.authorization;
  if (!process.env.API_KEY) {
    console.warn("API_KEY is not set on server");
  } else if (auth !== `Bearer ${process.env.API_KEY}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // 🎙 audio 必須チェック
  if (!req.body || !req.body.audio) {
    return res.status(400).json({ error: "audio is required" });
  }

  // 🔧 本来ここで解析処理（今回はまだダミー）
  const dummyResult = {
    pitch: 440,
    stability: 0.93,
    score: 85,
  };

  return res.status(200).json({
    ...dummyResult,
    message: "解析成功（サーバー処理）",
  });
}
