const express = require("express");
const personRoute = express.Router();
const personController = require("../controllers/personCtlr");

personRoute.post("/test", personController);

module.exports = personRoute;
