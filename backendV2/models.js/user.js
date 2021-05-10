const mongoose = require('mongoose');
//pour plus facilement résoudre les erreurs générées par défaut par mongodb, on installe un paquet qui pré-valide les informations
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);