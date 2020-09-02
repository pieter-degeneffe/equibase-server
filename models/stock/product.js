const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

let productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: [64, 'Max length is 64 characters'],
  },
  type: {
    type: String,
    enum: ['Materiaal', 'Geneesmiddel', 'Voedingssupplement', 'Ontsmettingsmiddel'],
    required: true,
  },
  CNK: {
    type: String,
    trim: true,
    required: true,
    maxlength: [64, 'Max length is 64 characters'],
  },
  outgoingUnit: {
    type: String,
    trim: true,
    required: true,
    maxlength: [64, 'Max length is 64 characters'],
  },
  tax: {
    type: String,
    enum: ['6%', '21',],
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
    maxlength: [64, 'Max length is 64 characters'],
  },
  sellingPricePerUnit: {
    required: true,
    type: Number,
    maxlength: [64, 'Max length is 64 characters'],
  },
  supplementAdministration: {
    required: true,
    type: Number,
    maxlength: [64, 'Max length is 64 characters'],
  },
  waitingTime: {
    type: String,
    required: true,
    trim: true,
    maxlength: [64, 'Max length is 64 characters'],
  },
  unitSellingPrice: {
    type: Number,
    required: true,
    maxlength: [64, 'Max length is 64 characters'],
  },
  unitAdministrationPrice: {
    required: true,
    type: Number,
    maxlength: [64, 'Max length is 64 characters'],
  },
}, { timestamps: true });

productSchema.plugin(mongoose_fuzzy_searching, { fields: ['name'] });

const autoPopulate = function (next) {
  // this.populate('donor_stallion');
  next();
};
productSchema.pre('find', autoPopulate);
productSchema.pre('findOne', autoPopulate);
productSchema.pre('findByIdAndUpdate', autoPopulate);
module.exports = mongoose.model('Product', productSchema, '');