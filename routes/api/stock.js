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
 * /stock/{productId}:
 *    get:
 *      summary: Get deliveries over timespan
 *      tags: [Stock]
 *      parameters:
 *        - in: query
 *          name: from
 *          schema:
 *            type: string
 *          required: true
 *        - in: query
 *          name: to
 *          schema:
 *            type: string
 *          required: false
 *      responses:
 *        200:
 *          description: A stock object
 *        400:
 *          description: Bad Request
 *        404:
 *          description: Not Found
 *        500:
 *          description: Internal Server Error
 */
router.get('/deliveries', controller.getDeliveries);
/**
 * @swagger
 * /stock/mods:
 *    get:
 *      summary: Get all stock modifications
 *      tags: [Stock]
 *      parameters:
 *        - in: query
 *          name: out
 *          schema:
 *            type: boolean
 *          required: false
 *          description: get only outgoing stock modifications
 *        - in: query
 *          name: from
 *          schema:
 *            type: string
 *          required: true
 *        - in: query
 *          name: to
 *          schema:
 *            type: string
 *          required: false
 *      responses:
 *        "200":
 *          description: A list of stock-modifications
 *        400:
 *          description: Bad Request
 *        404:
 *          description: Not Found
 *        500:
 *          description: Internal Server Error
 */
router.get('/mods', controller.getStockMod);
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
/**
 * @swagger
 * /stock/{id}/deactivate:
 *    put:
 *      summary: Set a product batch inactive
 *      tags: [Stock]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the batch
 *      responses:
 *        "200":
 *          description: Succes BatchObject
 *        400:
 *          description: Bad Request
 *        404:
 *          description: Not Found
 *        500:
 *          description: Internal Server Error
 */
router.put('/:id/deactivate', controller.setStockInactive);
/**
 * @swagger
 * /stock/{id}/activate:
 *    put:
 *      summary: Set a product batch active
 *      tags: [Stock]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the batch
 *      responses:
 *        "200":
 *          description: Succes BatchObject
 *        400:
 *          description: Bad Request
 *        404:
 *          description: Not Found
 *        500:
 *          description: Internal Server Error
 */
router.put('/:id/activate', controller.setStockActive);
/**
 * @swagger
 * /stock/{productId}/mods:
 *    get:
 *      summary: Get the stock modifications of a specific product
 *      tags: [Stock]
 *      parameters:
 *        - in: path
 *          name: productId
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the product
 *        - in: query
 *          name: out
 *          schema:
 *            type: boolean
 *          required: false
 *          description: get only outgoing stock modifications
 *      responses:
 *        "200":
 *          description: A list of stock-modifications
 *        400:
 *          description: Bad Request
 *        404:
 *          description: Not Found
 *        500:
 *          description: Internal Server Error
 */
router.get('/:id/mods', controller.getStockModById);
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
 *                type:
 *                  type: string
 *                  enum:
 *                    - Beschadigd
 *                    - Controle
 *                    - Toediening
 *                    - Verkoop
 *                client:
 *                  type: string
 *                  description: id of the client required when type === Verkoop
 *                horse:
 *                  type: string
 *                  description: id of the horse required when type === Toediening
 *              required:
 *               - amount
 *               - type
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
