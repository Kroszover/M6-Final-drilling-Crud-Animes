const express = require("express");
const app = express();
const fs = require("fs");
const animeRoutes = require("./routes/anime");

// Configuración de Express
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Definimos la ruta de anime.js
app.use("/anime", animeRoutes);

const port = 8080;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
