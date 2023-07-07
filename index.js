const express = require("express");
const app = express();
const fs = require("fs");

//express
app.set("View engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
