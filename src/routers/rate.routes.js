const express = require("express");
const {newRate, getActiveRates, updateRates} = require("../controllers/rate.controllers");
const rateRoutes = express.Router();


rateRoutes.put("/new-rate", newRate)
rateRoutes.get("/active", getActiveRates)
rateRoutes.put("/update-rates", updateRates)

module.exports= rateRoutes;