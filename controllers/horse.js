const Horse = require('../models/horse.js');

//Create a new horse
exports.createHorse = async (req, res, next) => {
  try {
    let horse = new Horse(
      {
        name: req.body.name,
        type: req.body.type,
        ueln: req.body.ueln,
        coat_color: req.body.coat_color,
        studbook_number: req.body.studbook_number,
        father: req.body.father,
        mother: req.body.mother,
        grandfather: req.body.grandfather,
        adjusted_date: Date.now
      }
    );
    await horse.save((err) => {
      if (err) return next(err);
      res.status(201).send(horse);
    })
  }
  catch(err) {
    return res.status(500).send(err);
  }
};

//Display list of all Horses
exports.getAllHorses = async (req, res, next) => {
  try {
    await Horse.find({}, (err, horses) => {
      if (err) res.status(404).send();
      res.status(201).json(horses);
    });
  } catch (err) {
    return next(err);
  }
};

//Display a specific horse
exports.getHorse = async (req,res,next) => {
  try {
    await Horse.findById(req.params.id, (err, horse) => {
      if (err) res.status(404).send();
      res.status(200).send(horse);
    });
  }
  catch(err) {
    return res.status(500).send(err);
  }
};

//Update an existing horse
exports.updateHorse = async (req, res, next) => {
  try {
    const response = await Horse.findByIdAndUpdate(req.params.id, {$set: req.body.horse}, (err, horse) => {
      if (err) return next(err);
      res.status(201).send(horse);
    });
  }
  catch(err) {
    return res.status(500).send(err);
  }
};

//Delete an existing Horse
exports.deleteHorse = async (req,res,next) => {
  try {
    Horse.findByIdAndDelete(req.params.id, (err, horse) => {
      if (err) return next(err);
      res.status(200).send(`The horse was succesfully deleted`);
    });
  }
  catch(err) {
    return res.status(500).send(err);
  }
};
