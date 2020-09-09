const { error } = require('../utils/logger');
const Horse = require('../models/horse.js');
const Embryo = require('../models/embryo.js');
var fs = require('fs');
const { getItem } = require('../utils/mongoose');
const { deleteItem } = require('../utils/mongoose');
const { cleanQuery } = require('./helpers');

//Create a new horse
exports.createHorse = async (req, res, next) => {
  try {
    let horse = new Horse(req.body.horse);
    await horse.save((err) => {
      if (err) return next(err);
      res.status(201).send(horse);
    });
  } catch (err) {
    return next(err);
  }
};

//Get all horses
exports.getAllHorses = async (req, res, next) => {
  try {
    if (req.query.death === 'false') req.query.death = { $ne: true };
    if (req.query.surrogate === 'false') req.query.surrogate = { $ne: true };
    if (req.query.stud_horse === 'false') req.query.stud_horse = { $ne: true };
    if (req.query.location === 'true') req.query.location = { $ne: null };
    if (req.query.date_of_birth === 'true') req.query.date_of_birth = { $ne: null };
    if (req.query.surrogate_uid === 'true') req.query.surrogate_uid = { $ne: null };
    if (req.query.microchip === 'true') req.query.microchip = { $ne: null };

    const { limit, page, sortBy, sortDesc } = cleanQuery(req);

    await Horse.find(req.query)
      .populate('location')
      .populate('owner')
      .skip((limit * page) - limit)
      .limit(limit)
      .sort({ [sortBy]: sortDesc })
      .exec((err, horses) => {
        if (err) {
          throw { statusCode: 404, message: `${ query } nothing found`, status: 'Not Found' };
        }
        Horse.countDocuments(req.query)
          .exec((err, total) => {
            if (err) {
              return next(err);
            }
            res.status(200).json({ horses, total });
          });
      });
  } catch (err) {
    return next(err);
  }
};

//Get a horse
exports.getHorse = async (req, res, next) => {
  try {
    if (req.route.methods.get && req.route.path === '/:horseId') {
      await Horse.findById(req.params.horseId)
        .populate('owner')
        .exec((err, horse) => {
          if (err) return next(err);
          res.status(200).send(horse);
        });
    } else if (req.route.methods.put) {
      await Horse.findById(req.params.horseId)
        .populate('location')
        .exec((err, horse) => {
          if (err) return next(err);
          req.body.horse.location = horse.location;
          next();
        });
    }
  } catch (err) {
    return next(err);
  }
};
exports.getEmbryosOfHorse = async (req, res, next) => {
  try {
    const embryos = await getItem(Embryo,{ ...req.query, surrogate: req.params.horseId });
    return res.json({ embryos });
  } catch (e) {
    return next(e);
  }
};
//Update a horse
exports.updateHorse = async (req, res, next) => {
  try {
    let unset = {};
    if (!req.body.horse.location) unset.location = '';
    await Horse.findByIdAndUpdate(req.params.horseId, { $set: req.body.horse, $unset: unset }, { new: true })
      .populate('owner')
      .populate('location')
      .exec((err, horse) => {
        if (err) return next(err);
        res.status(200).send(horse);
      });
  } catch (err) {
    return next(err);
  }
};

//Delete a horse
exports.deleteHorse = async (req, res, next) => {
  try {
    await deleteItem(Horse, req.params.id);
    res.status(200).send(`The horse was successfully deleted`);
  } catch (err) {
    return next(err);
  }
};

//Create a new horse passport
exports.createPassport = async (req, res, next) => {
  let file = req.files.file;
  let filename = 'files/horse/passport/' + req.params.horseId + '.pdf';
  file.mv('public/' + filename, function (err) {
    if (err) {
      return next(err);
    }
    Horse.findByIdAndUpdate(req.params.horseId, { $set: { passport: filename } }, { new: true }, (err, horse) => {
      if (err) return next(err);
      res.status(201).send(horse);
    });
  });
};

//Delete a horse passport
exports.deletePassport = (req, res, next) => {
  let filename = 'public/files/horse/passport/' + req.params.horseId + '.pdf';
  fs.unlink(filename, function () {
    Horse.findByIdAndUpdate(req.params.horseId, { $unset: { passport: 1 } }, { new: true }, (err, horse) => {
      if (err) return next(err);
      res.status(200).send(horse);
    });
  });
};

//Create a new horse lodging
exports.createLodging = async (req, res, next) => {
  try {
    await Horse.findByIdAndUpdate(req.params.horseId, { $set: req.body.horse }, { new: true })
      .exec((err, horse) => {
        if (err) return next(err);
        res.status(201).send(horse);
      });
  } catch (err) {
    return next(err);
  }
};

//Delete an existing horse lodging
exports.deleteLodging = async (req, res, next) => {
  try {
    await Horse.findByIdAndUpdate(req.params.horseId, { $pull: { lodgings: { _id: req.params.lodgingId } } }, (err, horse) => {
      res.status(200).send(`The lodging was succesfully removed`);
    });
  } catch (err) {
    return next(err);
  }
};

//Get horse count
// exports.getHorseCount = async (req, res, next) => {
//   try {
//     await Horse.countDocuments({}, (err, count) => {
//       if (err) return next(err);
//       res.status(200).json(count);
//     });
//   } catch(err) {
//     return next(err);
//   }
// };
