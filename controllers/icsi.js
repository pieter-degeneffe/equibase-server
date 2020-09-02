const ICSI = require('../models/icsi.js');
const Embryo = require('../models/embryo.js');
const { cleanQuery } = require('./helpers.js');

//Create a new ICSI
exports.createICSI = async (req, res, next) => {
  try {
    const { code, donor_stallion, donor_mare, amount, collectionColor, owner, location, collectionDate, embryoCodes } = req.body.icsi;
    const embryos = await Promise.all(embryoCodes.map(async code => {
      const embryo = new Embryo({
        code,
        donor_mare,
        donor_stallion,
        batch_code: code,
        color: collectionColor,
        date_imported: collectionDate,
        owner,
        location: { ...location, position: 'Onder' }
      });
      await embryo.save();
      return embryo;
    }));
    const icsi = new ICSI({ embryos, code, donor_mare, donor_stallion, });
    await icsi.save();
    res.status(201).send(icsi);
  } catch (err) {
    console.log('Arne: err= ', err);
    return next(err);
  }
};

//Get all ICSIs
exports.getAllICSI = async (req, res, next) => {
  try {
    let container, tube;

    const { limit, page, sortBy, sortDesc, query } = cleanQuery(req);

    if (query.container) {
      container = query.container;
      delete query.container;
    }
    if (query.tube) {
      tube = query.tube;
      delete query.tube;
    }
    await ICSI.find(query)
      .skip((limit * page) - limit)
      .limit(limit)
      .sort({ [sortBy]: sortDesc })
      .exec((err, icsis) => {
        if (err) res.status(404).send();
        ICSI.countDocuments(query)
          .exec((err, total) => {
            if (err) res.status(404).send();
            if (sortBy && sortBy === 'amount') {
              icsis = icsis.sort(icsi => icsi.embryos.length * -sortDesc);
            }
            res.status(200).json({
              icsis: icsis.filter(icsi => (!container || icsi.embryos[0].location.container._id == container) && (!tube || icsi.embryos[0].location.tube == tube)),
              total
            });
          });
      });
  } catch (err) {
    return next(err);
  }
};

//Get all Embryos
exports.getAllEmbryos = async (req, res, next) => {
  try {
    const { limit, page, sortBy, sortDesc } = cleanQuery(req);

    await Embryo.find(req.query)
      .skip((limit * page) - limit)
      .limit(limit)
      .sort({ [sortBy]: sortDesc })
      .exec((err, embryos) => {
        if (err) res.status(404).send();
        Embryo.countDocuments(req.query)
          .exec((err, total) => {
            if (err) res.status(404).send();
            res.status(200).json({ embryos, total });
          });
      });
  } catch (err) {
    return next(err);
  }
};

//Get a ICSI
exports.getICSI = async (req, res, next) => {
  try {
    await ICSI.findOne({ code: req.params.icsiId })
      .exec((err, icsi) => {
        if (err) return next(err);
        res.status(200).send(icsi);
      });
  } catch (err) {
    return next(err);
  }
};

//Delete a ICSI
exports.deleteICSI = async (req, res, next) => {
  try {
    ICSI.findByIdAndDelete(req.params.icsiId, (err) => {
      if (err) {
        console.log('Arne: err= ', err);
        return next(err);
      }
      res.status(200).send(`The ICSI was successfully deleted`);
    });
  } catch (err) {
    return next(err);
  }
};

exports.addEmbryos = async (req, res, next) => {
  try {
    const ems = await Promise.all(req.body.icsi.embryos.map(async embryo => {
      const embryoM = new Embryo(embryo);
      return await embryoM.save().then(() => embryoM);
    }));

    const originalIcsi = await ICSI.findById(req.params.icsiId);
    originalIcsi.embryos = [...originalIcsi.embryos, ...ems.map(embryo => embryo.id)];
    const icsi = await originalIcsi.save();
    const populated = await icsi
      .populate('donor_stallion')
      .populate('donor_mare')
      .populate('embryos')
      .execPopulate();

    res.json(populated);
  } catch (err) {
    return next(err);
  }
};

exports.transferEmbryo = async (req, res, next) => {
  try {
    const { embryoId, surrogateId, transferDate, } = req.body;
    const embryo = await Embryo.findByIdAndUpdate(embryoId, {
      surrogate: surrogateId,
      date_transferred: transferDate,
      active: false
    }).exec();
    res.json(embryo);
  } catch (e) {
    return next(e);
  }
};

exports.exportEmbryo = async (req, res, next) => {
  try {
    const { embryoId, customerId, exportDate, inHouse = true } = req.body;
    const embryo = await Embryo.findByIdAndUpdate(embryoId, {
      owner: customerId,
      date_exported: exportDate,
      in_house: inHouse,
      active: inHouse ? active : false,
    }).exec();
    res.json(embryo);
  } catch (e) {
    return next(e);
  }
};