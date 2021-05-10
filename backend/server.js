const http = require('http');
const app = require('./app');

//returning a valid port number, be it a string or a number
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

//normalizing port and setting it
// set port to whatever is in the variable PORT, or 3000 if it is undefined
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//handling system errors
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
      //permission denied
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    //attempt to bind a server to an address already used
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//creating server
const server = http.createServer(app);

//what the server has to do on error
server.on('error', errorHandler);
//event listener to write where the server is executing in the console
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//listen on defined port for created server
server.listen(port);
