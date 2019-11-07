const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let horseSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Horse name is a required field']
  },
  type: {
    type: String,
    enum: ['mare','stallion']
  },
  ueln: {
    type: String
  },
  date_of_birth: {
    type: Date,
    max: [Date.now, "Date of birth can't be in the future"]
  },
  studbook_number: {
    type: String
  },
  father: {
    type: String
  },
  mother: {
    type: String
  },
  grandfather: {
    type: String
  },
  coat_color: {
    type: String,
    enum: ['vos','zwart','bruin']
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Horse', horseSchema);
