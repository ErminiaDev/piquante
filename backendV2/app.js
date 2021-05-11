const express = require('express');

//body-parser

//MongoDB object modeling tool
const mongoose = require('mongoose');

//import des routeurs dans l'application
const userRoutes = require('./routes/user');

//mongodb authentification
const dbURI = 'mongodb+srv://ErminiaG:HhPnwft6x12PtYSpomH@cluster0.e3hpo.mongodb.net/piquante?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connection to MongoDB Atlas successful!'))
  .catch(() => console.log('Connection to MongoDB refused...'));

//pour créer une application express
const app = express();

//CORS

//middleware body-parser

//enregistrement des routeurs
app.use('/api/auth', userRoutes);


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