const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student = require('./models/students');

mongoose.connect('mongodb://localhost/svg-api');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
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

app.get('/student/:id', (req, res) => {
  Student.findOne({
    _id: req.params.id,
  }).then((student) => {
    res.status(200).json({
      status: 'successful',
      data: student,
    });
  }).catch((error) => {
    res.status(400).json({
      status: 'error',
      message: error,
    });
  });
});

app.post('/students', (req, res) => {
  const student = new Student(req.body);

  student.save().then(() => {
    res.status(200).json({
      status: 'success',
      message: 'new student added to the database',
    }).catch((error) => {
      res.status(400).json({
        status: 'error',
        message: error,
      });
    });
  });
});

app.put('/student/:id', (req, res) => {
  const updateStudent = new Student({
    _id: req.params.id,
    name: req.body.name,
    reg_no: req.body.reg_no,
    age: req.body.age,
  });

  Student.updateOne({ _id: req.params.id }, updateStudent).then(() => {
    res.status(200).json({
      status: 'success',
      message: 'user details updated',
    });
  }).catch((error) => {
    res.status(400).json({
      status: 'error',
      message: error,
    });
  });
});

app.delete('/student/:id', (req, res) => {
  Student.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      status: 'success',
      message: 'student successfully deleted',
    });
  }).catch((error) => {
    res.status(400).json({
      status: 'error',
      message: error,
    });
  });
});

app.use('/*', (req, res) => {
  res.status(400).json({
    status: 'error',
    message: 'resource not found',
  });
});

module.exports = app;
