'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

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

// Section for CRUD
app.get('/heros', handleGetHeros);
app.post('/heros', handlePostHeros);
app.delete('/heros/:id', handleDeleteHeros);
app.put('/heros/:id', handlePutHeros);
app.get('/user', handleGetUser);



//READ Section

//Get function without verifyUser
// async function handleGetHeros(req, res) {
//   let queryObject = {};

//   if (req.query.origin) {
//     queryObject = {
//       origin: req.query.origin
//     }

//   }

//   try {
//     // return all results with an empty object, or enter object with location to get all cats for that location 
//     let herosFromDb = await Hero.find(queryObject);
//     if (herosFromDb.length > 0) {
//       res.status(200).send(herosFromDb);
//     } else {
//       res.status(404).send('No heros found...☹️');
//     }
//   } catch(err){
//     res.status(500).send('Server Error...😩');
//   }
// }



async function handleGetHeros(req, res) {
  // let queryObject = {};

  // if (req.query.email) {
  //   queryObject = {
  //     email: req.query.email
  //   };
  // }

  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('invalid token');
    } else {
      try {
        let herosFromDb = await Hero.find({ email: user.email });

        if (herosFromDb.length > 0) {
          res.status(200).send(herosFromDb);
        } else {
          res.status(404).send('No heros found...☹️');
        }
      } catch (err) {
        res.status(500).send('Server Error...😩');
      }
    }
  });
}


//CREATE SECTION
async function handlePostHeros(req, res) {
  console.log(req.body);
  try {
    const herosCreated = await Hero.create(req.body);
    console.log('Handle Get Posts Created a Hero');
    res.status(201).send(herosCreated);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something\'s wrong with the server!😭');
  }
}

// DELETE Section

// This handleDeleteHeros function has verifyUser feature
async function handleDeleteHeros(req, res) {

    verifyUser(req, async (err, user) => {
      if (err) {
        console.error(err);
        res.send('invalid token');
      } else {
        let id = req.params.id;
        try {
          const hero = await Hero.findOne({ _id: id, email: user.email });
          if (!hero) {
            res.status(400).send('Unable to update hero 😰');
          } else {
            await Hero.findByIdAndDelete(id);
            res.status(200).send('cant delete');
          }
        } catch (err) {
          res.status(404).send(`Unable to delete ${id} 😨`);
        }
      }
    });
  }


// async function handleDeleteHeros(req, res){
//   let id = req.params.id;
//   try {
//     await Hero.findByIdAndDelete(id);
//     res.status(204).send('Hero deleted');
//   } catch(err){
//     res.status(404).send(`Unable to delete ${id}`)
//   }
// } 

//Update Section
async function handlePutHeros(req, res) {
  let id = req.params.id;
  // let email = req.query.email;
  try {
    const hero = await Hero.findOne({ _id: id });
    if (!hero) {
      res.status(400).send('unable to update hero');
    } else {
      let updatedHero = await Hero.findByIdAndUpdate(id, req.body, { new: true, overwrite: true });
      res.status(200).send(updatedHero);
    }
  } catch (err) {
    res.status(404).send(`unable to delete ${id}`);
  }
}


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
