// on importe le package http de node
const http = require('http');
// on importe notre fichier app.js
const app = require('./app');

/** la fonction normalizePort renvoie le port valise qu'il soit fournit 
 * sous forme d'un numero ou chaine de caractère
*/
const normalizePort = val => {
    // port stocke une valeur à base decimal
  const port = parseInt(val, 10);
    /** si c'est true que la valeur stocké dans port n'est pas un nombre*/ 
  if (isNaN(port)) {
    // retourne la valeur entrée en argument
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
/** port stocke le resultat de la fonction normalizePort
 * soit la variable d'environnement
 * si la plateforme de déploiement propose un port par défaut, 
 * c'est celui-ci qu'on écoutera ;
 * soit le port 3000 (port par defaut)
*/
const port = normalizePort(process.env.PORT || '3000');

// on ajoute (indique) le port sur lequel l'app express doit tourner
app.set('port', port);

/**la fonction errorHandler recherche les différentes erreurs 
 * et les gère de manière appropriée. 
 * Elle est ensuite enregistrée dans le serveur ; */
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
/** la methode createServer nous permet de crée un server
 * il prend en argument la fonction qui sera appelé à chaque 
 * requette http recu par le server*/ 
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});
/** la methode listen permet au serveur d'ecouter les requettes envoyé
 * en argument: le numero de port que l'on veut ecouter*/ 
server.listen(port);
