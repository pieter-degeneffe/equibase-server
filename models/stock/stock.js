const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  product : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  amount: {
    type: Number,
    required: [true, 'Amount is a required field']
  },
}, {timestamps: true});

const autoPopulate = function (next) {
  this.populate('product');
  next();
};

stockSchema.pre('find', autoPopulate);
stockSchema.pre('findOne', autoPopulate);
stockSchema.pre('findByIdAndUpdate', autoPopulate);

module.exports = mongoose.model('StockModification', stockSchema, '');
