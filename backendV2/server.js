//importer le package http natif de Node
const http = require('http');

//importer l'application
const app = require('./app');

//sur quel port va tourner l'application
app.set('port', process.env.PORT || 3000);

//appeler app qui est une fonction qui sera exécutée via le serveur
const server = http.createServer(app);

server.listen(process.env.PORT || 3000); //par défaut en développement, sauf si pas dispo -> process.env.PORT
