const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const { productTypes, taxes } = require('../../consts');
const ProductBatch = require('./productBatch.js');
const { getItem } = require('../../utils/mongoose');

let productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: [64, 'Max length is 64 characters'],
  },
  type: {
    type: String,
    enum: productTypes,
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
  supplementAdministration: {
    required: true,
    type: Number,
    maxlength: [64, 'Max length is 64 characters'],
  },
  tax: {
    type: String,
    enum: taxes,
    required: true,
  },
  waitingTime: {
    type: String,
    required: true,
    trim: true,
    maxlength: [64, 'Max length is 64 characters'],
  },
}, { timestamps: true });

productSchema.method('getStock', async function () {
  const batches = await getItem(ProductBatch, { product: this._id });
  const stock = batches.reduce((total, cur) => cur.active ? ({
    remaining: total.remaining + cur.remainingAmount,
    value: total.value + cur.sellingPrice
  }) : total, { remaining: 0, value: 0 });
  const product = this.toObject({ virtuals: true });
  return { ...product, ...stock };
});

productSchema.plugin(mongoose_fuzzy_searching, { fields: ['name'] });

module.exports = mongoose.model('Product', productSchema);
