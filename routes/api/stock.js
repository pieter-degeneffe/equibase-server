const express = require('express');
const router = express.Router();
const controller = require('../../controllers/stock.js');

/**
 * @swagger
 * /stock:
 *    get:
 *      tags: [Stock]
 *      summary: Get the stock of every product
 *      description: This should the complete stock
 *      responses:
 *        "200":
 *          description: An array of StockProducts
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 */
router.get('/', controller.getAllStock);
/**
 * @swagger
 * /stock/expired:
 *    get:
 *      tags: [Stock]
 *      summary: Get all expired products
 *      responses:
 *        "200":
 *          description: An array of expired StockProducts
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 */
router.get('/expired', controller.getExpiredStock);
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
router.post('/', controller.addBatch);
/**
 * @swagger
 * /stock/{productId}:
 *    get:
 *      summary: Get the stock of a specific product
 *      tags: [Stock]
 *      parameters:
 *        - in: path
 *          name: productId
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the product
 *      responses:
 *        "200":
 *          description: A stock object
 *        400:
 *          description: Bad Request
 *        404:
 *          description: Not Found
 *        500:
 *          description: Internal Server Error
 */
router.get('/:id', controller.getStockById);
// router.post('/batch', controller.batchCreateProducts);
/**
 * @swagger
 * /stock/{productId}:
 *    put:
 *      summary: Update the stock of a specific product
 *      tags: [Stock]
 *      parameters:
 *        - in: path
 *          name: productId
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the product
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                amount:
 *                  type: number
 *              required:
 *               - amount
 *      responses:
 *        "200":
 *          description: The updated stock object
 *        400:
 *          description: Bad Request
 *        404:
 *          description: Not Found
 *        403:
 *          description: Not enough in stock
 *        500:
 *          description: Internal Server Error
 */
router.put('/:id', controller.updateStock);

module.exports = router;
