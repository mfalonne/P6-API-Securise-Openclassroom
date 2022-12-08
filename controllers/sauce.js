/*******contient toutes les fonctions*******/

//on importe notre model sauces
const Sauce = require('../models/sauce');

const fs = require('fs');

//création of a sauce by user
exports.createSauce = (req, res, next) => {
    // on parse l'objet requette
  const sauceObject = JSON.parse(req.body.sauce);
  /*on supprime le champ id de cet objet car il est generer automatiquement et le champ userId
  qui conrespond au user qui a cree la sauce*/
  delete sauceObject._id;
  delete sauceObject._userId;
  //on cree notre objet sauce
  const sauce = new Sauce({
      ...sauceObject,
      likes: 0,
      dislikes: 0,
      usersDisliked: [],
      usersLiked: [],
      /*userId: req.auth.userId,*/
      //on genère l'url de l'image avec les proprieté de l'objet req
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  // on enregistre notre objet sauce à l'aide de la fonction save()
  sauce.save()
  // il nous retourne un code 201 pour la reussite et le message
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  // ou une erreur en cas d'echec
  .catch(error => { res.status(400).json( { error })})
};

// User is updating a sauce he created
exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      const sauceObject = req.file
        ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : { ...req.body };
      Sauce.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
        .catch((error) => res.status(400).json({ error }));
    });
  });
};

//User is deleting one of his sauces
exports.deleteSauce = (req, res, next) => {
    //on recupère l'objet en BD
  Sauce.findOne({ _id: req.params.id})
      .then(sauce => {
        //si le userId recupéré en BD est different de celle qui vient dans le token
          if (sauce.userId != req.auth.userId){
            //message d'erreur
              res.status(401).json({message: 'Not authorized'});
              //sinon
          } else {
            //on recupère le nom du fichier grace à un split autour de notre repertoire images
              const filename = sauce.imageUrl.split('/images/')[1];
              // on supprime notre fichier du système fichier
              fs.unlink(`images/${filename}`, () => {
                //on supprime notre enregistrement dans la base de donnée
                Sauce.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};
//User is getting one of his sauces
exports.getOneSauce = (req, res, next) => {
    //on trouve la sauce unique ayant le meme id que le parametre de la requette
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      // si rien n'est trouvé on envoie une erreur 404 au frontend
      .catch(error => res.status(404).json({ error }));
  };

// User is getting ALL sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    // on renvoie une reponse de code 200 et le tableau things
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  };

//User is liking / disliking a sauce
exports.likeSauce = (req, res, next) => {
    // on recupère l'id dans le parametre de la requette
    const sauceId = req.params.id;
    //on recupère l'userId de celui qui a cree la sauce
    const userId = req.body.userId;
    // on recupère le like dans le body de la requette
    const like = req.body.like;
    // 1. user likes a sauce for the first time (like === 1)
    // pushing the userId to usersLiked array; incrementing likes
    //s'i y a un like
    if (like === 1) {
        //on met à jour la sauce
      Sauce.updateOne(
        //onprend id de la sauce
        { _id: sauceId },
        {
            // on increment le like
          $inc: { likes: like },
          //on push l'userID Dans le tableau usersLiked
          $push: { usersLiked: userId },
        }
      )
        .then((sauce) => res.status(200).json({ message: "Sauce appréciée" }))
        .catch((error) => res.status(500).json({ error }));
    }
    // 2. user DISlikes a sauce for the first time (like === -1)
    // pushing the userId to usersLiked array; one less like.
    // sinon s'il y a pas un like
    else if (like === -1) {
      Sauce.updateOne(
        //on ajoute le sauceId dans le champ id
        { _id: sauceId },
        {
            // on enlève un like
          $inc: { dislikes: -1 * like },
          //on push l'userID Dans le tableau usersLiked
          $push: { usersDisliked: userId },
        }
      )
        .then((sauce) => res.status(200).json({ message: "Sauce dépréciée" }))
        .catch((error) => res.status(500).json({ error }));
    }
    // 3. User changes his mind
    // 3.1. user is taking back his like :
    //sinon
    else {
        //on filtre l'id de la sauce
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
            //on verifie si l'userId est dans le tableau usersLiked de l'objet sauce
          if (sauce.usersLiked.includes(userId)) {
            // on met à jour la sauce
            Sauce.updateOne(
              { _id: sauceId },
              //l'utilisateur annule le like
              { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
            )
              .then((sauce) => {
                res.status(200).json({ message: "Sauce dépréciée" });
              })
              .catch((error) => res.status(500).json({ error }));
            // 3.2 user is changing his mind on his dislike
            //on verifie si l'userId est dans le tableau usersLiked de l'objet sauce
          } else if (sauce.usersDisliked.includes(userId)) {
            // on met à jour la sauce
            Sauce.updateOne(
              { _id: sauceId },
              {
                $pull: { usersDisliked: userId },
                $inc: { dislikes: -1 },
              }
            )
              .then((sauce) => {
                res.status(200).json({ message: "Sauce appréciée" });
              })
              .catch((error) => res.status(500).json({ error }));
          }
        })
        .catch((error) => res.status(401).json({ error }));
    }
  };