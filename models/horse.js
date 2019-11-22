const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let horseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Horse name is a required field'],
    maxlength: [128, 'Max length is 128 characters']
  },
  type: {
    type: String,
    enum: ['mare','stallion']
  },
  ueln: {
    type: String,
    trim: true,
    maxlength: [15, 'Max length is 15 characters']
  },
  date_of_birth: {
    type: Date,
    max: [Date.now, "Date of birth can't be in the future"]
  },
  studbook_number: {
    type: String,
    trim: true
  },
  father: {
    type: String,
    trim: true,
    maxlength: [128, 'Max length is 128 characters']
  },
  mother: {
    type: String,
    trim: true,
    maxlength: [128, 'Max length is 128 characters']
  },
  grandfather: {
    type: String,
    trim: true,
    maxlength: [128, 'Max length is 128 characters']
  },
  coat_color: {
    type: String,
    enum: ['vos','zwart','bruin']
  },
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  }
}, {timestamps: true});
module.exports = mongoose.model('Horse', horseSchema);
