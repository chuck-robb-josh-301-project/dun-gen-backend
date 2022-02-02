'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

// import Hero schema
const Hero = require('./model/hero');

async function seed() {

//   // corpse
//   // {
//   // name: String,
//   // origin: String,
//   // inventory: Array,
//   // background: String,
//   // progress: Number
//   // }
  // const josh = new Hero({
  //   name: 'Josh',
  //   origin: 'Seattle',
  //   inventory: [bow, arrow],
  //   background: 'Bog',
  //   progress: 1
  // });

 
  // elf.save(function (err) {
  //   if (err) console.error(err);
  //   else console.log('Josh saved');
  // })


  await Hero.create({
    name: 'Robb',
    origin: 'Mountlake Terrace',
    // inventory: {sword, helmet},
    background: 'Shire',
    progress: 2,
    email: 'jpiff57@gmail.com'
  })
  console.log('Robb saved');

  await Hero.create({
    name: 'Chuck',
    origin: 'Pittsburgh',
    // inventory: {axe, shield},
    background: 'Forest',
    progress: 3,
    email: 'jpiff57@gmail.com'
  })
  console.log('Chuck saved');

  await Hero.create({
    name: 'Josh',
    origin: 'Seattle',
    // inventory: {axe, shield},
    background: 'Bog',
    progress: 1,
    email: 'jpiff57@gmail.com'

  })

  console.log('Josh saved');

  mongoose.disconnect();
}

seed();
