"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { newRate, getActiveRates, updateRates } = require("../controllers/rate.controllers");
const rateRoutes = express_1.default.Router();
rateRoutes.put("/new-rate", newRate);
rateRoutes.get("/active", getActiveRates);
rateRoutes.put("/update-rates", updateRates);
module.exports = rateRoutes;
