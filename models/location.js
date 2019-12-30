const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let locationSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Location name is a required field'],
    maxlength: [64, 'Max length is 64 characters']
  },
  places: {
    type: Number,
    required: [true, 'Location places is a required field'],
  },
  stable: {
    type: String,
    enum: ['Stal Zoutleeuw','Stal Dormaal','Wei',]
  },
}, {timestamps: true});

module.exports = mongoose.model('Location', locationSchema);
