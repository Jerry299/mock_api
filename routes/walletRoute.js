const express = require("express");
const walletRoutes = express.Router();
const walletCtlr = require("../controllers/walletCtlr");

/**
 *
 * @swagger
 *  components:
 *    schemas:
 *      wallets:
 *        type:object:
 *        required:
 *          - company_name
 *          - email
 *          - password
 *          - amount
 *          - creation_time
 *        properties:
 *          id:
 *            type: string
 *            description: The auto generated id of each wallet
 *          name:
 *            type: string
 *            description: The name of the company that owns the wallet
 *          email:
 *            type: string
 *            description: the email address of the company/wallet owner
 *          password:
 *            type: string
 *            description: password for authentication
 *          amount:
 *            type: number
 *            description: amount in the account
 *          recipientEmail:
 *            type: string
 *            description: The email address where funds would be sent to
 *          amountToBeSent:
 *            type: number
 *            description: Amount to be sent, should be greater than 50
 * */

/**
 * @swagger
 * tags:
 *  name: Wallet
 *  description: wallet API
 *
 */

//these routes should be accesible to only authorized and authenticated users
/**
 * @swagger
 * /create-wallet:
 *   post:
 *     summary: Create a new wallet, only company_name,email and password is needed
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/wallets'
 *     responses:
 *       200:
 *         description: The wallet was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/wallets'
 *       500:
 *         description: Some server error
 */
walletRoutes.post("/create-wallet", walletCtlr.createWallet);

/**
 * @swagger
 * /transfer:
 *   post:
 *     summary: Transfer from you wallet to another registered wallet, your email, the recipient email and amount is needed
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/wallets'
 *     responses:
 *       200:
 *         description: Transfer completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/wallets'
 *       500:
 *         description: Some server error
 *       400:
 *         description: Try again, Your wallet balance must be greater than 50
 *       404:
 *         description: Receiver does not exist,Invalid recipient
 */
walletRoutes.post("/transfer", walletCtlr.transferFunds);

/**
 * @swagger
 * /get-wallet/{id}:
 *   get:
 *     summary: Get the wallet by id
 *     tags: [Wallet]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The wallet id
 *     responses:
 *       200:
 *         description: The wallet description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/wallets'
 *       404:
 *         description: The book was not found
 */
walletRoutes.get("/get-wallet/:id", walletCtlr.getWallet);

//PUT

/**
 * @swagger
 * /update-wallet/{id}:
 *  put:
 *    summary: Update a wallet by the id
 *    tags: [Wallet]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The wallet id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/wallets'
 *    responses:
 *      200:
 *        description: The wallet was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/wallets'
 *      404:
 *        description: The wallet was not found
 *      500:
 *        description: Some error happened
 */

walletRoutes.put("/update-wallet/:id", walletCtlr.updateWallet);

module.exports = walletRoutes;
