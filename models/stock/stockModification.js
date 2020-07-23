const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockModificationSchema = new Schema({
  type: {
    type: String,
    enum: ['Export','Controle'],
    required: [true, 'Type is a required field'],
    immutable: true
  },
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

stockModificationSchema.pre('find', autoPopulate);
stockModificationSchema.pre('findOne', autoPopulate);
stockModificationSchema.pre('findByIdAndUpdate', autoPopulate);
module.exports = mongoose.model('StockModification', stockModificationSchema, '');
