const mongoose = require('mongoose');

const schoolsSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
    min: 100000,
    max: 999999
  },
  title: {
    type: String,
    required: true
  },
  address: {
    zipCode: {
      type: Number,
      min: 1000,
      max: 9999,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: false
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['AHS', 'BHS', 'MS']
  }
});

const School = mongoose.model('schools', schoolsSchema);

module.exports = { School };

