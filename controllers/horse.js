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
    return res.status(500).send(err);
  }
};

//Get all Horses
exports.getAllHorses = async (req, res, next) => {
  console.log(req.query);
  try {
    let limit, page, sortBy, sortDesc;
    if(req.query.death === 'false') req.query.death = {$ne: true};
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
    console.log(req.query)
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
            res.status(201).json({horses, total});
          });
      });
  } catch (err) {
    return next(err);
  }
};

//Get horse count
exports.getHorseCount = async (req, res, next) => {
  try {
    await Horse.countDocuments({}, (err, count) => {
      if (err) res.status(404).send();
      res.status(201).json(count);
    });
  } catch(err) {
    return next(err);
  }
};

//Get a specific horse
exports.getHorse = async (req,res,next) => {
  try {
    if(req.route.methods.get && req.route.path === "/:id") {
      await Horse.findById(req.params.id, (err, horse) => {
        if (err) res.status(404).send();
        res.status(200).send(horse);
      });
    } else if (req.route.methods.put) {
      await Horse.findById(req.params.id)
        .populate('location')
        .exec((err, horse) => {
          if (err) res.status(404).send();
          req.body.horse.location = horse.location;
          next();
        });
    }
  } catch(err) {
    return res.status(500).send(err);
  }
};

//Update an existing horse
exports.updateHorse = async (req, res, next) => {
  try {
    await Horse.findByIdAndUpdate(req.params.id, {$set: req.body.horse}, { new: true }).
    populate('location').
    exec((err, horse) => {
      if (err) return next(err);
      res.status(201).send(horse);
    });
  } catch(err) {
    return next(err);
  }
};

//Delete an existing Horse
exports.deleteHorse = async (req,res,next) => {
  try {
    Horse.findByIdAndDelete(req.params.id, (err, horse) => {
      if (err) return next(err);
      res.status(200).send(`The horse was succesfully deleted`);
    });
  } catch(err) {
    return next(err);
  }
};

//Create a new Passport
exports.createPassport = async (req, res, next) => {
  let file = req.files.file;
  let filename = 'files/horse/passport/' + req.params.id +'.pdf';
  file.mv('public/' + filename, function(err) {
    if (err) return res.status(500).send(err);
    Horse.findByIdAndUpdate(req.params.id, {$set: { passport: filename}}, { new: true }, (err, horse) => {
      if (err) return next(err);
      res.status(201).send(horse);
    });
  });
};

exports.deletePassport = (req, res, next) => {
  let filename = 'public/files/horse/passport/' + req.params.id +'.pdf';
  fs.unlink(filename, function() {
    // if (err) return res.status(500).send(err);
    Horse.findByIdAndUpdate(req.params.id, {$unset: { passport: 1}}, { new: true }, (err, horse) => {
      if (err) return next(err);
      res.status(201).send(horse);
    });
  });
}
