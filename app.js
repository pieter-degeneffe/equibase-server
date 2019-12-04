'use strict';

// import dependencies
const express = require('express');
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const bodyParser = require('body-parser');
const cors = require('cors');
//const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

// Set up Auth0 configuration
const authConfig = require("./auth_config.json");
if (!authConfig.domain || !authConfig.audience) {
  throw "Please make sure that auth_config.json is in place and populated";
}

 // create the express app
const PORT = process.env.PORT || 8081; // client is running on 8080
const app = express();

// make the app use dependencies
//app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Middleware that validates incoming bearer tokens using JWKS from equibase.eu.auth0.com
const authCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

//Connect to database
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI);

//app.use('/', authCheck);

//Mounting of routes
const horse = require('./routes/api/horse');
app.use('/api/horse', horse);
const customer = require('./routes/api/customer');
app.use('/api/customer', customer);

// Start the server
app.listen(PORT || 8081, () => {
  console.log(`Server is running on port ${PORT}`);
});
