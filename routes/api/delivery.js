const express = require('express');
const router = express.Router();
const controller = require('../../controllers/delivery.js');

/**
 * @swagger
 * /stock:
 *    post:
 *      tags: [Stock]
 *      description: create a batch
 *      summary: Create a batch of a product
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ProductBatch"
 *      responses:
 *        201:
 *          description: successful operation
 *        400:
 *          description: Bad Request
 *        404:
 *          description: Not Found
 *        500:
 *          description: Internal Server Error
 */
router.get('/medini', controller.addDeliveries);

module.exports = router;
