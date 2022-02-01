'use strict';

const mongoose = require('mongoose');
const { Schema }  = mongoose;

const heroSchema = new Schema({
  name: String,
  origin: String,
  inventory: Array,
  background: String,
  progress: Number
});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;
