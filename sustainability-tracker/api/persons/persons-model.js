const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  department: {
    type: String
  },
  co2: {
    type: Number,
  },
  ecocoins: {
    type: Number
  }
});

const Person = mongoose.model('person', personSchema);
module.exports = { Person };

