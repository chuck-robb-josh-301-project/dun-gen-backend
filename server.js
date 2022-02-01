'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');

const Hero = require('./model/hero');


mongoose.connect(process.env.DB_URL)

// mongoose connection validation
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected')
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const verifyUser = require('./auth.js');



app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/', (request, response) => {

  response.send('Servers Up 🐉')

})

app.get('/heros', handleGetHeros);


async function handleGetHeros(req, res) {
  let queryObject = {};

  if (req.query.origin) {
    queryObject = {
      origin: req.query.origin
    }

  }

  try {
    // return all results with an empty object, or enter object with location to get all cats for that location 
    let herosFromDb = await Hero.find(queryObject);
    if (herosFromDb.length > 0) {
      res.status(200).send(herosFromDb);
    } else {
      res.status(404).send('No heros found...☹️');
    }
  } catch(err){
    res.status(500).send('Server Error...😩');
  }
}

// app.get('/user', handelGetUser);

// verifyUser(req, async (err, user) => {
//   if (err) {
//     console.error(err);
//     res.send('invalid token');
//   } else {
//     // insert try catch logic here.  BE CAREFUL.  check syntax IMMEDIATELY
//     try {
//       //return all the results with empty object or get heros from the same user email
//       let herosFromDb = await Hero.find({ email: user.email });

//       if (herosFromDb.length > 0) {
//         res.status(200).send(herosFromDb);
//       } else {
//         res.status(404).send('No heros found...☹️');
//       }
//     } catch (err) {
//       res.status(500).send('Server Error...😩');
//     }
//   }
// });

function handleGetUser(req, res) {
  verifyUser(req, (err, user) => {
    if (err) {
      console.log(err);
      res.send('invalid token');
    } else {
      res.send(user);
    }
  });
}



app.listen(PORT, () => console.log(`Listening on ${PORT}`));
