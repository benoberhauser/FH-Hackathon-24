const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
  nr: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  xDate: {
    type: Date
  },
  category: {
    type: String,
    enum: ['cat1', 'cat2', 'cat3']
  },
  switch: {
    type: Boolean
  }
}, { optimisticConcurrency: true });

const Entity = mongoose.model('entity', entitySchema);
module.exports = { Entity };

