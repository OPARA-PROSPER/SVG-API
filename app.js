const express    = require('express');
const bodyParser = require('body-parser');
const db = require('./db').default;

const app = express();

app.use('/svg/students', (req, res, next) => {
  res.status(200).json(db);
})

app.get('/students/:id', (req, res, next) => {
  let user = Number(req.params.id);
  
  if(db[user-1]){
    if(user === db[user-1].id){
      res.status(200).json(db[user - 1]);
    }
  }else{
    res.status(404).json({
      status: "error",
      message: 'student with such id does not exits'
    })
  }
})

app.use('/*', (req, res, next) => {
  res.status(400).json({
    status: 'error', 
    message: 'resource not found'
  });
})

module.exports = app;