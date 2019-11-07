const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student = require('./models/students');

mongoose.connect('mongodb://localhost/svg-api');

const app = express();
app.use(bodyParser.json());

app.get('/students', (req, res) => {
  Student.find().then((students) => {
    res.status(200).json({
      status: 'success',
      data: students,
    });
  }).catch((error) => {
    res.status(400).json({
      status: 'error',
      message: error,
    });
  });
});

// app.get('/students/:id', (req, res) => {
  // const user = Number(req.params.id);
  // if (db[user - 1]) {
    // if (user === db[user - 1].id) {
      // res.status(200).json({
        // status: 'success',
        // student: db[user - 1],
      // });
    // }
  // } else {
    // res.status(404).json({
      // status: 'error',
      // message: 'student with such id does not exits',
    // });
  // }
// });

app.use('/*', (req, res) => {
  res.status(400).json({
    status: 'error',
    message: 'resource not found',
  });
});

module.exports = app;
