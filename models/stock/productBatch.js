const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const batchSchema = new Schema({
  product : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  lotNumber: {
    type: String,
    trim: true,
    required: true,
    maxlength: [64, 'Max length is 64 characters'],
  },
  expirationDate: {
    type: Date,
    trim: true,
    required: true,
    maxlength: [64, 'Max length is 64 characters'],
  },
  buyInPrice: {
    type: Number,
    trim: true,
    maxlength: [64, 'Max length is 64 characters'],
  },
  initialAmount: {
    type: Number,
    maxlength: [64, 'Max length is 64 characters'],
  },
  remainingAmount: {
    type: Number,
    required: [true, 'Amount is a required field']
  },
  deliveryDate:{
    type: Date,
    required: true,
  },
  supplier: {
    type: String,
    trim: true,
    maxlength: [64, 'Max length is 64 characters'],
  },
}, {timestamps: true});

const autoPopulate = function (next) {
  this.populate('product');
  next();
};

batchSchema.pre('find', autoPopulate);
batchSchema.pre('findOne', autoPopulate);
batchSchema.pre('findByIdAndUpdate', autoPopulate);

module.exports = mongoose.model('ProductBatch', batchSchema, '');
