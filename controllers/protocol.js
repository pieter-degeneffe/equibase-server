const { cleanQuery } = require('../utils/helpers.js');
const Protocol = require('../models/protocol');
const {getItem, getItemById, updateItemById, deleteItem} = require("../utils/mongoose");

exports.getAllProtocols = async (req, res, next) => {
    try {
        const { options, query } = cleanQuery(req);
        const [protocols, total] = await Promise.all([
            getItem(Protocol, query, options),
            Protocol.countDocuments(query)
        ]);
        res.json({ protocols, total });
    } catch (err) {
        next(err);
    }
}

exports.createProtocol = async (req, res, next) => {
  try {
      const protocol = new Protocol(req.body.protocol);
      await protocol.save();
      res.status(201).json(protocol);
  } catch (e) {
      next({ statusCode: 400, ...e });
  }
};

exports.getProtocol = async (req, res, next) => {
    try {
        const protocol = await getItemById(Protocol, req.params.id);
        res.json(protocol);
    } catch (e) {
        next({ statusCode: 400, ...e });
    }
};

exports.updateProtocol = async (req, res, next) => {
    try {
        const protocol = await updateItemById(Protocol, req.params.id, req.body.protocol);
        res.json(protocol);
    } catch (e) {
        next({ statusCode: 400, ...e });
    }
};

exports.deleteProtocol = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteItem(Protocol, id);
        res.send(`The protocol was successfully deleted`);
    } catch (e) {
        next(e);
    }
};
