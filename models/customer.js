const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let customerSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'First name is required'],
    maxlength: [128, 'Max length is 128 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid first name'],
    index: true
  },
  last_name: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Last name is required'],
    maxlength: [128, 'Max length is 128 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid last name'],
    index: true
  },
  language: {
    type: String,
    required: [true, 'Language  is required'],
    enum: ['NL','FR', 'EN']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address  is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    index: true
  },
  telephone: {
    type: String,
    trim: true,
    maxlength: [64, 'Max length is 64 characters'],
    lowercase: true
  },
  street: {
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [64, 'Max length is 64 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid street']
  },
  house_number: {
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [16, 'Max length is 16 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid house number']
  },
  zip: {
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [16, 'Max length is 16 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid ZIP code']
  },
  city: {
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [64, 'Max length is 64 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid city']
  },
  country: {
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [64, 'Max length is 64 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid country']
  },
  // horses : [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Horse'
  //   }
  // ]
}, {timestamps: true});

module.exports = mongoose.model('Customer', customerSchema);
