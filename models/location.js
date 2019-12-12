const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Location', locationSchema);

let horseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Location name is a required field'],
    maxlength: [64, 'Max length is 64 characters']
  }
}, {timestamps: true});
