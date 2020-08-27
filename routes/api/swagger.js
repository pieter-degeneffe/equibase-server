const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { swaggerOptions } = require('../../consts');
const m2s = require('mongoose-to-swagger');
const fs = require('fs');
const Path = require('path');
const router = express.Router();
const specs = swaggerJsdoc(swaggerOptions);
const pathToFileName = name => {
  const fileName = name.split('/').slice(-1)[0].replace('.js', '');
  return fileName.charAt(0).toUpperCase() + fileName.slice(1);
};

const schemas = {};
const modelFiles = [];
const importModels = dir => fs.statSync(dir).isDirectory() ?
  fs.readdirSync(dir)
    .forEach(file =>
      file.endsWith('.js') ?
        modelFiles.push(`${ dir }/${ file }`)
        : importModels(`${ dir }/${ file }`))
  : '';

importModels(Path.join(__dirname, '../../models'));

modelFiles.forEach(file => schemas[pathToFileName(file)] = m2s(require(file)));

const composedSpecs = {
  ...specs,
  components: { schemas }
};

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(composedSpecs, {
    explorer: true
  })
);

module.exports = router;
