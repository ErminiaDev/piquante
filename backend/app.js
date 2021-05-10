const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');


//mongodb authentication
const dbURI = 'mongodb+srv://ErminiaG:HhPnwft6x12PtYSpomH@cluster0.e3hpo.mongodb.net/piquante?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connection to MongoDB Atlas successful!'))
  .catch(() => console.log('Connection to MongoDB refused...'));

const app = express();

//CROSS ORIGIN RESOURCE SHARING
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//using body parser
app.use(bodyParser.json());

app.use('/api', sauceRoutes)
app.use('/api/auth', userRoutes)


app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
});

module.exports = app;
