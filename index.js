// Importar los módulos necesarios
const express = require("express");
const fs = require("fs");

// Crear una instancia de la aplicación Express
const app = express();

// Configurar el motor de plantillas HBS
app.set("view engine", "hbs");

// Configurar la carpeta de archivos estáticos
app.use(express.static("public"));

// Configurar el puerto en el que se ejecutará el servidor
const port = 8080;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
