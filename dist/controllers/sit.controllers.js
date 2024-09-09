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
const Sit = require('../models/sits.model');
const buildLogger = require('../plugins/logger.plugin');
const rateCalculator_1 = require("../utils/rateCalculator");
const logger = buildLogger('rate.controller.js');
function newSit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Estoy en newSit');
        const { serviceDate, service, rateType, petName, provided, finalPrice } = req.body;
        const price = yield (0, rateCalculator_1.calculateRate)(service, rateType);
        if (price <= 0) {
            return res.status(404).json({ message: `No existe la tarifa: ${service} ${rateType}` });
        }
        console.log('La tarifa recuperada es: ', price);
        // Asignamos la tarifa recuperado de la coleccion de tarifas. 
        req.body.finalPrice = price;
        try {
            const newSit = new Sit(req.body);
            const createdSit = yield newSit.save();
            return res.status(201).json(createdSit);
        }
        catch (error) {
            logger.error(`Error al crear el servicio: ${error}`);
            return res.status(500).json({ error: `Se ha producido un error al dar de alta el servicio: ${error}` });
        }
    });
}
// Borrado de servicio
function deleteSit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedSit = yield Sit.findByIdAndDelete(id);
            if (!deletedSit) {
                return res.status(404).json({ message: `El id: ${id} no existe en la base de datos` });
            }
            return res.status(200).json(deleteSit);
        }
        catch (error) {
            logger.error(`Error al borrar el servicio: ${error}`);
            return res.status(500).json({ error: `Se ha producido un error al borrar el servicio: ${error}` });
        }
    });
}
// Update 
function updateSit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { startDate, endDate, service, rateType, petName, provided, finalPrice } = req.body;
            const updatedSit = yield Sit.findByIdAndUpdate(id, {
                $set: {
                    startDate,
                    endDate,
                    service,
                    rateType,
                    petName,
                    provided,
                    finalPrice
                },
            }, { new: true });
            if (!updatedSit) {
                return res.status(403).json({ message: `No existe el servicio con id: ${id}` });
            }
            return res.status(200).json(updatedSit);
        }
        catch (error) {
            logger.error(`Error al crear el servicio: ${error}`);
            return res.status(500).json({ error: `Error al actualizar la idea: ${error}` });
        }
    });
}
module.exports = { newSit, deleteSit, updateSit };
