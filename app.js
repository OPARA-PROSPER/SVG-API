const express    = require('express');
const bodyParser = require('body-parser');
const db = require('./db').default;

const app = express();

app.use('/', (req, res, next) => {
  res.status(200).json(db);
})


module.exports = app;