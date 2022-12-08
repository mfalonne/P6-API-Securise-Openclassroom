
// on importe mongoose
const mongoose = require('mongoose');

// permet d'eviter les erreurs lisible
const uniqueValidator = require('mongoose-unique-validator');

/*la valeur unique , avec l'élément mongoose-unique-validator passé comme plug-in, 
s'assurera que deux utilisateurs ne puissent partager la même adresse e-mail.*/
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// on passe le validator à notre schema

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);