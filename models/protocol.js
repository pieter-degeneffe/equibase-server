const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const {taxes} = require('../consts');

let protocolSchema = new Schema({
    name: {
        nl: {
            type: String,
            trim: true,
            required: true,
        },
        fr: {
            type: String,
            trim: true,
        },
        en: {
            type: String,
            trim: true,
        },
    },
    account: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    fixedPrice: {
        type: Boolean,
        required: true,
    },
    tax: {
        type: String,
        required: true,
        enum: taxes,
    },
    products: [{product: {type: mongoose.Schema.ObjectId, ref: 'Product'}, amount: {type: Number}}]
}, {timestamps: true});

protocolSchema.plugin(mongoose_fuzzy_searching, {fields: ['name.nl']});

module.exports = mongoose.model('Protocol', protocolSchema);