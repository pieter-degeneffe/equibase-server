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
  try {
    if(req.query.type) {
      await Horse.find({'type': req.query.type}).
      populate('location').
      exec((err, horses) => {
        if (err) res.status(404).send();
        res.status(201).json(horses);
      });
    } else if (req.query.owner) {
      await Horse.find({'owner': req.query.owner}).
      exec((err, horses) => {
        if (err) res.status(404).send();
        res.status(201).json(horses);
      });
    } else {
      await Horse.find({}).
      populate('location').
      exec((err, horses) => {
        if (err) res.status(404).send();
        res.status(201).json(horses);
      });
    }
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
      await Horse.findById(req.params.id).
      populate('location').
      exec((err, horse) => {
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
