const express = require('express');

//pour créer une application express
const app = express();

//exporter cette application pour y accéder depuis les autres fichiers notamment le serveur
module.exports = app;