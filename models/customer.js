const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let contactSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
    required: [true, 'First name of contact is required'],
    maxlength: [64, 'Max length is 64 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid first name']
  },
  last_name: {
    type: String,
    trim: true,
    required: true,
    required: [true, 'Last name of contact is required'],
    maxlength: [64, 'Max length is 64 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid last name']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [64, 'Max length is 64 characters'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  telephone: {
    type: String,
    trim: true,
    maxlength: [16, 'Max length is 16 characters'],
    lowercase: true
  },
  role: {
    type: String,
    enum: ["Eigenaar bedrijf", "Boekhouder", "Transporteur", "Verantwoordelijke fokkerij"]
  }
});

let customerSchema = new Schema({
  type: {
    type: String,
    required: [true, 'Customer type  is required'],
    enum: ['particulier','bedrijf']
  },
  first_name: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
    maxlength: [64, 'Max length is 64 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid first name'],
    index: true
  },
  last_name: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    maxlength: [64, 'Max length is 64 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid last name'],
    index: true
  },
  company: {
    type: String,
    trim: true,
    maxlength: [64, 'Max length is 64 characters'],
    match: [/^[a-zA-Z0-9 _]+$/, 'Please fill a valid company name'],
    index: true
  },
  tva: {
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [14, 'Max length is 14 characters'],
  },
  language: {
    type: String,
    required: [true, 'Language  is required'],
    enum: ['NL','FR', 'EN']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, 'Er bestaat al een klant met dit e-mail adres'],
    required: [true, 'Email address  is required'],
    maxlength: [64, 'Max length is 64 characters'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    index: true
  },
  telephone: {
    type: String,
    trim: true,
    maxlength: [16, 'Max length is 16 characters'],
    lowercase: true
  },
  street: {
    type: String,
    trim: true,
    maxlength: [32, 'Max length is 32 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid street']
  },
  house_number: {
    type: String,
    trim: true,
    maxlength: [16, 'Max length is 16 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid house number']
  },
  zip: {
    type: String,
    trim: true,
    maxlength: [8, 'Max length is 8 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid ZIP code']
  },
  city: {
    type: String,
    trim: true,
    maxlength: [32, 'Max length is 32 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid city']
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    enum: ['Afghanistan','Albanië','Algerije','Andorra','Angola','Antigua-Barbuda','Argentinië','Armenië','Aruba','Australië','Azerbaijan','Bahamas','Bahrein','Belize','België','Bermuda','Bolivia','Bosnië-Herzegovina','Botswana','Brazilië','Brunei Darussalam','Bulgarije','Burundi','Cambodja','Cameroen','Canada','Cayman Eilanden','Centraal-Afrikaanse Republiek','Chili','China','Ciprus','Colombia','Congo','Cook Eilanden','Costa Rica','Groatië','Cuba','Cyprus','Denemarken','Dominica','Dominicaanse Republiek','DR Congo','Duitsland','Ecuador','Egypte','El Salvador','Eritrea','Estland','Ethiopië','Fiji','Filipijnen','Finland','Frankrijk','Frans Polynesië','Gabon','Gambia','Georgië','Ghana','Griekenland','Groenland','Guam','Guatemala','Guinee-Bissau','Guyana','Haïti','Honduras','Hongarije','Ierland','IJsland','India','Indonesië','Irak','Iran','Israël','Italië','Ivoorkust','Jamaica','Japan','Jemen','Joegoslavië','Jordanië','Kameroen','Kazachstan','Kenya','Kirgizstan','Koeweit','Korea','Kroatië','Laos','Lesotho','Letland','Libanon','Liberia','Libië','Liechtenstein','Litouwen','Luxemburg','Macedonië','Maleisië','Mali','Malta','Marokko','Mauritanië','Mauritius','Mexico','Moldova','Monaco','Mozambique','Namibië','Nederland','Nepal','Nicaragua','Nieuw Zeeland','Niger','Nigeria','Noorwegen','Oezbekistan','Oman','Oostenrijk','Pakistan','Papoea-Nieuw-Guinea','Paraguay','Peru','Polen','Portugal','Puerto Rico','Quatar','Roemenië','Rusland','Rwanda','Saint Lucia','Salomonseilanden','San Marino','Saudi-Arabië','Schotland','Senegal','Sierra Leone','Singapore','Slovenië','Slowakije','Somalië','Spanje','Sri Lanka','Sudan','Syrie','Tadzjikistan','Taiwan','Thailand','Tobago','Tsjechië','Tsjaad','Tunesië','Turkije','Turkmenistan','Trinidad','Uganda','Ukraine','Uruguay','Venezuela','Verenigd Koninkrijk','Verenigde Staten','Vietnam','Zaïre','Zambia','Zimbabwe','Zuid-Afrika','Zweden','Zwitserland']
  },
  contacts : [contactSchema]
}, {timestamps: true});

module.exports = mongoose.model('Customer', customerSchema);
