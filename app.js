// on importe expess 
const express = require('express');

// on importe mongoose : est un package qui facilite les interactions avec notre base de données MongoDB
const mongoose = require('mongoose');

// on importe la route user
const userRoutes = require('./routes/user');


// on importe la route sauce
const sauceRoutes = require('./routes/sauce');

//pour les images
const path = require('path');

// on crée express
const app = express();
require("dotenv").config()
/**Ces headers permettent :
 * d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
 * d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
 * d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
 */
 app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//connexion de l'app à MongoDB
mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


/*****Reponse de l'app vers le server: creation des middleware****/

/**Express prend toutes les requêtes qui ont comme Content-Type  application/json  
 * et met à disposition leur  body  directement sur l'objet req */
app.use(express.json());

//on enregistre la route sauce 
app.use('/api/sauces', sauceRoutes);

//on enregistre la route user
app.use('/api/auth', userRoutes);

//on enregistre la route pour les images
app.use('/images', express.static(path.join(__dirname, 'images')));


// on exporte express pour pouvoir l'ecouter depuis d'autres fichier*/
module.exports = app;