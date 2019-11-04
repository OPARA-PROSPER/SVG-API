const express    = require('express');
const bodyParser = require('body-parser');
const db = require('./db').default;

const app = express();

app.use('/svg/students', (req, res, next) => {
  res.status(200).json(db);
})

app.use('/*', (req, res, next) => {
  res.status(400).json({
    error: 'resource not found'
  });
})

module.exports = app;