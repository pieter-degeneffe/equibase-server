const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let semenCollectionModificationSchema = new Schema({
  type: {
    type: String,
    enum: ['Export','Controle'],
    required: [true, 'Type is a required field'],
    immutable: true
  },
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  amount: {
    type: Number,
    required: [true, 'Amount is a required field']
  },
}, {timestamps: true});

module.exports = mongoose.model('SemenCollectionModification', semenCollectionModificationSchema);
