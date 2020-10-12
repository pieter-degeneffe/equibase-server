const Location = require('../models/location.js');
const Horse = require('../models/horse.js');
const { cleanQuery } = require('../utils/helpers');
const { getItem } = require('../utils/mongoose');
const { deleteItem } = require('../utils/mongoose');

//HELPER - Get amount of horses in multiple locations
const getHorsesInMultipleLocations = async locations => {
  for (const location of locations) {
    location.horses = await Horse.find({ location: location._id }).lean();
  }
  return locations;
};

//HELPER - Get amount of horses in single location ID
const getHorsesInLocation = async locationId => Horse.find({ location: locationId }).lean();

//HELPER - Get amount of places in single location ID
const getPlacesInLocation = async locationId => {
  const location = await Location.findById(locationId).lean();
  return location.places;
};

//Create a new location
exports.createLocation = async (req, res, next) => {
  try {
    let location = new Location(req.body.location);
    await location.save((err) => {
      if (err) return next(err);
      res.status(201).send(location);
    });
  } catch (err) {
    return next(err);
  }
};

//Get all locations
exports.getAllLocations = async (req, res, next) => {
  try {
    const {options, query} = cleanQuery(req);
    const [locations, total] = await Promise.all([
      Location.find(query, null, { sort: { stable: 1 }, ...options }).lean(),
      Location.countDocuments(query)])
    await getHorsesInMultipleLocations(locations);
    res.json({ locations, total });
  } catch (err) {
    return next(err);
  }
};

//Get a location
exports.getLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.locationId).lean();
    if (req.route.methods.get && req.route.path === '/:id') {
      res.status(201).send(location);
      // } else if (req.route.methods.put && req.route.path === "/:id/horse/:horseId") {
    } else if (req.route.methods.put) {
      location.horses = await getHorsesInLocation(location._id);
      req.body.location.horses = location.horses;
      next();
    }
  } catch (err) {
    return next(err);
  }
};

//Update a location
exports.updateLocation = async (req, res, next) => {
  try {
    await Location.findByIdAndUpdate(req.params.locationId, { $set: req.body.location }, { new: true }, (err, location) => {
      if (err) return next(err);
      res.status(201).send(location);
    });
  } catch (err) {
    return next(err);
  }
};

//Delete a location
exports.deleteLocation = async (req, res, next) => {
  try {
    await deleteItem(Location, req.params.id);
    res.status(200).send(`The location was successfully deleted`);
  } catch (err) {
    return next(err);
  }
};

//Check available places for a location
exports.checkAvailablePlaces = async (req, res, next) => {
  try {
    if (req.body.location) {
      if (req.body.location.places < req.body.location.horses.length) {
        let err = new Error('Er zitten te veel paarden in deze locatie om deze aanpassing te doen');
        err.statusCode = 500;
        next(err);
      } else {
        next();
      }
    } else if (req.body.horse && req.body.horse.location) {
      let horsesInLocation = await getHorsesInLocation(req.body.horse.location);
      //If a horse is being updated with the same location verification of available places is not needed
      if (horsesInLocation.some(horse => horse._id.equals(req.body.horse._id))) {
        next();
      } else {
        let placesInLocation = await getPlacesInLocation(req.body.horse.location);
        if (horsesInLocation.length < placesInLocation) {
          next();
        } else {
          let err = new Error('Er is geen plaats meer in de gekoze locatie');
          err.statusCode = 500;
          next(err);
        }
      }
    } else {
      next();
    }
  } catch (err) {
    return next(err);
  }
};
