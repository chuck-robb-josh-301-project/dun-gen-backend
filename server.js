'use strict';



const verifyUser = require('./auth.js');

app.get('/user', handelGetUser);

verifyUser(req, async (err, user) => {
  if (err) {
    console.error(err);
    res.send('invalid token');
  } else {
    // insert try catch logic here.  BE CAREFUL.  check syntax IMMEDIATELY
    try {
      //return all the results with empty object or get books from the same user email
      let herosFromDb = await Hero.find({ email: user.email });

      if (herosFromDb.length > 0) {
        res.status(200).send(herosFromDb);
      } else {
        res.status(404).send('No books found...☹️');
      }
    } catch (err) {
      res.status(500).send('Server Error...😩');
    }
  }
});

function handelGetUser(req, res) {
  verifyUser(req, (err, user) => {
    if (err) {
      console.log(err);
      res.send('invalid token');
    } else {
      res.send(user);
    }
  });
}
