const { Router } = require("express");

const demo = Router();
demo.get("/api/demo", (req, res) => {
  res.json({ ok: true });
});

module.exports = demo;
