const express = require('express');

//body-parser
const bodyParser = require('body-parser');

//MongoDB object modeling tool
const mongoose = require('mongoose');

//import des routeurs dans l'application
const userRoutes = require('./routes/user');

const Sauce = require('./models/sauce');

//mongodb authentification
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

//middleware body-parser
app.use(bodyParser.json());

//enregistrement des routes/requests
app.post('/api/sauces/', (req, res, next) => {
  const sauce = new Sauce({
    ...req.body,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré!'}))
    .catch(error => res.status(400).json({ error }));
});

app.use('/api/sauces/', (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
});
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