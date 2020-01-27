const SemenCollection = require('../models/semenCollection.js');

//Create a new semen collections
exports.createSemenCollection = async (req, res, next) => {
  try {
    let semenCollection = new SemenCollection(req.body.semenCollection)
    await semenCollection.save(function(err,semenCollection) {
      if (err) return next(err);
      semenCollection
      .populate('stallion')
      .populate('owner')
      .populate('location.container')
      .execPopulate()
      .then(function(semenCollection) {
        res.status(200).send(semenCollection);
      })
    });
  } catch(err) {
    return next(err);
  }
};

//Get all semen collections
exports.getAllSemenCollections = async (req,res,next) => {
  try {
    await SemenCollection.find(req.query)
    .populate('stallion')
    .populate('owner')
    .populate('location.container')
    .exec((err, semenCollections) => {
      if (err) return next(err);
      res.status(200).send(semenCollections);
    });
  } catch (err) {
    return next(err);
  }
};

//Update a semen collection
exports.updateSemenCollection = async (req, res, next) => {
  try {
    const response = await SemenCollection.findByIdAndUpdate(req.params.id, {$set: req.body.semenCollection}, (err, semenCollection) => {
      if (err) return next(err);
      res.status(200).send(semenCollection);
    });
  } catch (err) {
    return next(err);
  }
};

//Delete a semen collection
exports.deleteSemenCollection = async (req,res,next) => {
  try {
    SemenCollection.findByIdAndDelete(req.params.id, (err, SemenCollection) => {
      if (err) return next(err);
      res.status(200).send(`The semen collection was succesfully deleted`);
    });
  } catch (err) {
    return next(err);
  }
};
