// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

 // create the express app
const PORT = process.env.PORT || 8081; // client is running on 8080
const app = express()

// make the app use dependencies
//app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

//Connect to database
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGODB_URI);

//Routes
const horse = require('./routes/api/horse');
app.use('/api/horse', horse);

// const customer = require('./routes/api/customer');
// app.use('/api/customer', customer);

// Start the server
app.listen(PORT || 8081, () => {
  console.log(`Server is running on port ${PORT}`);
});
