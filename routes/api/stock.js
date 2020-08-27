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
 */
router.get('/', controller.getAllStock);
/**
 * @swagger
 * /stock:
 *    post:
 *      tags: [Stock]
 *      description: create a batch
 *      summary: Create a batch of a product
 *      parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          $ref:
 *             "#/components/schemas/ProductBatch"
 *      responses:
 *        "201":
 *          description: "successful operation"
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
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the product
 *      responses:
 *        "200":
 *          description: A stock object
 */
router.get('/:id', controller.getStockById);
// router.post('/batch', controller.batchCreateProducts);
/**
 * @swagger
 * /stock/{productId}:
 *    put:
 *      summary: Get the stock of a specific product
 *      tags: [Stock]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the product
 *      responses:
 *        "200":
 *          description: The updated stock object
 */
router.put('/:id', controller.updateStock);
// router.delete('/:id', controller.deleteProduct);

module.exports = router;
