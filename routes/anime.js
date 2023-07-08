const e = require("express");
const express = require("express");
const router = express.Router();
const fs = require("fs");

//Página principal
router.get("/", (req, res) => {
  const data = fs.readFileSync("./data/anime.json", "utf8");
  const animes = JSON.parse(data);

  res.render("index", { animes });
});

//CRUD

// Ruta y función para crear un nuevo anime
router.post("/crear", (req, res) => {
  const nuevoAnime = req.body;

  const data = fs.readFileSync("./data/anime.json", "utf8");
  const animes = JSON.parse(data);

  const nuevoId = Object.keys(animes).length + 1;

  animes[nuevoId] = nuevoAnime;

  fs.writeFileSync("./data/anime.json", JSON.stringify(animes));

  res.json({
    success: true,
    anime: animes[nuevoId],
    message: "Anime creado con éxito",
  });
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

// Ruta y función para actualizar un anime
router.put("/actualizar/:id", (req, res) => {
  const id = req.params.id;
  const animeActualizado = req.body;

  const data = fs.readFileSync("./data/anime.json", "utf8");
  const animes = JSON.parse(data);

  if (animes.hasOwnProperty(id)) {
    animes[id] = { ...animes[id], ...animeActualizado };
    fs.writeFileSync("./data/anime.json", JSON.stringify(animes));

    res.json({
      success: true,
      anime: animes[id],
      message: "Anime actualizado",
    });
  } else {
    res.status(404).json({ error: "No encontramos tu anime" });
  }
});

module.exports = router;
