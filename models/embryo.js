const colors = require('../consts').colors;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let embryoSchema = new Schema({
  code: {
    type: String,
    trim: true,
    required: true,
    maxlength: [64, 'Max length is 64 characters'],
  },
  batch_code: {
    type: String,
    trim: true,
    required: [true, 'ICSI code is a required field'],
    maxlength: [64, 'Max length is 64 characters'],
  },
  donor_mare: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Horse'
  },
  donor_stallion: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Horse'
  },
  date_imported: {
    type: Date,
    max: [Date.now, 'Date of birth can\'t be in the future'],
    required: [true, 'date_imported is a required field'],
  },
  color: {
    type: String,
    enum: colors
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  location: {
    container: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NitrogenContainer',
      required: [true, 'Nitrogen container is a required field']
    },
    tube: {
      type: Number,
      required: [true, 'Tube is a required field'],
    },
    position: {
      type: String,
      enum: ['Boven', 'Onder'],
      required: [true, 'Position is a required field'],
    }
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Embryo', embryoSchema);
