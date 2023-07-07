const express = require("express");
const router = express.Router();
const fs = require("fs");

//Página principal
router.get("/", (req, res) => {
  const data = fs.readFileSync("./data/anime.json", "utf8");
  const animes = JSON.parse(data);

  res.render("index", { animes });
});

//Ruta y función para listar por ID:
router.get("/:id", (req, res) => {
  const id = req.params.id;

  // Leer los datos del archivo anime.json
  const data = fs.readFileSync("./data/anime.json");
  const animes = JSON.parse(data);

  // Buscar el anime por su id
  const anime = animes[id];

  if (anime) {
    res.json(anime);
  } else {
    res.status(404).json({ error: "No encontramos tu anime :(" });
  }
});

//Ruta y función para buscar animes por nombre:
router.get("/buscar/:nombre", (req, res) => {
  const nombre = req.params.nombre.toLowerCase();

  const data = fs.readFileSync("./data/anime.json", "utf8");
  const animes = JSON.parse(data);

  const anime = Object.values(animes).find(
    (anime) => anime.nombre.toLowerCase() === nombre
  ); //Comparamos el parametro nombre con el nombre de cada anime en el JSON
  if (anime) {
    res.json(anime);
  } else {
    res.status(404).json({ error: "No encontramos tu anime" });
  }
});

module.exports = router;
