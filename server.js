'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const axios = require('axios');

// mongoose.connect(process.env.DB_URL)

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const verifyUser = require('./auth.js');


// app.get('/user', handelGetUser);

// verifyUser(req, async (err, user) => {
//   if (err) {
//     console.error(err);
//     res.send('invalid token');
//   } else {
//     // insert try catch logic here.  BE CAREFUL.  check syntax IMMEDIATELY
//     try {
//       //return all the results with empty object or get books from the same user email
//       let herosFromDb = await Hero.find({ email: user.email });

//       if (herosFromDb.length > 0) {
//         res.status(200).send(herosFromDb);
//       } else {
//         res.status(404).send('No books found...☹️');
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

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/', (request, response) => {

  response.send('Servers Up 🐉')

})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
