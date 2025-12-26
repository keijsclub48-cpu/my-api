export default function scoreHandler(req, res) {
  if (!req.body.audio) {
    return res.status(400).json({ error: "audio is required" });
  }

  // 本来はここで解析
  return res.json({
    pitch: 440,
    stability: 0.93,
    message: "OK",
  });
}
