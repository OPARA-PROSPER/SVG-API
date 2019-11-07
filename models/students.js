const mongoose = require('mongoose');

const studentsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  reg_no: {
    type: String,
    require: true,
  },
  age: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Student', studentsSchema);
