const colors = require('../../consts').colors;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let semenCollectionSchema = new Schema(
  {
    stallion : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Horse',
      required: [true, 'Stallion is a required field'],
      immutable: true
    },
    owner : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Owner is a required field']
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
    initial_inventory: {
      type: Number,
      required: [true, 'Inventory is a required field'],
      immutable: true
    },
    color: {
      type: String,
      enum: colors
    },
    type: {
      type: String,
      enum: ['Productie','Import'],
      required: [true, 'Type is a required field'],
      immutable: true
    },
    production_date: {
      type: Date,
      max: [Date.now, "Production date can't be in the future"]
    },
    modifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SemenCollectionModification' }]
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

semenCollectionSchema.virtual('current_inventory').get(function() {
  let modificationsAmount = this.modifications.reduce((acc, modification) => acc + modification.amount, 0);
  return (this.initial_inventory + modificationsAmount)
});

module.exports = mongoose.model('SemenCollection', semenCollectionSchema);
