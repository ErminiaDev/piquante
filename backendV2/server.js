const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Voilà la réponse du serveur');
});

server.listen(process.env.PORT || 3000); //par défaut en développement, sauf si pas dispo -> process.env.PORT
