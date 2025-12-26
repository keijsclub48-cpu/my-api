import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import scoreHandler from "./api/score.js";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://app.voca-nical.com",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// APIキー認証
app.use("/api", (req, res, next) => {
  if (!process.env.API_KEY) return next();
  const auth = req.headers.authorization;
  if (auth !== `Bearer ${process.env.API_KEY}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

app.post("/api/score", scoreHandler);

app.listen(3000, () => {
  console.log("API起動 http://localhost:3000/api/score");
});
