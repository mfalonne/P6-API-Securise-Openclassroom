
/*********contient toute les routes***********/
const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//nous créons un routeur Express
const router = express.Router();

const sauceCtrl = require('../controllers/sauce')


/**les requettes qui arrivent sur cette route post, ont dans le corp de la requette
 * toutes les informations pour le nouveau thing qui va etre ajouter à notre base de donnée
 */
router.post('/', auth, multer,sauceCtrl.createSauce);

// creation de la route get afin qu'elle renvoie tout les things
router.get('/', auth,sauceCtrl.getAllSauce)
// creation de la route get afin qu'elle renvoie une sauce en particulier
router.get('/:id', auth,sauceCtrl.getOneSauce)

// creation de la route pour mettre à jour la sauce
router.put('/:id', auth, multer,sauceCtrl.modifySauce )

// creation de la route pour supprimer un thing
router.delete('/:id', auth,sauceCtrl.deleteSauce )

//route pour le like et dislike
router.post("/:id/like", auth, sauceCtrl.likeSauce);


module.exports = router;