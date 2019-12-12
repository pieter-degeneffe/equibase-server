const Location = require('../models/location.js');
//Create a new location
exports.createLocation = async (req, res, next) => {
  try {
    let location = new Location(req.body.location);
    await location.save((err) => {
      if (err) return next(err);
      res.status(201).send(location);
    })
  } catch(err) {
    return next(err);
  }
};

//Get all locations
exports.getAllLocations = async (req, res, next) => {
  try {
    await Location.find({}, (err, locations) => {
      if (err) return next(err);
      res.status(201).send(locations);
    });
  } catch (err) {
    return next(err);
  }
};

//Get a specific location
exports.getLocation = async (req,res,next) => {
  try {
    await Location.findById(req.params.id, (err, location) => {
      if (err) return next(err);
      res.status(201).send(location);
    });
  } catch (err) {
    return next(err);
  }
};

//Update an existing location
exports.updateLocation = async (req, res, next) => {
  try {
    await Location.findByIdAndUpdate(req.params.id, {$set: req.body.location}, { new: true }, (err, location) => {
      if (err) return next(err);
      res.status(201).send(location);
    });
  } catch (err) {
    return next(err);
  }
};
