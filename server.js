const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const scoreHandler = require('./api/score').default;

const app = express();
app.use(bodyParser.json());

// CORS（ローカルのみ想定。本番では不要）
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// 🔐 APIキー認証ミドルウェア
app.use('/api', (req, res, next) => {
  const auth = req.headers.authorization;
  if (!process.env.API_KEY) {
    console.warn('⚠ API_KEY 未設定（開発モード）');
    return next();
  }
  if (auth !== `Bearer ${process.env.API_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// パスを /api/score に統一
app.post('/api/score', (req, res) => scoreHandler(req, res));

app.listen(3000, () => {
  console.log('APIローカルサーバー起動: http://localhost:3000');
  console.log('POST http://localhost:3000/api/score');
});
