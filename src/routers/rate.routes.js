const express = require("express");
const {newRate, getActiveRates} = require("../controllers/rate.controllers");
const rateRoutes = express.Router();


rateRoutes.put("/new-rate", newRate)
rateRoutes.get("/active", getActiveRates)

module.exports= rateRoutes;