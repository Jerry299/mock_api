const express = require("express");
const walletRoutes = express.Router();
const walletCtlr = require("../controllers/walletCtlr");

//GET
walletRoutes.get("/get-wallet/:id", walletCtlr.getWallet);
walletRoutes.get("/test", walletCtlr.test);

//POST
walletRoutes.post("/create-wallet", walletCtlr.createWallet);

//PUT
walletRoutes.put("/update-walllet/:id", walletCtlr.updateWallet);

module.exports = walletRoutes;
