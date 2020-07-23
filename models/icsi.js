const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

let icsiSchema = new Schema({
  code: {
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
  embryos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Embryo', required: true }]

}, { timestamps: true });

icsiSchema.plugin(mongoose_fuzzy_searching, { fields: ['name'] });
const autoPopulate = function (next) {
  this.populate({
      path: 'embryos',
      populate: {
        path: 'donor_mare donor_stallion location.container owner'
      }
    })
    .populate('donor_mare')
    .populate('donor_stallion');
  next();
};
icsiSchema.pre('find', autoPopulate);
icsiSchema.pre('findOne', autoPopulate);
icsiSchema.pre('findByIdAndUpdate', autoPopulate);
module.exports = mongoose.model('ICSI', icsiSchema, '');
