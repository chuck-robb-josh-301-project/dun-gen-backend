'use strict';

const mongoose = require('mongoose');
const { Schema }  = mongoose;

const heroSchema = new Schema({
  name: String,
  origin: String,
  inventory: Object,
  background: String,
  progress: Number,
  email: String
});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;
