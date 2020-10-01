const { productUnits } = require('../consts');
const { productTypes, taxes, modificationTypes } = require('../consts');
exports.getProductConfig = async (req, res, next) => {
  try {
    res.status(200).json({
      types: productTypes,
      tax: taxes,
      units: productUnits
    });
  } catch (err) {
    next(err);
  }
};

exports.getStockModConfig = async (req, res, next) => {
  const {BUY, ...types} = modificationTypes;
  try {
    res.status(200).json({
      types: Object.values(types),
    });
  } catch (err) {
    next(err);
  }
};
