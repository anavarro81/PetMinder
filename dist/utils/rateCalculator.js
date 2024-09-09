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
exports.calculateRate = calculateRate;
const Rate = require('../models/rates.model');
// Si es paseo consulto la tarifa
//TODO 
function calculateRate(service, rateType) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Estoy en calculateRate');
        console.log('service: ', service);
        console.log('rateType: ', rateType);
        try {
            if (service === 'paseo') {
                const rate = service + ' ' + rateType;
                console.log('rate: ', rate);
                const filter = { rate: rate };
                const filteredRate = yield Rate.findOne(filter);
                console.log('filteredRate ', filteredRate);
                console.log('price ', filteredRate.price);
                if (!filteredRate) {
                    console.log('Error al recuperar la tarifa...');
                    return -1;
                }
                return filteredRate.price;
            }
            else if (service === 'alojamiento') {
                return 99;
            }
            else {
                console.log('Tarifa no encontrada...');
                return -1;
            }
        }
        catch (error) {
            console.log('Error en la consulta de la tarifa: ');
            console.log(error);
            return -1;
        }
    });
}
