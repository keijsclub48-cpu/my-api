import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));

// CORS 設定
const allowedOrigins = [
  "http://localhost:5175",        // Vite dev
  "https://scan.voca-nical.com",   // 本番フロント
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") return res.status(200).end();
  next();
});

// ダミー API
app.post("/api/score", (req, res) => {
  const auth = req.headers.authorization;
  if (process.env.API_KEY && auth !== `Bearer ${process.env.API_KEY}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!req.body?.audio) return res.status(400).json({ error: "audio is required" });

  // ダミー返却
  res.json({
    pitch: 440,
    stability: 0.95,
    score: 80
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
