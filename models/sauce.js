
// on importe mongoose
const mongoose = require('mongoose');

// nous créons un schéma de données qui contient les champs souhaités pour chaque Sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes : { type: Number },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

// La méthode  model  transforme ce modèle en un modèle utilisable.en argument le nom du model et le nom du schema
module.exports = mongoose.model('sauce', sauceSchema);