const express = require('express');
const router = express.Router();
const controller = require('../../controllers/config.js');

/**
 * @swagger
 * /config/product:
 *    get:
 *      summary: Get config for products
 *      tags: [Config]
 *      responses:
 *        "200":
 *          description: config needed to create a Product
 */
router.get('/product', controller.getProductConfig);
/**
 * @swagger
 * /config/mod:
 *    get:
 *      summary: Get config for products
 *      tags: [Config]
 *      responses:
 *        "200":
 *          description: config needed to create a StockModification
 */router.get('/mod', controller.getStockModConfig);

 module.exports = router;
