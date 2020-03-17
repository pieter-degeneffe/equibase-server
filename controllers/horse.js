const Horse = require('../models/horse.js');
var fs = require('fs');

//Create a new horse
exports.createHorse = async (req, res, next) => {
  try {
    let horse = new Horse(req.body.horse);
    await horse.save((err) => {
      if (err) return next(err);
      res.status(201).send(horse);
    })
  } catch(err) {
    return next(err);
  }
};

//Get all horses
exports.getAllHorses = async (req, res, next) => {
  try {
    let limit, page, sortBy, sortDesc;
    if(req.query.death === 'false') req.query.death = {$ne: true};
    if(req.query.surrogate === 'false') req.query.surrogate = {$ne: true};
    if(req.query.stud_horse === 'false') req.query.stud_horse = {$ne: true};
    if(req.query.location === 'true') req.query.location = {$ne: null};
    if(req.query.date_of_birth === 'true') req.query.date_of_birth = {$ne: null};
    if(req.query.surrogate_uid === 'true') req.query.surrogate_uid = {$ne: null};
    if(req.query.microchip === 'true') req.query.microchip = {$ne: null};
    if(req.query.limit) {
      limit = parseInt(req.query.limit);
      delete req.query.limit;
    }
    if(req.query.page) {
      page = parseInt(req.query.page);
      delete req.query.page;
    }
    if(req.query.sortBy) {
      sortBy = req.query.sortBy[0];
      delete req.query.sortBy;
    }
    if(req.query.sortDesc) {
      req.query.sortDesc[0] === 'true' ? sortDesc = -1 : sortDesc = 1;
      delete req.query.sortDesc;
    }
    await Horse.find(req.query)
      .populate('location')
      .populate('owner')
      .skip((limit * page) - limit)
      .limit(limit)
      .sort({[sortBy]: sortDesc})
      .exec((err, horses) => {
        if (err) res.status(404).send();
        Horse.countDocuments(req.query)
          .exec((err, total) => {
            if (err) res.status(404).send();
            res.status(200).json({horses, total});
          });
      });
  } catch (err) {
    return next(err);
  }
};

//Get a horse
exports.getHorse = async (req,res,next) => {
  try {
    if(req.route.methods.get && req.route.path === "/:horseId") {
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

//Update a horse
exports.updateHorse = async (req, res, next) => {
  try {
    let unset = {}
    if(!req.body.horse.location) unset.location = "";
    await Horse.findByIdAndUpdate(req.params.horseId, { $set: req.body.horse, $unset: unset }, { new: true })
    .populate('owner')
    .populate('location')
    .exec((err, horse) => {
      if (err) return next(err);
      res.status(201).send(horse);
    });
  } catch(err) {
    return next(err);
  }
};

//Delete a horse
exports.deleteHorse = async (req,res,next) => {
  try {
    Horse.findByIdAndDelete(req.params.horseId, (err, horse) => {
      if (err) return next(err);
      res.status(200).send(`The horse was succesfully deleted`);
    });
  } catch(err) {
    return next(err);
  }
};

//Create a new horse passport
exports.createPassport = async (req, res, next) => {
  let file = req.files.file;
  let filename = 'files/horse/passport/' + req.params.horseId +'.pdf';
  file.mv('public/' + filename, function(err) {
    if (err) return res.status(500).send(err);
    Horse.findByIdAndUpdate(req.params.horseId, {$set: { passport: filename}}, { new: true }, (err, horse) => {
      if (err) return next(err);
      res.status(201).send(horse);
    });
  });
};

//Delete a horse passport
exports.deletePassport = (req, res, next) => {
  let filename = 'public/files/horse/passport/' + req.params.horseId +'.pdf';
  fs.unlink(filename, function() {
    Horse.findByIdAndUpdate(req.params.horseId, {$unset: { passport: 1}}, { new: true }, (err, horse) => {
      if (err) return next(err);
      res.status(201).send(horse);
    });
  });
}

//Get horse count
// exports.getHorseCount = async (req, res, next) => {
//   try {
//     await Horse.countDocuments({}, (err, count) => {
//       if (err) res.status(404).send();
//       res.status(200).json(count);
//     });
//   } catch(err) {
//     return next(err);
//   }
// };
