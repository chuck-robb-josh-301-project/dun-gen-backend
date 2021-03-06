'use strict';

// jwt 
const jwt = require('jsonwebtoken');

// jwks 
const jwksClient = require('jwks-rsa');

// the jwks uri come Auth0 account page -> advanced settings -> Endpoints -> 0auth -> JSON Web Key Set
const client = jwksClient({
  jwksUri: process.env.JWKS_URI
});

// I need a getKey function from jsonwebtoken to make things work
// from:  https://www.npmjs.com/package/jsonwebtoken - search for "auth0"
function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

//Verifying the user
function verifyUser(req, errFirstOrUserCallbackFunction){
  try {
    const token = req.headers.authorization.split(' ')[1];
    // from the jsonwebtoken docs:
    jwt.verify(token, getKey, {}, errFirstOrUserCallbackFunction);
  } catch(error){
    errFirstOrUserCallbackFunction('not authorized');
  }
}

module.exports = verifyUser;
