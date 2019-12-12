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
    required: [true, 'Microchip is a required field'],
  },
  date_of_birth: {
    type: Date,
    max: [Date.now, "Date of birth can't be in the future"]
  },
  studbook: {
    type: String,
    enum: ['Aes','American Quarter Horse','Anglo-arabian','Arab','Bwp','Hannover','Holstein','Kwpn','Lusitana','Oldenburg','Others','Sbs','Sf','Stud-book Du Cheval De Selle Luxembourgeois (S.c.s.l.)','Westfalen','Zangersheide']
  },
  coat_color: {
    type: String,
    enum: ['vos','zwart','bruin']
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
    ref: 'Horse'
  }
}, {timestamps: true});
module.exports = mongoose.model('Horse', horseSchema);
