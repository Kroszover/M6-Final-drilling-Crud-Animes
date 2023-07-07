const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  const data = fs.readFileSync("./data/anime.json", "utf8");
  const animes = JSON.parse(data);

  res.render("index", { animes });
});
