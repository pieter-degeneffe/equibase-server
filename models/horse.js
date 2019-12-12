const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let horseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Horse name is a required field'],
    maxlength: [64, 'Max length is 64 characters']
  },
  type: {
    type: String,
    enum: ['hengst','merrie']
  },
  ueln: {
    type: String,
    trim: true,
    maxlength: [15, 'Max length is 15 characters']
  },
  microchip: {
    type: String,
    unique: [true, 'Er bestaat al een paard met dit microchip nummer'],
    required: [true, 'Microchip is a required field'],
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
  surrogate_location: {
    type: String,
    enum: ['locatie 1','locatie 2','locatie 3']
  },
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Horse',
    required: [true, 'Eigenaar is a required field'],
  }
}, {timestamps: true});
module.exports = mongoose.model('Horse', horseSchema);
