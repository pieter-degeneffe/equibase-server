const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let customerSchema = new Schema({
  first_name: {
    type: String,
    required: [true, 'Customer first_name is required'],
    maxlength: [128, 'Max length is 128 characters']
  },
  last_name: {
    type: String,
    required: [true, 'Customer last_name is required'],
    maxlength: [128, 'Max length is 128 characters']
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

customerSchema.virtual('name').get(function () {
  return this.first_name + ', ' + this.last_name;
});

module.exports = mongoose.model('Customer', customerSchema);
