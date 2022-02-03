'use strict';

const mongoose = require('mongoose');
const { Schema }  = mongoose;

const heroSchema = new Schema({
  name: String,
  race: String,
  class: String,
  villageName: String,
  inventory: Object,
  background: String,
  progress: Number,
  health: Number,
  email: String
});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;
