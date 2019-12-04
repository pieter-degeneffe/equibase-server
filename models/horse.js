const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let horseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Horse name is a required field'],
    maxlength: [64, 'Max length is 64 characters']
  },
  type: {
    type: String,
    enum: ['hengst','merrie']
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
    maxlength: [64, 'Max length is 64 characters']
  },
  mother: {
    type: String,
    trim: true,
    maxlength: [64, 'Max length is 64 characters']
  },
  grandfather: {
    type: String,
    trim: true,
    maxlength: [64, 'Max length is 64 characters']
  },
  coat_color: {
    type: String,
    enum: ['vos','zwart','bruin']
  }
}, {timestamps: true});
module.exports = mongoose.model('Horse', horseSchema);
