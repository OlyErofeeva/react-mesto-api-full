const mongoose = require('mongoose');
const urlRegex = require('../utils/regex');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, 'link is required'],
    match: [urlRegex, 'invalid url format'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
