const multer = require("multer");
//middleware multer pour la gestion des images
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
const storage = multer.diskStorage({
  // la fonction qui dit à multer où stocké les fichier
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // explique à multer quel nom de fichier utiliser
  filename: (req, file, callback) => {
    // on cree le nom du fichier. avec split on enleve les espace et on join le _
    const name = file.originalname.split(' ').join('_');
    // on cree l'extension du fichier
    const extension = MIME_TYPES[file.mimetype];
    // il nous retourne le nom,la date.extension
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');