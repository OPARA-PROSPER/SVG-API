const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db').default;

const app = express();
app.use(bodyParser.json());

app.get('/students', (req, res) => {
  res.status(200).json({
    status: 'success',
    students: db,
  });
});

app.get('/students/:id', (req, res) => {
  const user = Number(req.params.id);
  if (db[user - 1]) {
    if (user === db[user - 1].id) {
      res.status(200).json({
        status: 'success',
        student: db[user - 1],
      });
    }
  } else {
    res.status(404).json({
      status: 'error',
      message: 'student with such id does not exits',
    });
  }
});

app.use('/*', (req, res) => {
  res.status(400).json({
    status: 'error',
    message: 'resource not found',
  });
});

module.exports = app;
