const express = require('express');

//pour créer une application express
const app = express();

app.use((req, res, next) => {
    console.log('Requête reçue');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
})
//fonction qui utilise la requête, la réponse et next, premier middleware
app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue' });
    next();
});

app.use((req, res) => {
    console.log('Réponse envoyée avec succès');
})

//exporter cette application pour y accéder depuis les autres fichiers notamment le serveur
module.exports = app;