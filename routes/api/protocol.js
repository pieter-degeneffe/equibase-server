const express = require('express');
const router = express.Router();
const controller = require('../../controllers/protocol.js');

/**
 * @swagger
 * /protocol:
 *    get:
 *      summary: Get all protocols
 *      tags: [Protocol]
 *      responses:
 *        "200":
 *          description: A paginated list of all protocols
 */
router.get('/', controller.getAllProtocols);
/**
 * @swagger
 * /protocol:
 *    post:
 *      summary: Create a new protocol
 *      tags: [Protocol]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                protocol:
 *                  $ref: "#/components/schemas/Protocol"
 *      responses:
 *        "201":
 *          description: A paginated list of all protocols
 *        "400":
 *          description: Bad Request
 */
router.post('/', controller.createProtocol);
/**
 * @swagger
 * /protocol/{protocolId}:
 *    get:
 *      summary: Get the stock of a specific protocol
 *      tags: [Protocol]
 *      parameters:
 *        - in: path
 *          name: ProtocolId
 *          schema:
 *            type: string
 *          required: true
 *      responses:
 *        "200":
 *          description: A Protocol object
 *        400:
 *          description: Bad Request
 *        404:
 *          description: Not Found
 */
router.get('/:id', controller.getProtocol);
/**
 * @swagger
 * /protocol/{protocolId}:
 *    put:
 *      summary: Update an existing protocol
 *      tags: [Protocol]
 *      parameters:
 *        - in: path
 *          name: protocolId
 *          schema:
 *            type: string
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                protocol:
 *                  $ref: "#/components/schemas/Protocol"
 *      responses:
 *        "201":
 *          description: The updated Protocol
 *        "400":
 *          description: Bad Request
 */
router.put('/:id', controller.updateProtocol);
/**
 * @swagger
 * /protocol/{protocolId}:
 *    delete:
 *      summary: Delete a  protocol
 *      tags: [Protocol]
 *      parameters:
 *        - in: path
 *          name: protocolId
 *          schema:
 *            type: string
 *          required: true
 *      responses:
 *        "200":
 *          description: The protocol was successfully deleted
 *        "400":
 *          description: Bad Request
 */
router.delete('/:id', controller.deleteProtocol);

module.exports = router;
