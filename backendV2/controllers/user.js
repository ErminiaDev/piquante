const User = require('../models/user');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

//pour enregistrer des nouveaux utilisateurs
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10) //10 tours d'algorithmes de hachage suffisent, sinon trop long
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//pour connecter les utilisateurs existants
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              //clé secrète pour l'encodage (en production: chaîne de caractères longue et aléatoire!)
              'RANDOM_TOKEN_SECRET',
              //chaque token durera 24 h
              { expiresIn: '24h' }
            )
          });
        })
        //si problème de connexion à mongodb
        .catch(error => res.status(500).json({ error }));
    })
    //si problème de connexion à mongodb
    .catch(error => res.status(500).json({ error }));
};