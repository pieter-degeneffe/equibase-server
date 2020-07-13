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
    max: [Date.now, 'Date of import can\'t be in the future'],
    required: [true, 'date_imported is a required field'],
  },
  date_transferred: {
    type: Date,
  },
  color: {
    type: String,
    enum: colors
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  date_exported: {
    type: Date,
  },
  surrogate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Horse',
  },
  active: {
    type: Boolean,
    default: true,
  },
  in_house: {
    type: Boolean,
    default: true,
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
}, { timestamps: true });

const autoPopulate = function (next) {
  this.populate('donor_mare')
    .populate('donor_stallion')
    .populate('surrogate')
    .populate('location.container')
    .populate('owner');
  next();
};

embryoSchema.pre('find', autoPopulate);
embryoSchema.pre('findOne', autoPopulate);
embryoSchema.pre('findByIdAndUpdate', autoPopulate);

module.exports = mongoose.model('Embryo', embryoSchema);
