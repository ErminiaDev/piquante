//importer le package http natif de Node
const http = require('http');

//importer l'application
const app = require('./app');

 
//sur quel port va tourner l'application; la fonction normalizePort() va renvoyer un port valide
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000'); //par défaut en développement, sauf si pas dispo -> process.env.PORT
app.set('port', port);


//la fonction error Handler recherche les différentes erreurs et les gère de manière appropriée
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};


//appeler app qui est une fonction qui sera exécutée via le serveur
const server = http.createServer(app);


//un écouteur d'évènement est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port); 
