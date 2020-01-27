const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let nitrogenContainerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Container name is a required field'],
    maxlength: [64, 'Max length is 64 characters'],
    match: [/^[\w \.'-]+$/, 'Please fill a valid container name'],
  },
  available_places: {
    type: Number,
    required: [true, 'Available places is a required field']
  }
}, {timestamps: true});

module.exports = mongoose.model('NitrogenContainer', nitrogenContainerSchema);
