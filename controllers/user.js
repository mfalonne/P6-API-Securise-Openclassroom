//on importe notre model user
const User = require('../models/user');

// package de cryptage pour le mot de passe
const bcrypt = require('bcrypt');

// nous permet de gerer le token
const jwt = require('jsonwebtoken');

/*const validator = require("email-validator");*/


/* fonction d'inscription*/
exports.signup = (req, res, next) => {
    // la fonction pr haché le mdp. on lui passe en argmnt le mdp du corps de la requette
    bcrypt.hash(req.body.password, 10)
    // on recupère le hash du mot de passe et on l'enregistre ds un nvt user
      .then(hash => {
        // on crée ce nvt user
        const user = new User({
        //on lui passe l'email fournit dans le corp de la requette
          email: req.body.email,
        // on recupère le mdp crypté
          password: hash
        });
        // on utilise la methode save pr enregistrer notre user dans la base de donnee
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      // on capte l'erreur et on lui envoie dans l'objet json
      .catch((error) => res.status(500).json({ error }));
    
};
    
// fonction de connexion: verifie si le user existe ds la BD et si le mdp transmit par le client correspond à ce user
exports.login = (req, res, next) => {
    // la methode findone lance la requette pour filtré l'email dans la BD
    User.findOne({ email: req.body.email })
    //on recupère la valeur trouvé par notre requette
        .then(user => {
            // si elle est null: l'utilisateur n'existe pas dans notre BD
            if (!user) {
                // on retourne l'erreur 401
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            // sinon avec la method compare, on compare le mdp qui nous a été transmit avec celle enregisté dans la BD
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // si le mdp est false
                    if (!valid) {
                        // on retourne un message d'erreur
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    /* sinon si le mdp est correct, on retourne un code 200 avec un objet qui contient les infos necessaire à l'athentification
                    des requettes qui serons emise par la suite par notre client*/
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};