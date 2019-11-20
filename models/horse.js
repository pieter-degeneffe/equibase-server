const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let horseSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Horse name is a required field'],
    maxlength: [128, 'Max length is 128 characters']
  },
  type: {
    type: String,
    enum: ['mare','stallion'],
    maxlength: [128, 'Max length is 128 characters']
  },
  ueln: {
    type: String,
    maxlength: [15, 'Max length is 15 characters']
  },
  date_of_birth: {
    type: Date,
    max: [Date.now, "Date of birth can't be in the future"]
  },
  studbook_number: {
    type: String
  },
  father: {
    type: String,
    maxlength: [128, 'Max length is 128 characters']
  },
  mother: {
    type: String,
    maxlength: [128, 'Max length is 128 characters']
  },
  grandfather: {
    type: String,
    maxlength: [128, 'Max length is 128 characters']
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
