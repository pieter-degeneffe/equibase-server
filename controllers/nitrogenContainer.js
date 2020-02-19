const NitrogenContainer = require('../models/nitrogenContainer.js');

//Create a new nitrogen container
exports.createNitrogenContainer = async (req, res, next) => {
  try {
    let nitrogenContainer = new NitrogenContainer(req.body.nitrogenContainer);
    await nitrogenContainer.save((err) => {
      if (err) return next(err);
      res.status(201).send(nitrogenContainer);
    })
  } catch (err) {
    return next(err);
  }
};

//Get all nitrogen containers
exports.getNitrogenContainers = async (req,res,next) => {
  try {
    await NitrogenContainer.find(req.query)
      .exec((err, nitrogenContainers) => {
        if (err) return next(err);
        res.status(200).send(nitrogenContainers);
      });
  } catch (err) {
    return next(err);
  }
};

//Update a nitrogen container
exports.updateNitrogenContainer = async (req, res, next) => {
  try {
    const response = await NitrogenContainer.findByIdAndUpdate(req.params.nitrogenContainerId, {$set: req.body.nitrogenContainer}, { new: true }, (err, nitrogenContainer) => {
      if (err) return next(err);
      res.status(200).send(nitrogenContainer);
    });
  } catch (err) {
    return next(err);
  }
};

//Delete a nitrogen container
exports.deleteNitrogenContainer = async (req,res,next) => {
  try {
    NitrogenContainer.findByIdAndDelete(req.params.nitrogenContainerId, (err, nitrogenContainer) => {
      if (err) return next(err);
      res.status(200).send(`The customer was succesfully deleted`);
    });
  }
  catch(err) {
    return res.status(500).send(err);
  }
};
