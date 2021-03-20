const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

const port = '3000';

const mongoose = require('mongoose');

const dbname = 'project-database';
const password = 'dMJWkZEenT3tmjjH';
const username = 'mongodb'
const uri = `mongodb+srv://${username}:${password}@cluster0.hkrmp.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('base de datos conectada'))
  .catch(e => console.log(e))

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));

app.use('/', require('./router/web'));
app.use('/users', require('./router/user'));

app.use((req, res, next) => {
  res.status(400).render("404", {
    title: "404 ERROR",
    subtitle: "not found"
  });
})

app.listen(port, () => {
  console.log('servidor escuchando en ', port)
})