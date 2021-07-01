const express = require('express');

//mise en place de plusieurs HTTP headers qui vont sécuriser l'appli
const helmet = require("helmet");

//empêche les attaques type bruteforce
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

//body-parser
const bodyParser = require('body-parser');

//MongoDB object modeling tool
const mongoose = require('mongoose');

//pour accéder au path de notre serveur
const path = require('path');

//initiating dotenv and making environment variables available throughout the app
require('dotenv').config()

//import des routeurs dans l'application
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const sauce = require('./models/sauce');

//mongodb authentification
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const dbURI = `mongodb+srv://${user}:${password}@${cluster}`;
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connection to MongoDB Atlas successful!'))
  .catch(() => console.log('Connection to MongoDB refused...'));

//pour créer une application express
const app = express();
app.use(helmet());
app.use("/api/", apiLimiter);

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//middleware body-parser (deprecated)
app.use(bodyParser.json());
//app.use(express.urlencoded({extended: true}));
//app.use(express.json()); // To parse the incoming requests with JSON payloads

//gestionnaire de routage pour les images
//__dirname: le dossier où l'on se trouve
app.use('/images', express.static(path.join(__dirname, 'images')));

//enregistrement des routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

//exporter cette application pour y accéder depuis les autres fichiers notamment le serveur
module.exports = app;