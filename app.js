'use strict';

// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const authCheck = require('./middleware/auth.js');

// create the express app
const PORT = process.env.PORT || 8081; // client is running on 8080
const app = express();

// make the app use dependencies
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

//Connect to database
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI);

//Use Auth0 authentication on production
if (process.env.NODE_ENV === 'production') {
  app.use('/', authCheck);
}

//Mounting of routes
const swagger = require('./routes/api/swagger');
app.use('/api/docs', swagger);
const horse = require('./routes/api/horse');
app.use('/api/horse', horse);
const icsi = require('./routes/api/icsi');
app.use('/api/icsi', icsi);
const customer = require('./routes/api/customer');
app.use('/api/customer', customer);
const location = require('./routes/api/location');
app.use('/api/location', location);
const search = require('./routes/api/search');
app.use('/api/search', search);
const semen = require('./routes/api/semen');
app.use('/api/semen', semen);
const nitrogenContainer = require('./routes/api/nitrogenContainer');
app.use('/api/nitrogen-container', nitrogenContainer);
const product = require('./routes/api/product');
app.use('/api/product', product);
const stock = require('./routes/api/stock');
app.use('/api/stock', stock);

app.use(express.static('public'));

//Error handling middleware - must be the last among other middleware
app.use((err, req, res, _) => {
  console.log('Something went wrong: ', err);
  return res.status(err.statusCode || 500).json(err);
});

// Start the server
app.listen(PORT || 8081, () => {
  console.log(`Server is running on port ${ PORT }`);
});
