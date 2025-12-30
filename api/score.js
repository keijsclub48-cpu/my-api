// api/score.js
export default async function handler(req, res) {
  // 1. CORS設定を最初に行う
  const allowed = ["https://app.voca-nical.com", "http://localhost:5173"];
  const origin = req.headers.origin;
  if (allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") return res.status(200).end();

  // 2. ログを出力（Vercelのダッシュボードで見れます）
  console.log("API called with method:", req.method);

  // 3. ダミーデータを即座に返す（デバッグ用）
  return res.status(200).json({
    pitch: 440,
    stability: 0.93,
    score: 85,
    message: "解析に成功しました（ダミー）"
  });
}