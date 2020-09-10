const { modificationTypes } = require('../../consts');
const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;
const stockModificationSchema = new Schema({
  type: {
    type: String,
    enum: Object.values(modificationTypes),
    required: [true, 'Type is a required field'],
    immutable: true
  },
  product: {
    type: ObjectId,
    ref: 'Product',
    required: true,
  },
  batch: {
    type: ObjectId,
    ref: 'ProductBatch',
    required: true
  },
  client: {
    type: ObjectId,
    ref: 'Customer',
    required: function () {
      return this.type === modificationTypes.SEL;
    }
  },
  horse: {
    type: ObjectId,
    ref: 'Horse',
    required: function () {
      return this.type === modificationTypes.ADMINISTRATION;
    }
  },
  amount: {
    type: Number,
    required: [true, 'Amount is a required field']
  },
}, { timestamps: true });

const autoPopulate = function (next) {
  this.populate('product');
  this.populate('batch');
  this.populate('client');
  this.populate('horse');
  next();
};

stockModificationSchema.pre('find', autoPopulate);
stockModificationSchema.pre('findOne', autoPopulate);
stockModificationSchema.pre('findByIdAndUpdate', autoPopulate);
module.exports = model('StockModification', stockModificationSchema, '');
