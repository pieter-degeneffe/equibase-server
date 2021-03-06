const SemenCollection = require('../models/semen/collection');
const SemenCollectionModification = require('../models/semen/collectionModification.js');
const { deleteItem } = require('../utils/mongoose');

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
        res.status(201).send(semenCollection);
      })
    });
  } catch(err) {
    return next(err);
  }
};

//Get all semen collections
exports.getAllSemenCollections = async (req,res,next) => {
  try {
    const populateModifications = {
      path: 'modifications'
    };
    if(req.query.modificationType) {
      populateModifications.match = { 'type': req.query.modificationType }
      delete req.query.modificationType;
      req.query.modifications = { $exists: true, $ne: [] }
    }
    console.log(req.query);
    if(req.query.dates) {
      console.log(req.query.dates)
      // populateModifications.match = {"createdAt": {"$gte": req.query.dates[0]}} //modifications created after start date
      req.query.production_date = {$gte:req.query.dates[0], $lt: req.query.dates[1]}; //Semen collections with a production date after start date
      delete req.query.dates;
    }

    await SemenCollection.find(req.query)
    .populate('stallion')
    .populate(populateModifications)
    .populate('owner')
    .populate('location.container')
    .exec((err, semenCollections) => {
      if (err) return next(err);
      console.log(semenCollections);
      res.status(200).send(semenCollections);
      next();
    });
  } catch (err) {
    return next(err);
  }
};

//Get a specific semen collection
exports.getSemenCollection = async (req,res,next) => {
  try {
    await SemenCollection.findById(req.params.id)
      .populate('owner')
      .populate('modifications')
      .exec((err, semenCollection) => {
      if (err) return next(err);
      res.status(200).send(semenCollection);
    });
  } catch (err) {
    return next(err);
  }
};

//Update a semen collection
exports.updateSemenCollection = async (req, res, next) => {
  try {
    await SemenCollection.findByIdAndUpdate(req.params.id, { $set: req.body.semenCollection }, { new: true })
    .populate('stallion')
    .populate('owner')
    .populate('modifications')
    .populate('location.container')
    .exec((err, semenCollection) => {
      if (err) return next(err);
      res.status(201).send(semenCollection);
    });
  } catch(err) {
    return next(err);
  }
};

//Delete a semen collection
exports.deleteSemenCollection = async (req,res,next) => {
  try {
    await deleteItem(SemenCollection, req.params.id);
    res.status(204).send(`The semen collection was succesfully deleted`);
  } catch (err) {
    return next(err);
  }
};

//Create a new modification to a semen collection
exports.createModification = async (req, res, next) => {
  try {
    let semenCollectionModification = new SemenCollectionModification(req.body.semenCollectionModification)
    await semenCollectionModification.save((err) => {
      if (err) return next(err);
      SemenCollection.findByIdAndUpdate(req.params.collectionId, {$push: {modifications: semenCollectionModification._id}}, { new: true })
      .populate('stallion')
      .populate('owner')
      .populate('modifications')
      .populate('location.container')
      .exec((err, semenCollection) => {
        if (err) return next(err);
        res.status(201).send(semenCollection);
      });
    })
  } catch(err) {
    return next(err);
  }
};

//Remove the modification to a semen collection
exports.deleteModification = async (req,res,next) => {
  try {
    SemenCollection.findByIdAndUpdate(req.params.collectionId, { $pull: { modifications: req.params.modificationId }}, { new: true })
    .populate('stallion')
    .populate('owner')
    .populate('modifications')
    .populate('location.container')
    .exec((err, semenCollection) => {
      if (err) return next(err);
      res.status(200).send(semenCollection);
    });
  } catch(err) {
    return next(err);
  }
};
