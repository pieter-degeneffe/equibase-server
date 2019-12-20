const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

let horseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Horse name is a required field'],
    maxlength: [64, 'Max length is 64 characters'],
    match: [/^[\w \.-]+$/, 'Please fill a valid first name'],
  },
  type: {
    type: String,
    required: [true, 'Horse type is a required field'],
    enum: ['hengst','merrie']
  },
  ueln: {
    type: String,
    trim: true,
    index:true,
    maxlength: [15, 'Max length is 15 characters']
  },
  microchip: {
    type: String,
    trim: true,
    unique: [true, 'Er bestaat al een paard met dit microchip nummer']
  },
  date_of_birth: {
    type: Date,
    max: [Date.now, "Date of birth can't be in the future"]
  },
  studbook: {
    type: String,
    enum: ['Arabische volbloed (Arab)','American Quarter Horse (AQH)','Belgisch Warmbloedpaard (BWP)','SBS','SF','Trotteur Francais (TF)','Belgische Draver','Studbook Zangersheide (Z)','Studbook Du Cheval de Selle Luxembourgeois (SCSL)','Westfalen','Hannover','Oldenburg (OLD)','Anglo European Studbook (AES)','Koninklijk Nederlands Warmbloedpaard (KWPN)','Lusitana','Equipas','Andere']
  },
  coat_color: {
    type: String,
    enum: ['Bruin','Donkerbruin','Vos','Donkervos','Zwart','Schimmel','Wit','Bont','Palomino']
  },
  father: {
    type: String,
    trim: true,
    maxlength: [64, 'Max length is 64 characters']
  },
  mother: {
    type: String,
    trim: true,
    maxlength: [64, 'Max length is 64 characters']
  },
  grandfather: {
    type: String,
    trim: true,
    maxlength: [64, 'Max length is 64 characters']
  },
  passport: {
    type: String
  },
  death: {
    type: Boolean
  },
  date_of_death: {
    type: Date,
    max: [Date.now, "Date of birth can't be in the future"]
  },
  keep_for_food_chain: {
    type: Boolean
  },
  surrogate: {
    type: Boolean
  },
  surrogate_uid: {
    type: String,
    maxlength: [64, 'Max length is 64 characters']
  },
  location: {
    type: String,
    enum: ['locatie 1','locatie 2','locatie 3']
  },
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Horse'
  }
}, {timestamps: true});

horseSchema.plugin(mongoose_fuzzy_searching, {fields: ['name', 'ueln', 'microchip']});
module.exports = mongoose.model('Horse', horseSchema);
