const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ownerSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'First name is required'],
    maxlength: [64, 'Max length is 64 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid first name'],
    index: true
  },
  last_name: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Last name is required'],
    maxlength: [64, 'Max length is 64 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid last name'],
    index: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address  is required'],
    maxlength: [64, 'Max length is 64 characters'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    index: true
  },
  telephone: {
    type: String,
    trim: true,
    maxlength: [16, 'Max length is 16 characters'],
    lowercase: true
  },
  role: {
    type: String,
    enum: ['vos','zwart','bruin']
  }
}, {timestamps: true});
module.exports = mongoose.model('Horse', horseSchema);
