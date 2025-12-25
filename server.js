const express = require('express');
const bodyParser = require('body-parser');
const scoreHandler = require('./api/score').default;

const app = express();
app.use(bodyParser.json());

// CORS対応
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.post('/score', (req, res) => scoreHandler(req, res));

app.listen(3000, () => console.log('APIローカルサーバー起動: http://localhost:3000'));
