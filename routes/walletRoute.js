const express = require("express");
const walletRoutes = express.Router();
const walletCtlr = require("../controllers/walletCtlr");

//these routes should be accesible to only authorized and authenticated users
//POST
walletRoutes.post("/create-wallet", walletCtlr.createWallet);
walletRoutes.post("/transfer", walletCtlr.transferFunds);

//GET
walletRoutes.get("/get-wallet/:id", walletCtlr.getWallet);

//PUT
walletRoutes.put("/update-walllet/:id", walletCtlr.updateWallet);

module.exports = walletRoutes;
