const express = require('express');

//body-parser
const bodyParser = require('body-parser');

//MongoDB object modeling tool
const mongoose = require('mongoose');

//import des routeurs dans l'application
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//pour accéder au path de notre serveur
const path = require('path');


//mongodb authentification
//fichier .env , créer des variables
const dbURI = 'mongodb+srv://ErminiaG:HhPnwft6x12PtYSpomH@cluster0.e3hpo.mongodb.net/piquante?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connection to MongoDB Atlas successful!'))
  .catch(() => console.log('Connection to MongoDB refused...'));

//pour créer une application express
const app = express();

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
app.use('/images', express.static(path.join(__dirname, 'images')));

//enregistrement des routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);


app.use((req, res, next) => {
    console.log('Requête reçue');
    next();
});


//fonction qui utilise la requête, la réponse et next, premier middleware
app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue' });
    next();
});


//exporter cette application pour y accéder depuis les autres fichiers notamment le serveur
module.exports = app;