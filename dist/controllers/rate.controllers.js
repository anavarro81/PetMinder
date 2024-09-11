"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rate = require('../models/rates.model');
//  const Rate = require ('@models/rates.model')
const maxDate = new Date('9999-12-31T23:59:59.999Z');
const buildLogger = require('../plugins/logger.plugin');
const logger = buildLogger('rate.controller.js');
function newRate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rate, price, endDate } = req.body;
        try {
            const existRate = yield Rate.find({ rate: rate });
            console.log('existRate > ', existRate);
            if (existRate.length > 0) {
                return res.status(409).json({ error: `Ya existe una tarifa con el nombre: ${rate}` });
            }
            const newRate = new Rate(req.body);
            const createdRate = yield newRate.save();
            return res.status(201).json(createdRate);
        }
        catch (error) {
            logger.error(`Error al crear la tarifa: ${error}`);
            return res.status(500).json({ error: `Se ha producido un error al dar de alta la nueva tarifa: ${error}` });
        }
    });
}
function getActiveRates(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allRates = yield Rate.find();
            return res.status(200).json(allRates);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    });
}
function updateRates(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rates } = req.body;
        console.log('rates: ', rates);
        const updatedRates = [];
        for (const rate of rates) {
            try {
                const updateRate = yield Rate.findByIdAndUpdate(rate.id, { $set: { price: rate.price } }, { new: true });
                if (updateRate) {
                    updatedRates.push(updateRate);
                }
            }
            catch (error) {
                return res.status(500).json({ error: `error actualizando la tarifas ${error}` });
            }
        }
        return res.status(200).json({ 'message': 'Tarifa(s) actualizadas correctamente', 'updatedRates': updatedRates });
    });
}
module.exports = { newRate, getActiveRates, updateRates };
